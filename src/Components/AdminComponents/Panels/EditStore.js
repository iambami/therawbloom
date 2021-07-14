import React, { useContext } from "react";
import { CartContext } from "../../../utils/Contexts";
import ItemCard from "./ItemCard";
function EditStore() {
    const { products } = useContext(CartContext);

    const productsJSX = products.map((product, index) => {
        return <ItemCard key={index} props={product} />;
    });
    return (
        <div className="editProduct">
            <h4>Edit Store</h4>
            <div className="editList">{productsJSX}</div>
        </div>
    );
}

export default EditStore;
