import React from "react";
import axios from 'axios';
import "../register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { login } from '../../services/AuthServices.js';
import { Input } from 'antd';
import { useState } from 'react';



export default function App() {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        if (username === '' || password === '' || email === '' ) {
            setError('Kullanıcı bilgileri boş bırakılamaz.');
            return;
        }

        try {
            login(username, password, email);

            const newUser = {
                username,
                password,
                email
            }
            console.log(newUser);
        } catch (error) {
            console.error(error);
        }
    }

    const ErrorMessage = ({ message }) => {
        return <div id="error-message"><p>{message}</p></div>;
    };


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
                            <form className="input-group-register">
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter your E-mail"
                                    prefix={<AiOutlineMail className="site-form-item-icon" />}

                                />
                                <br />
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    placeholder="Username"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px"
                                    }}
                                />
                                <br />
                                <Input.Password
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    prefix={<RiLockPasswordLine />}
                                />
                            </form>
                            <Link to="/" className="acconut-register">
                                Do you already have an account?
                            </Link>
                            {error && <ErrorMessage message={error} />}
                            <div className="register-btn">
                                <button type="submit" onClick={registerUser} >REGISTER</button>
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

