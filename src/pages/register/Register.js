import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from '../../components/LoginImage/LoginImage';
import AuthButton from "../../components/ButtonLogin/AuthButton";
import { registerUser } from '../../services/AuthService';
import { ClipLoader } from 'react-spinners';
import { AuthInputEmail, AuthInputUsername, AuthInputPassword, AuthInputName, AuthInputSurname, AuthInputPhoneNumber } from '../../components/AuthInput/AuthInput';

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [values, setValues] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        password: ""
    });

    const hideErrorMessage = () => {
        setError(null);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const maskPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let errorMessage = "";

        if (!values.emailAddress) {
            errorMessage = "E-posta adresi boş olamaz.";
        } else if (!values.username) {
            errorMessage = "Kullanıcı adı boş olamaz.";
        } else if (!values.password) {
            errorMessage = "Şifre boş olamaz.";
        } else if (!values.name) {
            errorMessage = "İsim boş olamaz.";
        } else if (!values.surname) {
            errorMessage = "Soyisim boş olamaz.";
        } else if (!values.phoneNumber) {
            errorMessage = "Telefon numarası boş olamaz.";
        }

        if (errorMessage) {
            setError(errorMessage);
            setTimeout(hideErrorMessage, 3000);
        } else {
            const registrationError = await registerUser(values);
            if (registrationError) {
                setError(registrationError);
                setTimeout(hideErrorMessage, 3000);
            } else {
                setSuccessMessage("Kullanıcı kaydınız yapıldı.");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/");
                }, 3000);
            }
        }
        setLoading(false);
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-register"><p>{message}</p></div>;
    };

    return (
        <section className="register-body-color">
            <section className="register-container">
                {/* Article Bağlangıç */}
                <article className="register-card">
                    {/* Card-Left Başlangıç */}
                    <LoginImage />
                    {/* Card-Left Bitiş */}
                    <div className="register-row">
                        {/* Card-Right Başlangıç */}
                        <article className="register-card-right">
                            <div className="register-card-content">
                                <div className="user-register">
                                    <h1>REGISTER</h1>
                                    <p id="description">welcome to the website</p>
                                </div>
                                <form className="input-group-register">
                                    <AuthInputEmail value={values.emailAddress} onChange={handleInput} />
                                    <br />
                                    <AuthInputUsername value={values.username} onChange={handleInput} placeholder="Enter your Username" />
                                    <br />
                                    <AuthInputPassword value={values.password} onChange={handleInput} />
                                    <br />
                                    <AuthInputName value={values.name} onChange={handleInput} />
                                    <br />
                                    <AuthInputSurname value={values.surname} onChange={handleInput} />
                                    <br />
                                    <AuthInputPhoneNumber value={maskPhoneNumber(values.phoneNumber)} onChange={handleInput} />
                                    <br />
                                    <Link to="/" className="acconut-register">
                                        <a href="none">Do you already have an account?</a>
                                    </Link>
                                </form>
                                <div className="error-message-container">
                                    {error && <ErrorMessage message={error} />}
                                    {successMessage && <div className="success-message">{successMessage}</div>}
                                </div>
                                {loading && <ClipLoader color={"#73228B"} />}
                                <AuthButton text="REGISTER" onClick={handleSubmit} />
                            </div>
                        </article>
                        {/* Card-Right Bitiş */}
                    </div>
                </article>
                {/* Article Bitiş */}
            </section>
        </section>
    );
}
