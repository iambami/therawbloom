import { useEffect } from "react";
import $ from "jquery";

function ScrollAnim() {
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    useEffect(() => {
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
}

export default ScrollAnim;
