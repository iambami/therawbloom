import React from "react";
import Header from "../Header";
import { Route, NavLink } from "react-router-dom";
import ProductUpload from "./Panels/ProductUpload";
import EditStore from "./Panels/EditStore";
import Orders from "./Panels/Orders";
import OutOfStock from "./Panels/OutOfStock";
function Panel() {
    return (
        <>
            <Header
                props={{
                    LinkObj: [],
                }}
            />
            <section id="admin" className="admin section-bg" style={{ marginTop: 59 }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Admin</h2>
                        <div className="shopList">
                            <p>Welcome, Admin</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="panel-wrapper">
                        <div className="nav_wrapper">
                            <nav className="nav navbar d-block">
                                <ul className="navlinks">
                                    <NavLink to="/admin/" exact activeClassName={"active"}>
                                        Upload Product
                                    </NavLink>
                                    <NavLink to="/admin/editStore" exact activeClassName={"active"}>
                                        Edit store
                                    </NavLink>
                                    <NavLink to="/admin/orders" activeClassName={"active"}>
                                        Order Requests
                                    </NavLink>
                                    <NavLink to="/admin/outofstock" activeClassName={"active"}>
                                        Out of Stock
                                    </NavLink>
                                    <div style={{ width: 50, opacity: 0 }}>""</div>
                                </ul>
                            </nav>
                        </div>
                        <div className="panel">
                            <Route path={["/admin/productUpload", "/admin"]} exact>
                                <ProductUpload />
                            </Route>
                            <Route path={"/admin/editStore"} exact>
                                <EditStore />
                            </Route>
                            <Route path="/admin/orders" exact>
                                <Orders />
                            </Route>
                            <Route path="/admin/outofstock" exact>
                                <OutOfStock />
                            </Route>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Panel;
