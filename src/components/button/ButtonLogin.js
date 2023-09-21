import React from 'react'
import { Link } from "react-router-dom";
import "../button/ButtonLogin.css";

export default function ButtonLogin() {

    return (
        <div>
            <Link to="/admin" className="auth-btn">
                <button type="submit">LOGIN</button>
            </Link>
        </div>
    )
}

