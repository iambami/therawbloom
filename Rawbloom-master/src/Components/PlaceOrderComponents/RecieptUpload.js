import React, { useContext, useEffect, useState } from "react";
import { formDataContext } from "../../utils/Contexts";
import { ImageTypes } from "../../utils/utils";
import { UploadImage } from "../../utils/firebaseUtils";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType
);
// Import FilePond styles
import "filepond/dist/filepond.min.css";
function RecieptUpload() {
    const [image, setImage] = useState({ file: null });
    const [uploadUpdate, setUploadUpdate] = useState(null);
    const { formData, setFormData } = useContext(formDataContext);

    async function upload(e) {
        e.preventDefault();
        if (!image) return alert("Please Choose a File!");
        else if (!ImageTypes.includes(image.file.type)) {
            return alert("Please upload an Image!");
        }
        try {
            setUploadUpdate("Attempting Upload...");
            const imageURL = await UploadImage(image.file, `Reciepts/${formData.name}`);
            setFormData((prev) => {
                return { ...prev, receiptUrl: imageURL };
            });
            setUploadUpdate("Uploading Complete.");
        } catch (err) {
            setUploadUpdate("Eror Upoaloading your Reciept! please try again.");
        }
    }

    useEffect(() => {
        console.log(image);
    }, [image]);
    return (
        <div className="imageupload">
            <div className="">
                <FilePond
                    maxFiles={1}
                    name="Receipt"
                    acceptedFileTypes={["image/*"]}
                    labelIdle='Drag & Drop your Receipt here or  Click to <span class="filepond--label-action">Browse</span>'
                    onupdatefiles={(fileItems) => {
                        // Set current file objects to this.state
                        setImage(fileItems[0]);
                    }}
                ></FilePond>
                <button className="uploadBtn" onClick={upload}>
                    Upload
                </button>
            </div>
            <span className="update mt-2">{uploadUpdate}</span>
        </div>
    );
}

export default RecieptUpload;
