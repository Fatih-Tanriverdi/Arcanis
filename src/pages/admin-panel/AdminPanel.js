import React from 'react';
import "./AdminPanel.css";
import AsideHeader from '../../components/admin-panel/AsideHeader';
import { useState, useEffect, useContext } from "react";
import { checkToken } from '../../services/auth-guard.js';

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

