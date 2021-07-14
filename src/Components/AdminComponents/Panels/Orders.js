import React, { useState, useEffect } from "react";
import EachOrder from "./OrderComponents/EachOrder";
import firebase from "../../../utils/firebase";
function Orders() {
    const [orders, setOrders] = useState([]);
    var data = {
        OrderId: "7e91b1c6-1e87-4e2b-8624-e02cadfc2900",
        completed: false,
        payload: {
            ClientData: {
                name: "Oluwatowo Rosanwo",
                email: "olueatoworosanwo@gmail.com",
                number: "08024537884",
                address: "1, folusho ojeleye street Adiyan, agbado",
                region: "Akure",
                totalPrice: 7400,
                receiptUrl:
                    "https://firebasestorage.googleapis.com/v0/b/rawbloom-51270.appspot.com/o/Reciepts%2FOluwatowo%20Rosanwo?alt=media&token=4ccb3d46-320a-4574-bc00-c07b781eebc9",
                shipping_fee: 2000,
                delivery_method: "Park Delivery",
            },
            ClientCart: [
                {
                    IdInCart: "93eeaf2a-9411-40ed-9444-5244051a4658",
                    id: "c776adca-184e-429c-aa40-1981d38ed347",
                    count: 2,
                    name: "Intense face Toner",
                    ItemPrice: 5400,
                    imgSrc:
                        "https://firebasestorage.googleapis.com/v0/b/rawbloom-51270.appspot.com/o/Product%20images%2FIntense%20face%20Toner?alt=media&token=7e757d9e-5e8f-4a97-9652-56f64f1ce419",
                    quantity: 10,
                    price: 2700,
                },
                {
                    IdInCart: "b26af0dc-e8d7-4a2b-9b7f-493d7b9846d2",
                    id: "c776adca-184e-429c-aa40-1981d38ed347",
                    count: 1,
                    name: "Intense face Toner",
                    ItemPrice: 2700,
                    imgSrc:
                        "https://firebasestorage.googleapis.com/v0/b/rawbloom-51270.appspot.com/o/Product%20images%2FIntense%20face%20Toner?alt=media&token=7e757d9e-5e8f-4a97-9652-56f64f1ce419",
                    quantity: 10,
                    price: 2700,
                },
                {
                    IdInCart: "b26af0dc-e8d7-4a2b-9b7f-493d7b9846d2",
                    id: "c776adca-184e-429c-aa40-1981d38ed347",
                    count: 1,
                    name: "Intense face Toner",
                    ItemPrice: 2700,
                    imgSrc:
                        "https://firebasestorage.googleapis.com/v0/b/rawbloom-51270.appspot.com/o/Product%20images%2FIntense%20face%20Toner?alt=media&token=7e757d9e-5e8f-4a97-9652-56f64f1ce419",
                    quantity: 10,
                    price: 2700,
                },
            ],
        },
    };

    useEffect(() => {
        getOrders();
    }, []);

    async function getOrders() {
        try {
            const db = firebase.firestore().collection("orders");
            const collection = db.onSnapshot(async (collection) => {
                var list = [];
                collection.forEach((data) => {
                    list.push(data.data());
                });
                setOrders(list);
            });
        } catch (error) {
            console.log(error);
        }
    }
    const dataJSX = orders.map((data, index) => {
        return <EachOrder data={data} key={index} />;
    });
    return (
        <div className="orders">
            <h4>Order Requests</h4>
            <div className="orderList mt-5">{dataJSX}</div>
        </div>
    );
}

export default Orders;
