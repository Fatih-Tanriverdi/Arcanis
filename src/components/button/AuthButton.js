import React from 'react'
import { Link } from "react-router-dom";
import "../button/AuthButton.css";

export default function AuthButton(props) {

    return (
        <div>
            <Link to="/admin" className="auth-btn">
                <button onClick={props.onClick} type="submit">{props.text}</button>
            </Link>
        </div>
    )
}

