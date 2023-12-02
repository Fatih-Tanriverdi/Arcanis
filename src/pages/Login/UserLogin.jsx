import "./UserLogin.css";
import AuthButton from "../../components/auth-button/AuthButton.jsx";
import "../../components/auth-input/AuthInput.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Checkbox, Input } from 'antd';
import { login } from '../../services/authService';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { ClipLoader } from 'react-spinners';
import FloatLabel from "../../components/float-label/float-label.jsx";

export default function App({ setPageAuthType, setIsModalOpen, setAccessToken }) {
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
                navigate('/');
                setAccessToken(localStorage.getItem('access-token'));
                setIsModalOpen(false);
            }
        } else {
            setError('Kullanıcı adı, şifre veya e-posta yanlış.');
            setTimeout(hideErrorMessage, 3000);
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('userNameInput').value.trim();
        const passwordInput = document.getElementById('passwordInput').value.trim();

        const isEmail = emailRegex.test(usernameInput);
        const username = isEmail ? '' : usernameInput;
        const emailAddress = isEmail ? usernameInput : '';

        if (!usernameInput || !passwordInput) {
            setError('Kullanıcı adı ve şifre alanları doldurulmalıdır.');
            setTimeout(hideErrorMessage, 3000);
        } else {
            loginAndNavigate(username, passwordInput, emailAddress);
            setAccessToken(localStorage.getItem('access-token'));
            localStorage.setItem("isFirstLogin", "true");
            setIsModalOpen(true);
        }
    };

    const handleRegisterClick = () => {
        setPageAuthType('authRegister');
    };

    const handleResetClick = () => {
        setPageAuthType('authResetPassword');
    };

    const ErrorMessage = ({ message }) => {
        return <div id="errorMessageLogin"><p>{message}</p></div>;
    };

    return (
        <div className='authLoginContainer'>
            <div className='authLoginTitle'>
                <h1>Üye Girişi</h1>
            </div>
            <div className="inputGroupUser">
                <FloatLabel label="Kullanıcı adı veya E-posta" name="username" value={username}>
                    <Input
                        id="userNameInput"
                        className="loginPageUsernameInput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        prefix={<AiOutlineUser />}
                    />
                </FloatLabel>
                <FloatLabel label="Şifre" name="password" value={password}>
                    <Input.Password
                        id="passwordInput"
                        className='loginPagePasswordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        prefix={<RiLockPasswordLine />}
                    />
                </FloatLabel>
            </div>
            <div className="forgetPassword">
                <Checkbox className="checkboxColor" onChange={checkBox} style={{ color: "#73228B" }}><p className="forgetPasswordColor">Beni Hatırla</p></Checkbox>
                <a onClick={handleResetClick} className="forgetPasswordColor">Şifrenizi mi Unuttunuz?</a>
            </div>
            <div>
                {error && <ErrorMessage message={error} />}
            </div>
            {loading && <ClipLoader color={"#7465F1"} />}
            <AuthButton text="Giriş Yap" onClick={handleLogin} />
            <p className="forgetPasswordColor">Henüz üye değil misiniz? <Link onClick={handleRegisterClick}>Üye ol</Link></p>
        </div>
    );
}