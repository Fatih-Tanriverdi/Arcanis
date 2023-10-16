import React, { useReducer, useState } from "react";
import "./ResetPassword.css";
import { AiFillBackward, AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from '../../components/LoginImage/LoginImage';
import AuthButton from "../../components/ButtonLogin/AuthButton";
import { Input, Tooltip } from "antd";
import { ClipLoader } from 'react-spinners';
import { resetPassword } from '../../services/AuthService'

export default function App() {
    const [emailAddress, setEmailAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const hideErrorMessage = () => {
        setError(null);
    };

    const handleResetPassword = async () => {
        if (!emailAddress) {
            setError("Email Boş Olamaz.");
            setTimeout(hideErrorMessage, 3000);
            return;
        }
        try {
            setLoading(true);
            const message = await resetPassword(emailAddress);
            setLoading(false);
            setSuccessMessage("Mail adresinize şifre sıfırlama mesajı gönderildi. Lütfen e-mail adresinizi kontrol edin.");
            setTimeout(() => {
                setSuccessMessage("");
                navigate("/");
            }, 3000);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-reset"><p>{message}</p></div>;
    };

    return (
        <section className="recover-body-color">
            <section className="recover-container">
                {/** Article Bağlangıç **/}
                <article className="recover-card">
                    {/** Card-Left Başlangıç **/}
                    <LoginImage />
                    {/** Card-Left Bitiş **/}
                    <div className="recover-row">
                        {/** Card-Right Başlangıç **/}
                        <article className="card-right-recover">
                            <div className="recover-content">
                                <div className="reset-icon-style">
                                    <Link to="/">
                                        <AiFillBackward
                                            style={{
                                                color: "#73228B",
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="user-recover">
                                    <h1>RESET PASSWORD</h1>
                                    <span id="description">Have you forgotten your password ?
                                        <p>Dont't worry, enter the email address you used to create your profile and we'll sen you instructions for generating a new one.</p>
                                    </span>
                                </div>
                                <div className="input-group-recover">
                                    <Input
                                        className="ınputRegister"
                                        name="emailAddress"
                                        value={emailAddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                        type="email"
                                        placeholder="Enter your E-mail"
                                        prefix={<AiOutlineMail className="site-form-item-icon" />}
                                        suffix={
                                            <Tooltip title="Extra information">
                                                <AiOutlineInfoCircle style={{ color: 'white' }} />
                                            </Tooltip>
                                        }
                                    />
                                </div>
                                {loading && <ClipLoader color={"#73228B"} />}
                                {successMessage && <div className="success-message">{successMessage}</div>}
                                {error && <ErrorMessage message={error} />}
                                <AuthButton text="SEND" onClick={handleResetPassword} />
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