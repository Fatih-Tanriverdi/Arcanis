import React, { useEffect, useState } from 'react';
import "./AdminPanel.css";
import { Routes, Route } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BiExit, BiPlanet } from "react-icons/bi";
import UsersList from '../../pages/Users/UsersList';
import MainPage from "../../pages/Main/MainPage";
import SpaceShips from '../../pages/Products/SpaceShips';
import Orders from '../../pages/Orders/Orders';
import Expedition from "../../pages/Expedition/Expedition";
import { PageButton } from '../../components/PageButton/PageButton';
import { checkToken } from '../../services/AuthService';
import { fetchUsersDataGet } from '../../services/UserService';

export default function AsideHeader() {
    const [activeButton, setActiveButton] = useState("");
    const [userInfo, setUserInfo] = useState({});

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function getUser() {
            const url = "http://lambalog.com/api/users/info";
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUserInfo(data);
        }
        getUser();
    }, []);

    return (
        <container id='admin-panel-body'>
            <div className='admin-panel-all'>
                <div className='aside'>
                    <div>
                        <div className='renta-rocket'>
                            <img alt="logo" className='admin-rocket-img' src='/images/rocket-img.png' />
                            <h1>Renta Rocket</h1>
                        </div>
                    </div>
                    <PageButton to={"mainpage"} className="admin-panel-button" id={`icon-style ${activeButton === "Anasayfa" ? 'active' : ''}`} icon={<AiOutlineHome />} onClick={() => handleButtonClick("Anasayfa")} text="Anasayfa" />
                    <PageButton to="userlist" className="admin-panel-button" id={`icon-style ${activeButton === "Kullanıcılar" ? 'active' : ''}`} icon={<AiOutlineUser />} onClick={() => handleButtonClick("Kullanıcılar")} text="Kullanıcılar" />
                    <PageButton to="spaceships" className="admin-panel-button" id={`icon-style ${activeButton === "Uzay Araçları" ? 'active' : ''}`} icon={<AiOutlineRocket />} onClick={() => handleButtonClick("Uzay Araçları")} text="Uzay Araçları" />
                    <PageButton to="orders" className="admin-panel-button" icon={<BiPlanet />} onClick={() => handleButtonClick("Gezegenler")} text="Gezegenler" id={`icon-style ${activeButton === "Gezegenler" ? 'active' : ''}`} />
                    <PageButton to="expedition" className="admin-panel-button" icon={<BiPlanet />} onClick={() => handleButtonClick("Seferler")} text="Seferler" id={`icon-style ${activeButton === "Seferler" ? 'active' : ''}`} />
                    <PageButton to="/" className="admin-panel-button-exit" icon={<BiExit />} onClick={handleLogout} text="Çıkış" id='icon-style adminpanel-exit-btn-position' />
                </div>
                <article className='header'>
                    <div className='header-position'>
                        <div>
                            <div className="admin-buttons">
                                <PageButton to={"mainpage"} className="admin-panel-button" id={`icon-style ${activeButton === "Anasayfa" ? 'active' : ''}`} icon={<AiOutlineHome />} onClick={() => handleButtonClick("Anasayfa")} text="Anasayfa" />
                                <PageButton to="userlist" className="admin-panel-button" id={`icon-style ${activeButton === "Kullanıcılar" ? 'active' : ''}`} icon={<AiOutlineUser />} onClick={() => handleButtonClick("Kullanıcılar")} text="Kullanıcılar" />
                                <PageButton to="spaceships" className="admin-panel-button" id={`icon-style ${activeButton === "Uzay Araçları" ? 'active' : ''}`} icon={<AiOutlineRocket />} onClick={() => handleButtonClick("Uzay Araçları")} text="Uzay Araçları" />
                                <PageButton to="orders" className="admin-panel-button" icon={<BiPlanet />} onClick={() => handleButtonClick("Gezegenler")} text="Siparişler" id={`icon-style ${activeButton === "Siparişler" ? 'active' : ''}`} />
                                <PageButton to="expedition" className="admin-panel-button" icon={<BiPlanet />} onClick={() => handleButtonClick("Seferler")} text="Seferler" id={`icon-style ${activeButton === "Seferler" ? 'active' : ''}`} />
                                <PageButton to="/" className="admin-panel-button-exit" icon={<BiExit />} onClick={handleLogout} text="Çıkış" id='icon-style adminpanel-exit-btn-position' />
                            </div>
                            <div className='admin-info'>
                                <h1>{userInfo.name} {userInfo.surname}</h1>
                                <span>Admin</span>
                            </div>
                            <div className='header-img'>
                                <img alt='admin' className='admin-img' src='/images/AdminPP.avif' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/*" element={<MainPage />} />
                            <Route exact path="mainpage" element={<MainPage />} />
                            <Route exact path="userlist" element={<UsersList />} />
                            <Route exact path="spaceships" element={<SpaceShips />} />
                            <Route exact path="orders" element={<Orders />} />
                            <Route path="expedition" element={<Expedition />} />
                        </Routes>
                    </div>
                </article>
            </div>
        </container>
    )
}