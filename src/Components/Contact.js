import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import { BsClock } from "react-icons/bs";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { BsExclamationCircle } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Contact() {
    const [errs, setErrs] = useState({
        name: false,
        email: false,
        subject: false,
        message: false,
    });
    const [formData, setFormDatat] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    function setData(name, value) {
        setFormDatat((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function sendMessage(e) {
        e.preventDefault();
        let Check = true;

        for (const err in errs) {
            if (errs[err] === true) {
                Check = false;
                break;
            }
        }
        if (!Check) return alert("Please Fill All Inputs!");

        //
        // Send Form data with Email Js
        //
    }
    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Contact</h2>
                    <p>Contact Us</p>
                </div>
            </div>

            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="info">
                            <div className="email">
                                <i>
                                    <BiEnvelope />
                                </i>
                                <h4>Email:</h4>
                                <p>
                                    <a href="mailto:Rawbloomskincare02@gmail.com" target="_blank">
                                        Rawbloomskincare02@gmail.com
                                    </a>
                                </p>
                            </div>
                            <div className="email">
                                <i>
                                    <FiInstagram />
                                </i>
                                <h4>Instagram:</h4>
                                <p>@rawbloom_skincare</p>
                            </div>
                            <div className="email">
                                <i>
                                    <FaWhatsapp />
                                </i>
                                <h4>Whatsapp:</h4>
                                <p>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=08086421686&text="
                                        target="_blank"
                                    >
                                        08086421686
                                    </a>
                                </p>
                            </div>

                            <div className="phone">
                                <i>
                                    <BiPhone />
                                </i>
                                <h4>Call:</h4>
                                <p>
                                    <a href="tel:08086421686" target="_blank">
                                        08086421686
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 mt-5 mt-lg-0">
                        <form className="php-email-form" onSubmit={sendMessage}>
                            <div className="form-row">
                                <div className="col-md-6 form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        data-rule="minlen:4"
                                        required={true}
                                        onChange={({ target: { name, value } }) => {
                                            setData(name, value);
                                            if (value.length < 4 && value.length > 0) {
                                                setErrs((prev) => {
                                                    return { ...prev, [name]: true };
                                                });
                                            } else
                                                setErrs((prev) => {
                                                    return { ...prev, [name]: false };
                                                });
                                        }}
                                    />
                                    <div className={`validate ${errs.name ? "show" : ""}`}>
                                        <BsExclamationCircle strokeWidth={1} /> Please enter at
                                        least 4 chars
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        data-rule="email"
                                        required={true}
                                        onChange={({ target: { name, value } }) => {
                                            setData(name, value);
                                            var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            if (!value.match(mailformat) && value.length > 0) {
                                                setErrs((prev) => {
                                                    return { ...prev, [name]: true };
                                                });
                                            } else
                                                setErrs((prev) => {
                                                    return { ...prev, [name]: false };
                                                });
                                        }}
                                    />
                                    <div className={`validate ${errs.email ? "show" : ""}`}>
                                        <BsExclamationCircle strokeWidth={1} /> Please enter a valid
                                        email
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject"
                                    data-rule="minlen:4"
                                    required={true}
                                    onChange={({ target: { name, value } }) => {
                                        setData(name, value);
                                        if (value.length < 8 && value.length > 0) {
                                            setErrs((prev) => {
                                                return { ...prev, [name]: true };
                                            });
                                        } else
                                            setErrs((prev) => {
                                                return { ...prev, [name]: false };
                                            });
                                    }}
                                />
                                <div className={`validate ${errs.subject ? "show" : ""}`}>
                                    <BsExclamationCircle strokeWidth={1} /> Please enter at least 8
                                    chars of subject
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows="8"
                                    data-rule="required"
                                    placeholder="Message"
                                    required={true}
                                    onChange={({ target: { name, value } }) => {
                                        setData(name, value);
                                        if (value.length <= 0) {
                                            setErrs((prev) => {
                                                return { ...prev, [name]: true };
                                            });
                                        } else
                                            setErrs((prev) => {
                                                return { ...prev, [name]: false };
                                            });
                                    }}
                                ></textarea>
                                <div className={`validate ${errs.message ? "show" : ""}`}>
                                    Please write something for us
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
