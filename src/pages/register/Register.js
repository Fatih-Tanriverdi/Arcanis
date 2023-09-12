import React, { useState } from "react";
import "../register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from 'antd';

export default function App() {
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        isActive: true,
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://lambalog.com/api/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        console.log(response);

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Kullanıcı kaydı yapılamadı.");
            return;
        } else {
            navigate("/");
            console.log("Kullanıcı Kaydı Başarılı.");
        }
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message"><p>{message}</p></div>;
    };

    return (
        <section className="register-body-color">
            <section className="register-container">
                {/* Article Bağlangıç */}
                <article className="register-card">
                    {/* Card-Left Başlangıç */}
                    <article className="register-card-left">
                        <img className="register-rocket-img" src="/images/rocket-img.png" alt="Rocket" />
                    </article>
                    {/* Card-Left Bitiş */}
                    <div className="register-row">
                        {/* Card-Right Başlangıç */}
                        <article className="register-card-right">
                            <div className="user-register">
                                <h1>REGISTER</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <form className="input-group-register">
                                <Input
                                    className="ınputRegister"
                                    name="emailAddress"
                                    value={values.emailAddress}
                                    onChange={handleInput}
                                    type="email"
                                    placeholder="Enter your E-mail"
                                    prefix={<AiOutlineMail className="site-form-item-icon" />}
                                />
                                <br />
                                <Input
                                    name="username"
                                    className="ınputRegister"
                                    value={values.username}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Username"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                />
                                <br />
                                <Input.Password
                                    className="ınputRegisterPassword"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInput}
                                    type="password"
                                    placeholder="Enter your Password"
                                    prefix={<RiLockPasswordLine style={{marginLeft: "13px"}}/>}
                                    style={{
                                        marginBottom: "20px"
                                    }}
                                />
                                <Input
                                    className="ınputRegister"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Name"
                                    prefix={<AiOutlineUser className="site-form-item-icon" />}
                                />
                                <br />
                                <Input
                                    className="ınputRegister"
                                    name="surname"
                                    value={values.surname}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Last Name"
                                    prefix={<AiOutlineUser />}
                                />
                                <br />
                                <Input
                                    className="ınputRegister"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter your Phone Number"
                                    prefix={<AiOutlinePhone className="site-form-item-icon" />}
                                />
                                <Link to="/" className="acconut-register">
                                    Do you already have an account?
                                </Link>
                            </form>
                            {error && <ErrorMessage message={error} />}
                            <div className="register-btn">
                                <button type="submit" onClick={handleSubmit}>REGISTER</button>
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
