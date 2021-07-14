import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../utils/Contexts";
import { CSSTransition } from "react-transition-group";
import firebase from "../../../utils/firebase";
import { Notification } from "../../../utils/utils";
function OutOfStock() {
    const [addModal, setAddModal] = useState(false);
    const { products } = useContext(CartContext);
    const OutOfStockProducts = products.filter((product) => product.productQuantity <= 0);
    var OutOfStockProductsJSX = OutOfStockProducts.map(
        ({ productCategory, productName, imgURL, id }, index) => {
            return (
                <div className={`item shadow ${productCategory}`} key={index}>
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
                    </div>
                    <div className="cta outOfStock">
                        <div className="p-4 outofstockalert">OUT OF STOCK!</div>
                        <button className="editProductbtn" onClick={() => setAddModal(true)}>
                            ADD MORE
                        </button>
                    </div>
                    <CSSTransition in={addModal} classNames="show" timeout={250} unmountOnExit>
                        <Add props={{ id, setAddModal }} />
                    </CSSTransition>
                </div>
            );
        }
    );
    return (
        <div className="editProduct">
            <h4>Products Out of Stock</h4>
            <div className="editList">
                {OutOfStockProductsJSX.length == 0 ? (
                    <h2 className="text-center mt-4">No Products Out of Stock!</h2>
                ) : (
                    OutOfStockProductsJSX
                )}
            </div>
        </div>
    );
}

export default OutOfStock;

function Add({ props: { id, setAddModal } }) {
    const [input, setInput] = useState(null);
    function ReStock(id) {
        if (!input)
            return Notification(
                "danger",
                "Empty Field",
                "Please input the amount of the product you want to Add to store!"
            );
        try {
            firebase
                .firestore()
                .collection("store")
                .doc(id)
                .update({ productQuantity: parseInt(input) });
            Notification(
                "success",
                "Prdouct Restocked!",
                "The product has been successfully restocked!"
            );
            setAddModal(false);
        } catch (err) {
            console.log(err);
            Notification("danger", "Error", "An error Occured, please try again later");
        }
    }
    useEffect(() => {
        return () => {
            setInput(null);
        };
    }, []);
    return (
        <div
            className="PlaceOrderModal ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setAddModal(false);
                }
            }}
        >
            <div className="modalBox container edit-modal restock">
                <div className="row">
                    <h4>Are more of this product to store</h4>
                    <input
                        type="number"
                        name="add"
                        id="add"
                        className="w-100 my-3"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <div className="button">
                        <button className="cancel" onClick={() => setAddModal(false)}>
                            Cancel
                        </button>
                        <button className="restockBtn" onClick={() => ReStock(id)}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
