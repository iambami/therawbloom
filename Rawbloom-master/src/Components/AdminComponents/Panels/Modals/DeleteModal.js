import React from "react";
import firebase from "../../../../utils/firebase";
import { Notification } from "../../../../utils/utils";

function DeleteModal({ props: { setModal, id } }) {
    async function deletproduct(id) {
        try {
            firebase.firestore().collection("store").doc(id).delete();
            Notification(
                "success",
                "Product Deleted!",
                "The product has been removed from your Store!"
            );
            setModal(false);
        } catch (error) {
            Notification(
                "danger",
                "An Error Occured",
                "Product could not removed from your Store!"
            );
        }
    }
    return (
        <div
            className="PlaceOrderModal ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setModal(false);
                }
            }}
        >
            <div className="modalBox container edit-modal">
                <div className="row">
                    <h4>Are you sure you want to Delete this Product?</h4>
                    <div className="button">
                        <button className="cancel" onClick={() => setModal(false)}>
                            Cancel
                        </button>
                        <button className="delete" onClick={() => deletproduct(id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
