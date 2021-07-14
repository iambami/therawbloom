import React, { useContext, useState } from "react";
import { formDataContext } from "../../utils/Contexts";
import { ImageTypes } from "../../utils/utils";
import { UploadImage } from "../../utils/firebaseUtils";
function RecieptUpload() {
    const [image, setImage] = useState(null);
    const [uploadUpdate, setUploadUpdate] = useState(null);
    const { formData, setFormData } = useContext(formDataContext);

    async function upload(e) {
        e.preventDefault();
        if (!image) return;
        else if (!ImageTypes.includes(image.type)) {
            return alert("Please upload an Image");
        }
        try {
            setUploadUpdate("Attempting Upload...");
            const imageURL = await UploadImage(image, `Reciepts/${formData.name}`);
            setFormData((prev) => {
                return { ...prev, receiptUrl: imageURL };
            });
            setUploadUpdate("Uploading Complete.");
        } catch (err) {
            setUploadUpdate("Eror Upoaloading your Reciept! please try again.");
        }
    }
    return (
        <div className="imageupload">
            <div className="upload">
                <input
                    type="file"
                    className="image"
                    onChange={({ target: { files } }) => setImage(files[0])}
                />
                <button className="uploadBtn" onClick={upload}>
                    Upload
                </button>
            </div>
            <span className="update mt-2">{uploadUpdate}</span>
        </div>
    );
}

export default RecieptUpload;
