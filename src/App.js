import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
// import Testimonial from "./Components/Testimonial";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Shop from "./Components/Shop";
// import WhyUs from "./Components/WhyUs";
import Contact from "./Components/Contact";
import Store from "./Components/Store";
import "jquery.easing";
import $ from "jquery";
import { BiUpArrowAlt } from "react-icons/bi";
import { Notification, HeaderLinks } from "./utils/utils";
import { v4 } from "uuid";
import PlaceOrder from "./Components/PlaceOrder";
import { HashRouter as Router, Route } from "react-router-dom";
import firebase from "./utils/firebase";
import Admin from "./Components/Admin";
import { CartContext } from "./utils/Contexts";
import { CSSTransition } from "react-transition-group";

function App() {
    const [Loading, setLoading] = useState(true);
    const [cart, AddToCart] = useState([]);
    const [PlaceOrderModal, setPlaceOrderModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [constProduct, setConstProduct] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $("#header").addClass("header-scrolled");
                $(".back-to-top").fadeIn("slow");
            } else {
                $("#header").removeClass("header-scrolled");
                $(".back-to-top").fadeOut("slow");
            }
        });
    }, []);

    setTimeout(() => {
        var nav_sections = $("section");
        var main_nav = $(".nav-menu, .mobile-nav");

        $(window).on("scroll", function () {
            var cur_pos = $(this).scrollTop() + 200;

            nav_sections.each(function () {
                var top = $(this).offset().top,
                    bottom = top + $(this).outerHeight();
                if (cur_pos >= top && cur_pos <= bottom) {
                    if (cur_pos <= bottom) {
                        main_nav.find("li").removeClass("active");
                    }
                    main_nav
                        .find('a[href="#' + $(this).attr("id") + '"]')
                        .parent("li")
                        .addClass("active");
                }
                if (cur_pos < 300) {
                    $(".nav-menu ul:first li:first").addClass("active");
                }
            });
        });
    }, 100);

    useEffect(() => {
        var price = 0;
        for (let index = 0; index < cart.length; index++) {
            price = price + cart[index].ItemPrice;
        }
        setTotalPrice(price);
    }, [cart]);

    function AddItemToCart({ id, count, name, ItemPrice, imgSrc, quantity, price }) {
        const item = {
            IdInCart: v4(),
            id,
            count,
            name,
            ItemPrice,
            imgSrc,
            quantity,
            price,
        };
        item.ItemPrice = item.count * item.price;
        AddToCart((prev) => [...prev, item]);
        return true;
    }

    function EditItemInCart({ IdInCart, quantity = null }, action) {
        switch (action) {
            case "del":
                AddToCart(
                    cart.filter((item) => {
                        return item.IdInCart !== IdInCart;
                    })
                );
                Notification(
                    "danger",
                    "Item Removed from Cart!",
                    "Your Item has been rewmoved from Your Cart!"
                );
                break;
            case "dec":
                AddToCart(
                    cart.map((cartItem) => {
                        if (cartItem.IdInCart === IdInCart) {
                            if (cartItem.count <= 1) return cartItem;
                            else {
                                cartItem.count--;
                                cartItem.ItemPrice = cartItem.count * cartItem.price;
                            }
                        }
                        return cartItem;
                    })
                );
                break;
            case "inc":
                AddToCart(
                    cart.map((cartItem) => {
                        if (cartItem.IdInCart === IdInCart) {
                            if (cartItem.count >= quantity) return cartItem;
                            else {
                                cartItem.count++;
                                cartItem.ItemPrice = cartItem.count * cartItem.price;
                            }
                        }
                        return cartItem;
                    })
                );
                break;
            default:
                return;
        }
    }

    function getProducts() {
        try {
            const db = firebase.firestore().collection("store");
            const collection = db.onSnapshot(async (collection) => {
                var list = [];
                collection.forEach((data) => {
                    list.push(data.data());
                });
                setConstProduct(list);
                setProducts(list);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return Loading ? (
        <div id="preloader"></div>
    ) : (
        <div className="App">
            <div>
                <Router>
                    <CartContext.Provider
                        value={{
                            cart,
                            AddItemToCart,
                            EditItemInCart,
                            totalPrice,
                            setPlaceOrderModal,
                            products,
                            AddToCart,
                            setProducts,
                            constProduct,
                        }}
                    >
                        <Route path="/store">
                            <Header
                                props={{
                                    LinkObj: [],
                                }}
                            />
                            <Store />
                        </Route>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                        <Route path="/" exact>
                            <div>
                                <Header
                                    props={{
                                        LinkObj: HeaderLinks,
                                    }}
                                />
                                <Hero />
                                <Shop />
                                <About />
                                {/* <WhyUs /> */}
                                {/* <Testimonial /> */}
                                <Contact />
                                <Footer />
                            </div>
                        </Route>
                        <CSSTransition
                            in={PlaceOrderModal}
                            classNames="show1"
                            timeout={250}
                            unmountOnExit
                        >
                            <PlaceOrder props={{ PlaceOrderModal }} />
                        </CSSTransition>
                    </CartContext.Provider>
                </Router>
            </div>
            <a
                className="back-to-top"
                onClick={() => {
                    $("html, body").animate(
                        {
                            scrollTop: 0,
                        },
                        1500,
                        "easeInOutExpo"
                    );
                }}
            >
                <i>
                    <BiUpArrowAlt />
                </i>
            </a>
        </div>
    );
}

export default App;
