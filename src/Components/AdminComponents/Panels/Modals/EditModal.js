import React, { useState, useEffect } from "react";
import firebase from "../../../../utils/firebase";
import { Notification } from "../../../../utils/utils";
function EditModal({
    props: {
        productCategory,
        productDescription,
        productName,
        productPrice,
        productQuantity,
        imgURL,
        setEditModal,
        id,
    },
}) {
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const [Data, setData] = useState({
        productCategory,
        productDescription,
        productName,
        productPrice,
        productQuantity,
        imgURL,
        id,
    });
    async function upload(e, id) {
        e.preventDefault();
        const types = ["image/jpg", "image/png", "image/jpeg"];
        if (Data.productName == "" || Data.productDescription == "" || Data.productPrice == "") {
            return Notification(
                "danger",
                "Empty Fiels!",
                "Name, Description and Price cannot be Empty!"
            );
        }
        if (image) {
            if (!types.includes(image.type)) {
                return Notification("danger", "Invalid file type", "Please upload a Picture");
            } else if (image.size > 250000) {
                return Notification(
                    "danger",
                    "Image too Large!",
                    "The size of the image should not be more than 250kb!"
                );
            }
        }
        const db = firebase.firestore().collection("store").where("id", "==", `${id}`);
        setStatus("Preparing to Upload...");
        if (image) {
            const StorageRef = firebase.storage().ref();
            const uploadTask = StorageRef.child(`Product images/${Data.productName}`).put(image);
            setStatus("Uploading Image...");
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progress = Math.ceil(progress);
                    setStatus(`Uploading image... ${progress}% Done...`);
                },
                (error) => {
                    setStatus(error.message);
                },
                () => {
                    setStatus(`Uploading Data...`);
                    uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                        Data.imgURL = downloadURL;
                        Data.productPrice = parseInt(Data.productPrice);
                        Data.productQuantity = parseInt(Data.productQuantity);
                        try {
                            const db = firebase.firestore();
                            const Ref = await db.collection("store").doc(id).set(Data);
                            setStatus("Upload Finished!");
                            setData({
                                productName: "",
                                productDescription: "",
                                productPrice: "",
                                productQuantity: "",
                                productCategory: "",
                            });
                            setTimeout(() => {
                                setStatus(null);
                            }, 500);
                            Notification("success", "Updated!", "Product updated successfully!");
                        } catch (err) {
                            setStatus(err.message);
                            Notification(
                                "danger",
                                "An Error Occured!",
                                "Failed to update product!"
                            );
                        }
                    });
                }
            );
        } else {
            Data.productPrice = parseInt(Data.productPrice);
            Data.productQuantity = parseInt(Data.productQuantity);
            try {
                const db = firebase.firestore();
                const Ref = await db.collection("store").doc(id).set(Data);
                setStatus("Upload Finished!");
                setData({
                    productName: "",
                    productDescription: "",
                    productPrice: "",
                    productQuantity: "",
                    productCategory: "",
                });
                setTimeout(() => {
                    setStatus(null);
                }, 500);
                Notification("success", "Updated!", "Product updated successfully!");
            } catch (err) {
                setStatus(err.message);
                Notification("danger", "An Error Occured!", "Failed to update product!");
            }
        }
    }
    function fillData({ target: { value, name } }) {
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    useEffect(() => {
        return () => {
            setStatus("");
        };
    }, []);
    return (
        <div
            className="ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setEditModal(false);
                }
            }}
        >
            <div className="modalBox container scrollBar uploadEdit">
                <div className="row">
                    <div className="imageDisplay col-lg-6 p-0">
                        <img src={imgURL} alt="" />
                    </div>
                    <div className="content p-4 col-lg-6">
                        <p style={{ fontSize: "12px" }}>
                            The Details here are what is in the store currently, so you can easily
                            spot mistakes and correct them accordingly
                        </p>
                        <form className="upload-form mt-3" onSubmit={(e) => upload(e, id)}>
                            <div className="form-group">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    className="form-control"
                                    id="name"
                                    value={Data.productName}
                                    onChange={fillData}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc">Product Description</label>
                                <textarea
                                    className="form-control scrollBar"
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
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <p>{status}</p>
                            <div className="buttons">
                                <button type="submit" className="uploadEditbtn">
                                    Upload product
                                </button>
                                <button
                                    className="cancel"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setEditModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
