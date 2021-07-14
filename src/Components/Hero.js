import React from "react";
import $ from "jquery";
function Hero() {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div
                className="container position-relative text-center text-lg-left"
                data-aos="zoom-in"
                data-aos-delay="100"
            >
                <div className="row">
                    <div className="col-lg-8">
                        <h1>
                            Welcome to <span>Rawbloom</span>
                        </h1>
                        <h2>Beauty has no skin tone...</h2>

                        <div
                            className="btns"
                            onClick={(e) => {
                                e.preventDefault();
                                var scrolltoOffset = $("#header").outerHeight() - 1;
                                var target = $(`${e.target.attributes.href.value}`);
                                var scrollto = target.offset().top - scrolltoOffset;

                                if (e.target.attributes.href.value === "#header") {
                                    scrollto = 0;
                                }

                                $("html, body").animate(
                                    {
                                        scrollTop: scrollto,
                                    },
                                    1500,
                                    "easeInOutExpo"
                                );
                            }}
                        >
                            <a href="#shop" className="btn-menu animated fadeInUp scrollto">
                                Shop now!
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
