import React, { useContext, useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { MdClose, MdDehaze, MdDelete } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { CartContext } from "../utils/Contexts";
import { scroll } from "../utils/utils";

function Header({ props: { LinkObj } }) {
    const [dropCart, setDropCart] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const { cart, EditItemInCart, totalPrice, setPlaceOrderModal } = useContext(CartContext);

    const LinkObjJSX = LinkObj.map(({ link, name, active }, index) => {
        return (
            <li className={`${active ? "active" : ""}`} key={index}>
                <a
                    href={link}
                    onClick={(e) => {
                        scroll(e);
                        setMobileNav(false);
                    }}
                >
                    {name}
                </a>
            </li>
        );
    });

    const FinalLink = LinkObj.length == 0 ? <Link to="/">Home</Link> : LinkObjJSX;
    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center head">
                <h1 className="logo mr-auto">
                    <a href="#header" onClick={scroll}>
                        Rawbloom
                    </a>
                </h1>
                <nav className={`nav-menu ${mobileNav ? "open" : ""}`}>
                    <MdClose
                        className="mobileNavBtn"
                        size="3rem"
                        onClick={() => {
                            setMobileNav(false);
                        }}
                    />
                    <ul>{FinalLink}</ul>
                </nav>
                {window.location.hash.search("admin") === -1 && (
                    <li
                        className="cart"
                        onClick={(e) => {
                            setDropCart(!dropCart);
                        }}
                    >
                        <span className={`notif ${cart.length > 0 ? "active" : ""}`}>
                            {cart.length}
                        </span>
                        {dropCart ? <CgClose size="1.5rem" /> : <BiCart size="1.5rem" />}
                    </li>
                )}
                <CSSTransition in={dropCart} timeout={400} classNames="dropCart" unmountOnExit>
                    <div className="cartDropDown">
                        <Cart cart={cart} edit={EditItemInCart} />
                        {cart.length == 0 ? null : (
                            <div className="cartDropFooter">
                                <div className="total">
                                    <p>Total</p>
                                    <p>&#8358;{totalPrice}</p>
                                </div>
                                <div
                                    className="order add-to-cart"
                                    onClick={() => {
                                        setPlaceOrderModal(true);
                                    }}
                                >
                                    <FaTruck />
                                    <p className="m-0 ml-2">Place Order</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CSSTransition>
                <MdDehaze
                    className="mobileNavBtn openBtn"
                    size="3rem"
                    onClick={() => {
                        setMobileNav(true);
                    }}
                />
            </div>
        </header>
    );
}

function EachItemInCart({
    props: { id, imgSrc, name, count, quantity, ItemPrice, IdInCart },
    edit: EditItemInCart,
}) {
    return (
        <div className="eachItem" key={id}>
            <img src={imgSrc} alt="" />
            <div>
                <h5>{name}</h5>
                <div className="quantity">
                    <p>Quantity</p>
                    <div className="bar">
                        <button
                            className="dec count"
                            onClick={() => {
                                EditItemInCart({ IdInCart }, "dec");
                            }}
                        >
                            <FiMinus />
                        </button>
                        {count}
                        <button
                            className="inc count"
                            onClick={() => {
                                EditItemInCart({ IdInCart, quantity }, "inc");
                            }}
                        >
                            <FiPlus color="white" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <MdDelete
                    size="1.2rem"
                    onClick={() => {
                        EditItemInCart({ IdInCart }, "del");
                    }}
                />
                <p>&#8358;{ItemPrice}</p>
            </div>
        </div>
    );
}

function Cart({ cart: cart, edit: EditItemInCart }) {
    const NoItem = (
        <div className="noItem">
            <h4>You have No Items in Your Cart!</h4>
        </div>
    );
    const CartItemsJSX = cart.map((cart, index) => {
        return <EachItemInCart props={cart} edit={EditItemInCart} key={index} />;
    });
    return cart.length == 0 ? NoItem : <div className="itemList scrollBar">{CartItemsJSX}</div>;
}

export default Header;
