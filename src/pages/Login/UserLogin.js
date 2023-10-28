import "../Login/UserLogin.css";
import AuthButton from "../../components/ButtonLogin/AuthButton";
import "../../components/AuthInput/AuthInput.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Checkbox, Input } from 'antd';
import { login } from '../../services/AuthService.js';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ClipLoader } from 'react-spinners';

export default function App({setPageAuthType}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const checkBox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const hideErrorMessage = () => {
        setError(null);
    };

    const loginAndNavigate = async (username, password, emailAddress) => {
        setLoading(true);
        const { token, isAdmin } = await login(username, password, emailAddress);

        if (token) {
            localStorage.setItem('access-token', token);
            if (isAdmin) {
                navigate('/admin');
            } else {
                
            }
        } else {
            setError('Kullanıcı adı, şifre veya e-posta yanlış.');
            setTimeout(hideErrorMessage, 3000);
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('user-name-input').value.trim();
        const passwordInput = document.getElementById('password-input').value.trim();

        const isEmail = emailRegex.test(usernameInput);
        const username = isEmail ? '' : usernameInput;
        const emailAddress = isEmail ? usernameInput : '';

        if (!usernameInput || !passwordInput) {
            setError('Kullanıcı adı ve şifre alanları doldurulmalıdır.');
            setTimeout(hideErrorMessage, 3000);
        } else {
            loginAndNavigate(username, passwordInput, emailAddress);
        }
    };

    const handleRegisterClick = () => {
        setPageAuthType('authRegister');
    };

    const handleResetClick = () => {
        setPageAuthType('authResetPassword');
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message"><p>{message}</p></div>;
    };

    return (
        <div className='authLoginContainer'>
            <div className='authLoginTitle'>
                <h1>Üye Girişi</h1>
            </div>
            <div className="input-group-user">
                <Input
                    id="user-name-input"
                    className="loginPageUsernameInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username / E-mail Adress"
                    prefix={<AiOutlineUser />}
                />
                <br />
                <Input.Password
                    id="password-input"
                    className='loginPagePasswordInput'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    prefix={<RiLockPasswordLine />}
                    placeholder="Password"
                />
            </div>
            <div className="forget-password">
                <Checkbox className="checkbox-color" onChange={checkBox} style={{ color: "#73228B" }}><p className="forget-password-custom">Beni Hatırla</p></Checkbox>
                <a onClick={handleResetClick} className="forget-password-custom">Şifrenizi mi Unuttunuz?</a>
            </div>
            <div>
                {error && <ErrorMessage message={error} />}
            </div>
            {loading && <ClipLoader color={"#7465F1"} />}
            <AuthButton text="Giriş Yap" onClick={handleLogin} />
            <p>Henüz üye değil misiniz?</p>
            <Button className='authModalRegisterButton' onClick={handleRegisterClick}>Üye Ol</Button>
        </div>
    );
}
