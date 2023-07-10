import React from "react";
import "../register/Register.css";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from 'antd';


export default function App() {
    return (
        <section className="register-body-color">
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
                                <Input
                                    placeholder="Enter your E-mail"
                                    prefix={<AiOutlineMail className="site-form-item-icon" />}
                                    
                                />
                                <br />
                                <Input
                                    placeholder="Username"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px"
                                    }}
                                />
                                <br />
                                <Input.Password
                                    placeholder="Password"
                                    prefix={<RiLockPasswordLine />}
                                />
                            </div>
                            <Link to="/" className="acconut-register">
                                    Do you already have an account?
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
        </section>
    );
}

