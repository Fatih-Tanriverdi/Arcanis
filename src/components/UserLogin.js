import React from "react";
import "../cssfield/UserLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useState, useEffect } from "react";



export default function App() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')){
            history.push("/")
        }

    }, [])

    async function login () {
        console.warn(username, password)
        let result = await fetch("lambalog.com/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
    }

    



    return (
        <body className="user-login-body-color">
            <section className="userlogin-container">
                {/** Article Bağlangıç **/}
                <article className="userlogin-card">
                    {/** Card-Left Başlangıç **/}
                    <article className="user-card-left">
                        <img className="user-rocket-img" src="/images/rocket-img.png" />
                    </article>
                    {/** Card-Left Bitiş **/}
                    <div className="userlogin-row">
                        {/** Card-Right Başlangıç **/}
                        <form onSubmit={login} className="user-card-right">
                            <div className="user-login">
                                <h1>USER LOGIN</h1>
                                <p id="description">welcome to the website</p>
                            </div>
                            <div className="input-group-user">
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    prefix={<AiOutlineUser />}
                                    className="user-name"
                                    type="text"
                                    placeholder="Username"
                                />
                                <br />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="forget-password">
                                <div>
                                    <p className="checkbox">
                                        <input type="checkbox" id="myCheckbox" />
                                        <label for="myCheckbox"></label> Remember
                                    </p>
                                </div>
                                <div>
                                    <Link to="/recoverpassword">
                                        <a>Reset Password</a>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/admin" className="user-login-btn">
                                <button onClick={login} type="submit">LOGIN</button>
                            </Link>
                            <Link to="/register" className="user-register-btn">
                                <a>New here? Create an Account</a>
                            </Link>
                        </form>
                        {/** Card-Right Bitiş **/}
                    </div>
                </article>
                {/** Article Bitiş **/}
            </section>
        </body>
    );
}

