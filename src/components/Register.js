import React from "react";
import "../cssfield/Register.css";
import { Link } from "react-router-dom";


export default function App() {
    return (
        <body>
            <section className="register-container">
                {/** Article Bağlangıç **/}
                <article className="register-card">
                    {/** Card-Left Başlangıç **/}
                    <article className="register-card-left">
                        <img className="register-rocket-img" src="/images/rocket-img.png" />
                    </article>
                    {/** Card-Left Bitiş **/}
                    <div className="register-row">
                        {/** Card-Right Başlangıç **/}
                        <article className="register-card-right">
                            <div className="user-register">
                                <h1>REGISTER</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <div className="input-group-register">
                                <input
                                    className="e-mail"
                                    type="e-mail"
                                    placeholder="E-mail"
                                />
                                <br />
                                <input
                                    className="username"
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
                            <Link to="/" className="acconut-register">
                                <a>
                                    Do you already have an account?
                                </a>
                            </Link>
                            <div className="register-btn">
                                <button>REGISTER</button>
                            </div>
                        </article>
                        {/** Card-Right Bitiş **/}
                    </div>
                </article>
                {/** Article Bitiş **/}
            </section>
        </body>
    );
}

