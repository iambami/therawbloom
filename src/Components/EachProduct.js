import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FiPlus } from "react-icons/fi";
import EachProductModal from "./EachProductModal";
function EachProduct({
    props: {
        productQuantity,
        id,
        productDescription,
        productName,
        imgURL,
        productCategory,
        productPrice,
        AddItemToCart,
    },
}) {
    const [modal, setModal] = useState(false);
    return (
        <div className={`item ${productCategory}`}>
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
                <span className="productCategory my-3 d-block">{productCategory}</span>
                <div className="menu-ingredients">
                    {productDescription == null || productDescription === ""
                        ? "No Description"
                        : productDescription.length > 80
                        ? productDescription.substr(0, 80) + "..."
                        : productDescription}
                </div>
            </div>
            <div className="cta">
                <button
                    className={`add-to-cart ${
                        (productQuantity == "" || productQuantity == 0) && "out-of-stock-btn"
                    }`}
                    onClick={() => setModal(true)}
                    disabled={productQuantity == "" || productQuantity == 0}
                >
                    <FiPlus size="2em" color="white" />
                </button>
                {productQuantity == "" || productQuantity == 0 ? (
                    <span className={"out-of-stock"}>Out of Stock</span>
                ) : (
                    <span className="price">&#8358;{productPrice}</span>
                )}
            </div>
            <CSSTransition in={modal} classNames="show" timeout={400} unmountOnExit>
                <EachProductModal
                    props={{
                        productQuantity,
                        id,
                        productDescription,
                        productName,
                        imgURL,
                        productCategory,
                        productPrice,
                        setModal,
                        AddItemToCart,
                    }}
                />
            </CSSTransition>
        </div>
    );
}

export default EachProduct;
