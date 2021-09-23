import React, { useState } from "react";
import {} from "react-icons";
import { MdArrowForward } from "react-icons/md";
import { Notification } from "../utils/utils";
import Panel from "./AdminComponents/Panel";
function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);
    return loggedIn ? <Panel /> : <Login setLoggedIn={setLoggedIn} />;
}

export default Admin;

function Login({ setLoggedIn }) {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });
    function verify(e) {
        e.preventDefault();
        if (
            loginDetails.username !== process.env.REACT_APP_ADMIN_USERNAME ||
            loginDetails.password !== process.env.REACT_APP_ADMIN_PASSWORD
        ) {
            setLoginDetails({ username: "", password: "" });
            Notification(
                "danger",
                "Invalid Login Datails",
                "Either your username or pasword is not correct, Try again!"
            );
        } else {
            setLoggedIn(true);
        }
    }
    return (
        <div className="form_wrapper">
            <form className="admin_login" onSubmit={verify}>
                <div className="form-header">
                    <h1>Are you an Admin?</h1>
                </div>
                <div className="form-text">
                    <p>
                        <span>verify...</span>
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        className="username form-control"
                        value={loginDetails.username}
                        onChange={({ target: { value } }) => {
                            setLoginDetails((prev) => {
                                return { ...prev, username: value };
                            });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password form-control"
                        value={loginDetails.password}
                        onChange={({ target: { value } }) =>
                            setLoginDetails((prev) => {
                                return { ...prev, password: value };
                            })
                        }
                    />
                </div>
                <button type="submit">
                    <MdArrowForward size="1.5rem" />
                </button>
            </form>
        </div>
    );
}
