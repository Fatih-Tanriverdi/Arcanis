import React from "react";
import "../user-login/UserLogin.css";
import Button from "../../components/button/ButtonLogin";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Input, Checkbox } from 'antd';



export default function App() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAdress] = useState('');
    
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    async function login() {
        console.warn(username, password, emailAddress)
        let result = await fetch("https://lambalog.com/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({ username: username, password: password, emailAddress: emailAddress, })

        })
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
    }


    return (
        <section className="user-login-body-color">
            <section className="userlogin-container">
                {/** Article Bağlangıç **/}
                <article className="userlogin-card">
                    {/** Card-Left Başlangıç **/}
                    <article className="user-card-left">
                        <img className="user-rocket-img" src="/images/rocket-img.png" />
                    </article>
                    {/** Card-Left Bitiş **/}
                    <article className="userlogin-row">
                        {/** Card-Right Başlangıç **/}
                        <form className="user-card-right">
                            <div className="user-login">
                                <h1>USER LOGIN</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <div className="input-group-user">
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="user-name-input"
                                    placeholder="Username / E-mail Adress"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                />
                                <br />
                                <Input.Password
                                    id="password-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    prefix={<RiLockPasswordLine />}
                                    placeholder="Password"
                                    style={{
                                        backgroundColor: "black",
                                        marginTop: "10px",
                                    }}
                                />
                            </div>
                            <div className="forget-password">
                                <div>
                                    <Checkbox onChange={onChange} style={{ color: "#73228B" }}>Remember</Checkbox>
                                </div>
                                <div>
                                    <Link to="/recoverpassword">
                                        Reset Password
                                    </Link>
                                </div>
                            </div>
                            <Button />
                            <Link to="/register" className="user-register-btn">
                                New here? Create an Account
                            </Link>
                        </form>
                        {/** Card-Right Bitiş **/}
                    </article>
                </article>
                {/** Article Bitiş **/}
            </section>
        </section>
    );
}

