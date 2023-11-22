import React from 'react';
import './PageButton.css';
import { Link } from 'react-router-dom';

export function PageButton(props) {

    return (
        <div className='navigate'>
            <ul>
                <li>
                    <Link type='link' to={props.to} className={props.className} id={props.id} size="large" onClick={props.onClick}>
                        <div className="button-container">
                            <span className="button-icon">{props.icon}</span>
                            <span className="button-text">{props.text}</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
