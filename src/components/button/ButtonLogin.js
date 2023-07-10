import React from 'react'
import { Link } from "react-router-dom";
import "../button/ButtonLogin.css";

export default function () {
    return (
        <div>
            <Link to="/admin" className="user-login-btn">
                <button type="submit">LOGIN</button>
            </Link>
        </div>
    )
}

