import React, { useState, useRef } from "react";
import { ImageTypes } from "../../../utils/utils";
import { UploadImage } from "../../../utils/firebaseUtils";
import { v4 } from "uuid";
import firebase from "../../../utils/firebase";
function ProductUpload() {
    const [Data, setData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productQuantity: "",
        productCategory: "",
    });
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const imageRef = useRef();
    function fillData({ target: { value, name } }) {
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    async function upload(e) {
        e.preventDefault();
        //  validate
        if (Data.productName == "" || Data.productDescription == "" || Data.productPrice == "") {
            return Notification(
                "danger",
                "Empty Fiels!",
                "Name, Description and Price cannot be Empty!"
            );
        }
        if (!ImageTypes.includes(image.type)) {
            return Notification("danger", "Invalid file type", "Please upload a Picture");
        } else if (image.size > 250000) {
            return Notification(
                "danger",
                "Image too Large!",
                "The size of the image should not be more than 250kb!"
            );
        }
        setStatus("Preparing to Upload...");
        Data.id = v4();
        const ImageURL = await UploadImage(image, `Product images/${Data.productName}`);
        setStatus(`Uploading Data...`);
        Data.imgURL = ImageURL;
        Data.productPrice = parseInt(Data.productPrice);
        Data.productQuantity = parseInt(Data.productQuantity);
        const db = firebase.firestore();
        const Ref = await db.collection("store").doc(Data.id).set(Data);
        setStatus("Upload Finished!");
        setData({
            id: "",
            productName: "",
            productDescription: "",
            productPrice: "",
            productQuantity: "",
            productCategory: "",
        });
        imageRef.current.value = null;
        setTimeout(() => {
            setStatus(null);
        }, 500);
    }
    return (
        <div className="uploadProduct">
            <h4>Upload Product</h4>
            <form className="upload-form mt-3" onSubmit={upload}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        className="form-control"
                        id="name"
                        value={Data.productName}
                        onChange={fillData}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Product Description</label>
                    <textarea
                        className="form-control"
                        name="desc"
                        id=""
                        cols="30"
                        rows="3"
                        name="productDescription"
                        value={Data.productDescription}
                        onChange={fillData}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        name="productPrice"
                        className="form-control"
                        id="price"
                        value={Data.productPrice}
                        onChange={fillData}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Product Quantity</label>
                    <input
                        type="number"
                        name="productQuantity"
                        className="form-control"
                        id="quantity"
                        value={Data.productQuantity}
                        onChange={fillData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Product category</label>
                    <input
                        type="text"
                        name="productCategory"
                        className="form-control"
                        id="category"
                        value={Data.productCategory}
                        onChange={fillData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product image</label>
                    <div className="upload">
                        <input
                            type="file"
                            className="image"
                            id="image"
                            ref={imageRef}
                            onChange={(e) => setImage(e.target.files[0])}
                            required={true}
                        />
                    </div>
                </div>
                <p>{status}</p>
                <button type="submit">Upload product</button>
            </form>
        </div>
    );
}

export default ProductUpload;
