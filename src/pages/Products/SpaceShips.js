import React, { useEffect } from 'react'
import "../Products/SpaceShips.css";
import { checkToken } from '../../services/AuthService';

export default function SpaceShips() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <container className='space-vehicle-container'>
            <article className='space-vehicle-body'>
                <div className='product-list'>
                    <h1 id='space-vehicle-title'>Space Ships</h1>
                </div>
            </article>
        </container>
    )
}

