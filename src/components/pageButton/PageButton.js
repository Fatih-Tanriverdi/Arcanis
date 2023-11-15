import React from 'react';
import './PageButton.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export function PageButton(props) {

    return (
        <div className='navigate'>
            <ul>
                <li>
                    <Link type='link' to={props.to} className={props.className} id={props.id} icon={props.icon} size="large" onClick={props.onClick}>
                        {props.text}
                    </Link>
                </li>
            </ul>
        </div>
    )
}
