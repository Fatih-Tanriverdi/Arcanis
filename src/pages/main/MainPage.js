import React, { useEffect } from 'react'
import "./MainPage.css";
import { checkToken } from '../../services/AuthService';

export default function MainPage() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <container className='main-page-container' >
            <div className='main-page-body'>
                <div className='main-page-content'>
                    <h1>Anasayfa</h1>
                </div>
            </div>
        </container>
    )
}
