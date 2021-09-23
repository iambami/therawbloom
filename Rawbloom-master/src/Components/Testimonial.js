import React from "react";
import Tes1 from "../img/testimonials/testimonials-1.jpg";
import Tes2 from "../img/testimonials/testimonials-2.jpg";
import Tes3 from "../img/testimonials/testimonials-3.jpg";
import Tes4 from "../img/testimonials/testimonials-4.jpg";
import Tes5 from "../img/testimonials/testimonials-5.jpg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Swiper from "react-id-swiper";

function Testimonial() {
    const params = {
        spaceBetween: 20,
        slidesPerView: "auto",
        loop: true,
    };
    return (
        <section id="testimonials" className="testimonials section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Testimonials</h2>
                    <p>What they're saying about us</p>
                </div>

                <Swiper
                    className="testimonials-carousel"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    {...params}
                >
                    <div className="testimonial-item">
                        <p>
                            <FaQuoteLeft className="quote-icon-left" />
                            Proin iaculis purus consequat sem cure digni ssim donec porttitora entum
                            suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh
                            et. Maecen aliquam, risus at semper.
                            <FaQuoteRight className="quote-icon-right" />
                        </p>
                        <img src={Tes1} className="testimonial-img" alt="" />
                        <h3>Saul Goodman</h3>
                        <h4>Ceo &amp; Founder</h4>
                    </div>

                    <div className="testimonial-item">
                        <p>
                            <FaQuoteLeft className="quote-icon-left" />
                            Export tempor illum tamen malis malis eram quae irure esse labore quem
                            cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua
                            noster fugiat irure amet legam anim culpa.
                            <FaQuoteRight className="quote-icon-right" />
                        </p>
                        <img src={Tes2} className="testimonial-img" alt="" />
                        <h3>Sara Wilsson</h3>
                        <h4>Designer</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>
                            <FaQuoteLeft className="quote-icon-left" />
                            Enim nisi quem export duis labore cillum quae magna enim sint quorum
                            nulla quem veniam duis minim tempor labore quem eram duis noster aute
                            amet eram fore quis sint minim.
                            <FaQuoteRight className="quote-icon-right" />
                        </p>
                        <img src={Tes3} className="testimonial-img" alt="" />
                        <h3>Jena Karlis</h3>
                        <h4>Store Owner</h4>
                    </div>

                    <div className="testimonial-item">
                        <p>
                            <FaQuoteLeft className="quote-icon-left" />
                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export
                            minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna
                            sunt elit fore quem dolore labore illum veniam.
                            <FaQuoteRight className="quote-icon-right" />
                        </p>
                        <img src={Tes4} className="testimonial-img" alt="" />
                        <h3>Matt Brandon</h3>
                        <h4>Freelancer</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>
                            <FaQuoteLeft className="quote-icon-left" />
                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam
                            tempor noster veniam enim culpa labore duis sunt culpa nulla illum
                            cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                            <FaQuoteRight className="quote-icon-right" />
                        </p>
                        <img src={Tes5} className="testimonial-img" alt="" />
                        <h3>John Larson</h3>
                        <h4>Entrepreneur</h4>
                    </div>
                </Swiper>
            </div>
        </section>
    );
}
export default Testimonial;
