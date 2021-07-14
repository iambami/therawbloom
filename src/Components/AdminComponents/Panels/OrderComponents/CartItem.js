import React from "react";

function CartItem({ cart }) {
    const { count, imgSrc, name, ItemPrice } = cart;
    return (
        <div className="cartItem shadow">
            <img src={imgSrc} alt="" />
            <div className="content p-3">
                <h4>{name}</h4>
                <p>Quantity: {count}</p>
                <p>Total Cost: {ItemPrice}</p>
            </div>
        </div>
    );
}

export default CartItem;
