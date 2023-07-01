import React from "react";
import "../cssfield/UserLogin.css";
import { Link } from "react-router-dom";



export default function App() {
    return (
        <body className="user-login-body-color">
            <section className="userlogin-container">
                {/** Article Bağlangıç **/}
                <article className="userlogin-card">
                    {/** Card-Left Başlangıç **/}
                    <article className="user-card-left">
                        <img className="user-rocket-img" src="/images/rocket-img.png" />
                    </article>
                    {/** Card-Left Bitiş **/}
                    <div className="userlogin-row">
                        {/** Card-Right Başlangıç **/}
                        <article className="user-card-right">
                            <div className="user-login">
                                <h1>USER LOGIN</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <div className="input-group-user">
                                <input
                                    className="user-name"
                                    type="text"
                                    placeholder="Username"
                                />
                                <br />
                                <input
                                    className="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="forget-password">
                                <div>
                                    <p className="checkbox">
                                        <input type="checkbox" id="myCheckbox" />
                                        <label for="myCheckbox"></label> Remember
                                    </p>
                                </div>
                                <div>
                                    <Link to="/recoverpassword">
                                        <a>Reset Password</a>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/admin" className="user-login-btn">
                                <button>LOGIN</button>
                            </Link>
                            <Link to="/register" className="user-register-btn">
                                <a>New here? Create an Account</a>
                            </Link>
                        </article>
                        {/** Card-Right Bitiş **/}
                    </div>
                </article>
                {/** Article Bitiş **/}
            </section>
        </body>
    );
}

