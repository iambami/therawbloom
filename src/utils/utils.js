import { store } from "react-notifications-component";
import $ from "jquery";
export function Notification(type, title, message) {
    store.addNotification({
        title,
        message,
        type,
        container: "top-left",
        animationIn: ["animated", "jackInTheBox"],
        animationOut: ["animated", "bounceOut"],
        dismiss: {
            duration: 3000,
            onScreen: true,
            showIcon: true,
            touch: true,
            click: true,
        },
    });
}

export const States = [
    {
        city: "Ibadan",
        delivery_method: "Home Delivery",
        shipping_fee: 500,
    },
    {
        city: "Oyo",
        delivery_method: "Park Delivery",
        shipping_fee: 500,
    },
    {
        city: "Lagos",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Lagos(Mainland)",
        delivery_method: "Home Delivery",
        shipping_fee: 2000,
    },
    {
        city: "Lagos(Island)",
        delivery_method: "Home Delivery",
        shipping_fee: 2500,
    },
    {
        city: "Abuja",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Ilorin",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Ilorin",
        delivery_method: "Home Delivery",
        shipping_fee: 3000,
    },
    {
        city: "Ondo",
        delivery_method: "Park Delivery",
        shipping_fee: 2000,
    },
    {
        city: "Ondo",
        delivery_method: "Home Delivery",
        shipping_fee: 3000,
    },
    {
        city: "Akure",
        delivery_method: "Park Delivery",
        shipping_fee: 2000,
    },
    {
        city: "Akure",
        delivery_method: "Home Delivery",
        shipping_fee: 3000,
    },
    {
        city: "Akure",
        delivery_method: "Home Delivery",
        shipping_fee: 2000,
    },
    {
        city: "Akure",
        delivery_method: "Home Delivery",
        shipping_fee: 3000,
    },
    {
        city: "Ekiti",
        delivery_method: "Home Delivery",
        shipping_fee: 2000,
    },
    {
        city: "Ekiti",
        delivery_method: "Home Delivery",
        shipping_fee: 3500,
    },
    {
        city: "Kano",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Kaduna",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Port-harcourt",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Osun",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Osogbo",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Imo",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Anambra",
        delivery_method: "GIG",
        shipping_fee: 3500,
    },
    {
        city: "Benin",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Edo",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Ogun",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Abeokuta",
        delivery_method: "Park Delivery",
        shipping_fee: 1000,
    },
    {
        city: "Jos",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Maduguri",
        delivery_method: "GIG",
        shipping_fee: 3500,
    },
    {
        city: "Delta",
        delivery_method: "GIG",
        shipping_fee: 3500,
    },
    {
        city: "Asaba",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Clabar",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Cross River",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Kwara",
        delivery_method: "Park Delivery",
        shipping_fee: 1500,
    },
    {
        city: "Nasarawa",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Bayelsa",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Bauchi",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Benue",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Enugu",
        delivery_method: "GIG",
        shipping_fee: 2700,
    },
    {
        city: "Gombe",
        delivery_method: "GIG",
        shipping_fee: 3500,
    },
    {
        city: "Oweri",
        delivery_method: "GIG",
        shipping_fee: 3000,
    },
    {
        city: "Lokoja(ABC Park)",
        delivery_method: "Park Delivery",
        shipping_fee: 3000,
    },
];

export function scroll(e) {
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
}

export const HeaderLinks = [
    {
        link: "#header",
        name: "Home",
        active: true,
    },
    {
        link: "#shop",
        name: "Shop",
    },
    {
        link: "#about",
        name: "About",
    },

    {
        link: "#contact",
        name: "Contact",
    },
];

export const ImageTypes = ["image/png", "image/jpg", "image/jpeg"];

export function Copy(message, item) {
    var temp = document.createElement("input");
    var body = document.querySelector("body");
    body.appendChild(temp);
    temp.value = document.querySelector(item).innerHTML;
    temp.select();
    document.execCommand("copy");
    body.removeChild(temp);
    Notification("success", "Copied", message);
}
