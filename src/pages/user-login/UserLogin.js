import React from "react";
import "../user-login/UserLogin.css";
import Button from "../../components/button/ButtonLogin";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState, useEffect, useContext } from "react";
import { Input, Checkbox } from 'antd';
import { login } from '../../services/AuthServices.js';


export default function App() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAdress] = useState('');
    const [error, setError] = useState(null);

    const checkBox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const navigate = useNavigate();

    const handleChange = async (event) => {
        event.preventDefault();
        console.warn(username, password, emailAddress);

        if (username === '' || password === '') {
            setError('Kullanıcı adı ve şifre boş olamaz.');
            return;
        }

        try {
            const data = await login(username, password, emailAddress);
            const token = data.token;
            if (token) {
                localStorage.setItem("user-info", JSON.stringify(data));
                navigate("/admin");
            } else {
                setError('Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error) {
            console.error(error);
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
                            <Link className="user-login-btn">
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

