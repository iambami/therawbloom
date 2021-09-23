import React, { useState, useEffect } from "react";
import { Notification } from "../utils/utils";
import { CgClose } from "react-icons/cg";
import { FiMinus, FiPlus } from "react-icons/fi";
function EachProductModal({
    props: {
        productQuantity,
        id,
        productDescription,
        productName,
        imgURL,
        productCategory,
        productPrice,
        setModal,
        AddItemToCart,
    },
}) {
    const [count, setCount] = useState(1);
    const [ItemPrice, setItemPrice] = useState(productPrice);
    useEffect(() => {
        setItemPrice(count * productPrice);
    }, [count]);
    return (
        <div
            className="ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setModal(false);
                }
            }}
        >
            <div className="modalBox container scrollBar">
                <div className="row">
                    <button onClick={() => setModal(false)} className="closeModal">
                        <CgClose size="1.5rem" />
                    </button>
                    <div className="imageDisplay col-lg-6 p-0">
                        <img src={imgURL} alt="" />
                    </div>
                    <div className="content p-4 col-lg-6">
                        <div className="content-body">
                            <h1 className="name">{productName}</h1>
                            <p className="description">{productDescription}</p>
                            <p className="category">{productCategory}</p>
                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="bar">
                                    <button
                                        className="dec count"
                                        onClick={() => {
                                            if (count == 1) return;
                                            setCount(count - 1);
                                        }}
                                    >
                                        <FiMinus />
                                    </button>
                                    <div className="countText">{count}</div>
                                    <button
                                        className="inc count"
                                        onClick={() => {
                                            if (count >= productQuantity) return;
                                            setCount(count + 1);
                                        }}
                                    >
                                        <FiPlus color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="price">&#8358;{ItemPrice}</div>
                        </div>
                        <button
                            className="add-to-cart"
                            onClick={() => {
                                const item = {
                                    id,
                                    name: productName,
                                    count,
                                    ItemPrice,
                                    imgSrc: imgURL,
                                    quantity: productQuantity,
                                    price: productPrice,
                                };
                                AddItemToCart(item);
                                setModal(false);
                                Notification(
                                    "success",
                                    "Item Added!",
                                    "Your Item has been successfuly added to Your Cart!"
                                );
                            }}
                        >
                            <FiPlus size="1.5em" color="white" />
                            <p className="m-0 ml-2">Add Item to Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EachProductModal;
