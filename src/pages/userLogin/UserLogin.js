import React from "react";
import "./UserLogin.css";
import "../../components/button/ButtonLogin.css";
import "../../components/auth-input/AuthInput.css";
import LoginImage from '../../components/loginImage/LoginImage';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { Input, Checkbox } from 'antd';
import { login } from '../../services/authService.js';


export default function App() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const checkBox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const loginAndNavigate = async (username, password, emailAddress) => {

        const token = await login(username, password, emailAddress);

        if (token) {
            localStorage.setItem('access-token', token);
            navigate('/admin');
        } else {
            setError('Kullanıcı adı veya şifre yanlış.');
            navigate('/');
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();

        const inputValue = document.getElementById('user-name-input').value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(inputValue)) {
            const username = '';
            const emailAddress = inputValue;

            loginAndNavigate(username, password, emailAddress);
        } else {
            const username = inputValue;
            const emailAddress = '';

            if (username === '' || password === '') {
                setError('Kullanıcı adı veya şifre boş olamaz.');
                navigate('/');
            }

            loginAndNavigate(username, password, emailAddress);
        }
    };


    const ErrorMessage = ({ message }) => {
        return <div id="error-message"><p>{message}</p></div>;
    };

    return (
        <section className="user-login-body-color">
            <section className="userlogin-container">
                {/** Article Bağlangıç **/}
                <article className="userlogin-card">
                    {/** Card-Left Başlangıç **/}
                    <LoginImage />
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
                                    prefix={<AiOutlineUser style={{ marginLeft: "-15px" }} />}
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
                                    <Checkbox onChange={checkBox} style={{ color: "#73228B" }}>Remember</Checkbox>
                                </div>
                                <div>
                                    <Link to="/recoverpassword">
                                        Reset Password
                                    </Link>
                                </div>
                            </div>
                            <div>
                                {error && <ErrorMessage message={error} />}
                            </div>
                            <Link className="auth-btn">
                                <button onClick={handleChange} type="submit">LOGIN</button>
                            </Link>
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
