import React from 'react'
import { Link } from "react-router-dom";
import "./AuthButton.css";

export default function AuthButton(props) {

    return (
        <div>
            <Link to={props.to} className="auth-btn">
                <button onClick={props.onClick} type="submit">{props.text}</button>
            </Link>
        </div>
    )
}

