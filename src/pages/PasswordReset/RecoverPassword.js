import React, { useState } from "react";
import "../PasswordReset/RecoverPassword.css";
import { AiFillBackward, AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import LoginImage from '../../components/LoginImage/LoginImage';
import AuthButton from "../../components/ButtonLogin/AuthButton";
import { Input, Tooltip, Modal, Button } from "antd";
import styles from "../PasswordReset/ModalComponent.module.css";

export default function App() {

    const [emailAddress, setEmailAddress] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const resetPassword = async () => {
        try {
            const response = await fetch(`http://lambalog.com/api/users/forgot-password?mailAddress=${emailAddress}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            if (response.status !== 200) {
                const data = await response.json();
                console.error(data);
                throw new Error(data.error || "Email Adresi Gönderilemedi.");
            }
            setModalContent("Şifre sıfırlama e-postası başarıyla gönderildi. Lütfen e-postanızı kontrol edin.");
            setModalVisible(true);
        } catch (error) {
            setModalContent(error.message);
            setModalVisible(true);
        }
    }

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
                            <Link to="/">
                                <AiFillBackward
                                    style={{
                                        color: "#73228B",
                                        fontSize: "50px",
                                        position: "absolute",
                                        right: "560px",
                                        bottom: "680px",
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
                                            <Button style={{background: "#73228B", borderColor: "white"}}>
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
                            <AuthButton text="SEND" onClick={resetPassword} />
                        </article>
                        {/** Card-Right Bitiş **/}
                    </div>
                </article>
                {/** Article Bitiş **/}
            </section>
        </section>
    );
} 