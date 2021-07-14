import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import CartItem from "./CartItem";
import firebase from "../../../../utils/firebase";
function EachOrder({ data }) {
    const [recieptModal, setRecieptModal] = useState(false);
    var { OrderId, completed, payload, totalPrice } = data;
    var { ClientData, ClientCart } = payload;
    var {
        name,
        email,
        number,
        address,
        region,
        delivery_method,
        shipping_fee,
        receiptUrl,
    } = ClientData;

    const Params = {
        spaceBetween: 15,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    };

    SwiperCore.use([Navigation]);
    const cartItems = ClientCart.map((cart, index) => {
        return (
            <SwiperSlide key={index}>
                <CartItem cart={cart} />
            </SwiperSlide>
        );
    });

    function markComplete(id) {
        firebase.firestore().collection("orders").doc(id).update({ completed: !completed });
    }

    return (
        <div className={`mb-5 eachOrder ${completed ? "completed" : ""}`}>
            <div className="content shadow ">
                <div className="breakdown p-2">
                    <div className="d-flex justify-content-between align-items-center data">
                        <span>Order Id</span>
                        <span className="text-right">{OrderId}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between data">
                        <span>Client Name</span>
                        <span className="text-right">{name}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-content-between data">
                        <span>Cart Items Cost</span>
                        <span className="text-right">&#8358;{totalPrice}</span>
                    </div>
                    <div className="d-flex justify-content-between data">
                        <span>Shipping Fee</span>
                        <span className="text-right">&#8358;{shipping_fee}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between data">
                        <span>Total Cost</span>
                        <span className="text-right">&#8358;{totalPrice + shipping_fee}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center data">
                        <span>Reciept</span>
                        <span className="text-right">
                            <button className="copy" onClick={() => setRecieptModal(true)}>
                                Reciept
                            </button>
                        </span>
                    </div>
                    <hr />
                </div>
                <div className="Order_address p-2 pb-3">
                    <div className="data">
                        <span className="tag">Client Address</span>
                        <p>{address}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 data">
                            <span className="tag">Client Phone Number</span>
                            <p>{number}</p>
                        </div>
                        <hr />
                        <div className="col-md-6 data">
                            <span className="tag">Client Email</span>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 data">
                            <span className="tag">Client Region</span>
                            <p>{region}</p>
                        </div>
                        <hr />
                        <div className="col-md-6 data">
                            <span className="tag">Client Delivery Method</span>
                            <p>{delivery_method}</p>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <h6 className="ml-3">Client Cart Items</h6>
                        <div className="col-md-12 cartItems">
                            <Swiper slidesPerView={"auto"} spaceBetween={15} navigation>
                                {cartItems}
                            </Swiper>
                        </div>
                    </div>
                    <div className="row px-3">
                        <button className="copy ml-auto" onClick={() => markComplete(OrderId)}>
                            Mark as Completed
                        </button>
                    </div>
                </div>
            </div>
            <CSSTransition in={recieptModal} classNames={"show"} timeout={400} unmountOnExit>
                <RecieptModal URL={receiptUrl} setRecieptModal={setRecieptModal} />
            </CSSTransition>
        </div>
    );
}

export default EachOrder;
function RecieptModal({ URL, setRecieptModal }) {
    return (
        <div className="receipt">
            <div className="receiptModal_close">
                <MdClose size="1.5rem" onClick={() => setRecieptModal(false)} />
            </div>
            <div className="imageModal">
                <img src={URL} alt="reciept" />
            </div>
        </div>
    );
}
