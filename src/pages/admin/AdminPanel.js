import React from 'react';
import "./AdminPanel.css";
import AsideHeader from '../../components/adminPanel/AsideHeader';
import { useEffect } from "react";
import { checkToken } from '../../services/authService';

export default function () {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <>
            <AsideHeader />
        </>
    )
}

