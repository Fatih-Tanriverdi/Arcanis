import React from "react";
import "../reset-password/RecoverPassword.css";
import { AiFillBackward, AiOutlineMail, AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Input, Tooltip } from 'antd';


export default function App() {
    return (
        <section className="recover-body-color">
            <section className="recover-container">
                {/** Article Bağlangıç **/}
                <article className="recover-card">
                    {/** Card-Left Başlangıç **/}
                    <article className="card-left-recover">
                        <img className="recover-rocket-img" src="/images/rocket-img.png" />
                    </article>
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
                            <div className="input-group-recover">
                                <Input
                                    placeholder="Enter your E-mail"
                                    prefix={<AiOutlineMail className="site-form-item-icon" />}
                                    suffix={
                                        <Tooltip title="Extra information">
                                            <AiOutlineInfoCircle style={{ color: 'white' }} />
                                        </Tooltip>
                                    }
                                />
                            </div>
                            <div className="send-btn">
                                <button>SEND</button>
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