import React, { useReducer, useState } from "react";
import "./ResetPassword.css";
import { AiFillBackward, AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import LoginImage from '../../components/LoginImage/LoginImage';
import AuthButton from "../../components/ButtonLogin/AuthButton";
import { Input, Tooltip, Modal, Button } from "antd";
import { ClipLoader } from 'react-spinners';
import { resetPassword } from '../../services/AuthService'
import styles from "../ResetPassword/ModalComponent.module.css";
import { planetReducer, initialState } from "../../reducer/store";

export default function App() {
    const [state, dispatch] = useReducer(planetReducer, initialState);
    const { loading, error } = state;
    const [emailAddress, setEmailAddress] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const errorMessage = "Email address cannot be empty!";

    const handleResetPassword = async () => {
        if (!emailAddress) {
            dispatch({ type: "SET_ERROR", payload: errorMessage });
            return;
        }
        dispatch({ type: "SET_LOADING", loading: true });
        try {
            const data = await resetPassword(emailAddress);
            console.log(data);
            setModalVisible(true);
            setModalContent("Şifre sıfırlama talimatları gönderildi.");
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
            dispatch({ type: "SET_LOADING", loading: false });
        }
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-register"><p>{message}</p></div>;
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
                                <Link to="/">
                                    <AiFillBackward
                                        style={{
                                            color: "#73228B",
                                        }}
                                    />
                                </Link>
                                <div className="user-recover">
                                    <h1>RESET PASSWORD</h1>
                                    <span id="description">Have you forgotten your password ?
                                        <p>Dont't worry, enter the email address you used to create your profile and we'll sen you instructions for generating a new one.</p>
                                    </span>
                                </div>
                                <div>
                                    <Modal
                                        className={styles.modalContainer}
                                        visible={modalVisible}
                                        onCancel={() => setModalVisible(false)}
                                        title="Bildirim"
                                        footer={[
                                            <Link to="/">
                                                <Button style={{ background: "#73228B", borderColor: "white" }}>
                                                    Tamam
                                                </Button>
                                            </Link>
                                        ]}
                                    >
                                        {modalContent}
                                    </Modal>
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