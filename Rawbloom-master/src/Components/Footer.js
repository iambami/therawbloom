import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <h3>Rawbloom</h3>
                                <p>
                                    <strong>Phone:</strong>
                                    <a href="tel:08086421686" target="_blank">
                                        08086421686
                                    </a>
                                    <br />
                                    <strong>Email:</strong>
                                    <a href="mailto:Rawbloomskincare02@gmail.com" target="_blank">
                                        Rawbloomskincare02@gmail.com
                                    </a>
                                    <br />
                                </p>
                                <div className="social-links mt-3">
                                    <a href="#" className="instagram">
                                        <FaInstagram />
                                    </a>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=08086421686&text="
                                        className="instagram"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
