import React, { useContext, useState } from "react";
import { CartContext } from "../utils/Contexts";
import EachProduct from "./EachProduct";
function Store() {
    const { products } = useContext(CartContext);
    document.querySelector("html").scrollTop = 0;
    return (
        <section id="shop" className="menu section-bg store" style={{ marginTop: 71 }}>
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Store</h2>
                    <div className="shopList">
                        <p>Checkout all our Products</p>
                    </div>
                </div>
                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    {products.length == 0 ? (
                        <h1 className="text-center text-black-50">No Products for Now</h1>
                    ) : (
                        <ProductsList />
                    )}
                </div>
            </div>
        </section>
    );
}

function ProductsList() {
    const { products, AddItemToCart } = useContext(CartContext);
    const ProductsJSX = products.map(
        ({
            productQuantity,
            id,
            productDescription,
            productName,
            imgURL,
            productCategory,
            productPrice,
        }) => {
            return (
                <EachProduct
                    key={id}
                    props={{
                        productQuantity,
                        id,
                        productDescription,
                        productName,
                        imgURL,
                        productCategory,
                        productPrice,
                        AddItemToCart,
                    }}
                />
            );
        }
    );
    return ProductsJSX;
}
export default Store;
