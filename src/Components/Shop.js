import React, { useContext } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import EachProduct from "./EachProduct";
import { Link } from "react-router-dom";
import { CartContext } from "../utils/Contexts";
function Shop() {
    return (
        <section id="shop" className="menu section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Products</h2>
                    <div className="shopList">
                        <p>Check Our latest Products</p>
                        <Link to="/store" className="rest cursor">
                            <p className="mr-2">Veiw all Products</p>
                            <span>
                                <BiRightArrowAlt size="1.25rem" />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    <ProductsList />
                </div>
            </div>
        </section>
    );
}
function ProductsList() {
    const { constProduct, AddItemToCart } = useContext(CartContext);
    const newest = constProduct.slice(0, 4);
    const ProductsJSX = newest.map((product, index) => {
        return <EachProduct key={index} props={{ ...product, AddItemToCart }} />;
    });
    return ProductsJSX;
}

export default Shop;
