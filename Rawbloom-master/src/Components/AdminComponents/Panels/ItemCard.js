import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
function ItemCard({
    props: {
        productCategory,
        productDescription,
        productName,
        productPrice,
        productQuantity,
        imgURL,
        id,
    },
}) {
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    useEffect(() => {
        return setModal(false);
    }, []);
    return (
        <div className={`item shadow ${productCategory}`}>
            <div className="productImage">
                <img src={imgURL} className="menu-img" alt="" />
            </div>
            <div className="menu-content">
                <p className="product-name">
                    {productName == null || productName === ""
                        ? "No Name"
                        : productName.length > 18
                        ? productName.substr(0, 18) + "..."
                        : productName}
                </p>
                <div className="menu-ingredients">
                    {productDescription == null || productDescription === ""
                        ? "No Description"
                        : productDescription.length > 80
                        ? productDescription.substr(0, 80) + "..."
                        : productDescription}
                </div>
            </div>
            <div className="cta">
                <button className="editProductbtn" onClick={() => setEditModal(true)}>
                    edit
                </button>
                <button className="deleteProductbtn" onClick={() => setModal(true)}>
                    delete
                </button>
            </div>
            <CSSTransition in={editModal} classNames="show" timeout={250} unmountOnExit>
                <EditModal
                    props={{
                        productCategory,
                        productDescription,
                        productName,
                        productPrice,
                        productQuantity,
                        imgURL,
                        setEditModal,
                        editModal,
                        id,
                    }}
                />
            </CSSTransition>
            <CSSTransition in={modal} classNames="show" timeout={250} unmountOnExit>
                <DeleteModal props={{ modal, setModal, id }} />
            </CSSTransition>
        </div>
    );
}

export default ItemCard;
