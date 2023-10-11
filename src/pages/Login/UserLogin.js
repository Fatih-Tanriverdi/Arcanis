import "../Login/UserLogin.css";
import AuthButton from "../../components/ButtonLogin/AuthButton";
import "../../components/AuthInput/AuthInput.css";
import LoginImage from '../../components/LoginImage/LoginImage';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Checkbox, Input } from 'antd';
import { login } from '../../services/AuthService.js';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ClipLoader } from 'react-spinners';

export default function App() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const checkBox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const loginAndNavigate = async (username, password, emailAddress) => {
        setLoading(true);
        const { token, isAdmin } = await login(username, password, emailAddress);
        if (token && isAdmin) {
            navigate('/admin');
            localStorage.setItem('access-token', token);
        } else if (token && !isAdmin) {
            navigate('/customer');
            localStorage.setItem('access-token', token);
        } else {
            setError('Kullanıcı adı, şifre veya e-posta yanlış.');
            navigate('/');
        }
        setLoading(false);
    };

    const handleChange = async (e) => {
        e.preventDefault();
        const inputValue = document.getElementById('user-name-input').value.trim();
        const password = document.getElementById('password-input').value.trim();

        const isEmail = emailRegex.test(inputValue);
        const username = isEmail ? '' : inputValue;
        const emailAddress = isEmail ? inputValue : '';

        const errorMessage =
            inputValue === '' && password === '' ? 'Kullanıcı adı, şifre veya e-posta boş olamaz.' :
                inputValue === '' ? 'Kullanıcı adı boş olamaz.' : password === '' ? 'Şifre boş olamaz.' : '';
        errorMessage ? setError(errorMessage) : loginAndNavigate(username, password, emailAddress);
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message"><p>{message}</p></div>;
    };

    return (
        <section className="user-login-body-color">
            <section className="userlogin-container">
                {/** Article Bağlangıç **/}
                <article className="userlogin-card">
                    <div className="user-card-position">
                        {/** Card-Left Başlangıç **/}
                        <LoginImage />
                        {/** Card-Left Bitiş **/}
                        <article className="userlogin-row">
                            {/** Card-Right Başlangıç **/}
                            <form className="user-card-right">
                                <div className="user-card-content">
                                    <div id="user-login">
                                        <h1>USER LOGIN</h1>
                                        <p id="description">welcome to the website</p>
                                    </div>
                                    <div className="input-group-user">
                                        <Input
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            id="user-name-input"
                                            placeholder="Username / E-mail Adress"
                                            prefix={<AiOutlineUser />}
                                        />
                                        <br />
                                        <Input.Password
                                            id="password-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            prefix={<RiLockPasswordLine />}
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="forget-password">
                                        <Checkbox className="checkbox-color" onChange={checkBox} style={{ color: "#73228B" }}><p className="forget-password-custom">Remember</p></Checkbox>
                                        <Link to="/recoverpassword"><p className="forget-password-custom">Reset Password</p></Link>
                                    </div>
                                    <div>
                                        {error && <ErrorMessage message={error} />}
                                    </div>
                                    {loading && <ClipLoader color={"#73228B"} />}
                                    <AuthButton text="LOGIN" onClick={handleChange} />
                                    <Link to="/register" className="user-register-btn"><p>New here? Create an Account</p></Link>
                                </div>
                            </form>
                            {/** Card-Right Bitiş **/}
                        </article>
                    </div>
                </article>
                {/** Article Bitiş **/}
            </section>
        </section>
    );
}
