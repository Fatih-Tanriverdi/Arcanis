import React from 'react';
import "./AdminPanel.css";
import AsideHeader from '../../components/admin-panel/AsideHeader';
import { checkToken } from '../../services/auth-service.js';
import { useState, useEffect, useContext } from "react";

export default function () {

            checkToken();

    return (
        <>
            <AsideHeader />
        </>
    )
}

