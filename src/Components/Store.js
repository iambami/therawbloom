import React, { useContext } from "react";
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
                    <div className="container">
                        <div className="row justify-content-between flex-wrap" style={{ gap: 20 }}>
                            <SearchComponent />
                            <Category />
                        </div>
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

function SearchComponent() {
    const { products, setProducts, constProduct } = useContext(CartContext);
    async function search(text) {
        if (text == "") return setProducts(constProduct);
        const newList = constProduct.filter((pro) => {
            let searchtext = pro.productName.toLowerCase();
            return searchtext.match(text.trim().toLowerCase());
        });
        return setProducts(newList);
    }
    return (
        <form className="form-row">
            <div className="form-group mb-0">
                <input
                    type="text"
                    onChange={(e) => {
                        search(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Search Products"
                />
            </div>
        </form>
    );
}

function Category() {
    const { setProducts, constProduct } = useContext(CartContext);
    async function filter({ target: { value } }) {
        if (value == "ALL") return setProducts(constProduct);
        const newList = constProduct.filter((pro) => {
            return pro.productCategory.match(value);
        });
        return setProducts(newList);
    }
    return (
        <div>
            <span style={{ color: "var(--main)" }}>Filter by Category: </span>
            <select name="category" id="category" className="mt-2" onChange={filter}>
                <option value="ALL">ALL</option>
                <option value="SCRUB">SCRUB</option>
                <option value="SET">SET</option>
                <option value="OIL">OIL</option>
                <option value="FACE AND BODY CREAM">FACE AND BODY CREAM</option>
                <option value="TONER, WIPES AND MASK">TONER, WIPES AND MASK</option>
                <option value="SOAP">SOAP</option>
            </select>
        </div>
    );
}
