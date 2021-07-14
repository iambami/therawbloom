import React, { useRef, useState, useEffect, useContext } from "react";
import { CgClose } from "react-icons/cg";
import Swiper from "react-id-swiper";
import "swiper/swiper.min.css";
import { CartContext, formDataContext } from "../utils/Contexts";
import OrderForm from "./PlaceOrderComponents/OrderForm";
import Summary from "./PlaceOrderComponents/Summary";
function PlaceOrder({ props: { PlaceOrderModal } }) {
    const { setPlaceOrderModal } = useContext(CartContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        region: "",
        receiptUrl: "",
        shipping_fee: "",
        delivery_method: "",
    });
    const [proceed, setProceed] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const SwiperRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (proceed && formData.receiptUrl !== "") {
            setConfirm(true);
        }
    }, [proceed, formData.receiptUrl]);

    useEffect(() => {
        return () => {
            setFormData({
                name: "",
                email: "",
                number: "",
                address: "",
                region: "",
                receiptUrl: "",
                shipping_fee: "",
                delivery_method: "",
            });
            setProceed(false);
            setConfirm(false);
        };
    }, []);

    function next() {
        if (SwiperRef.current) {
            SwiperRef.current.swiper.slideNext();
            modalRef.current.scrollTop = 0;
        }
    }
    function prev() {
        if (SwiperRef.current) {
            SwiperRef.current.swiper.slidePrev();
            modalRef.current.scrollTop = 0;
        }
    }

    const Params = {
        slidesPerView: 1,
    };

    return (
        <div className="PlaceOrderModal ProductModal">
            <div className="modalBox container scrollBar" ref={modalRef}>
                <div className="row">
                    <button onClick={() => setPlaceOrderModal(false)} className="closeModal">
                        <CgClose size="1.5rem" />
                    </button>
                    <formDataContext.Provider value={{ formData, setFormData, setConfirm }}>
                        <form className="text-center mt-4">
                            <Swiper ref={SwiperRef} {...Params} allowTouchMove={false}>
                                <div>
                                    <OrderForm props={{ setProceed, next, proceed }} />
                                </div>
                                <div>
                                    <Summary props={{ confirm, prev, modalRef }} />
                                </div>
                            </Swiper>
                        </form>
                    </formDataContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
