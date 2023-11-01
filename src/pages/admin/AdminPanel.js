import React, { useEffect, useState } from 'react';
import "./AdminPanel.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BiExit, BiPlanet, BiMenu } from "react-icons/bi";
import { BsFillArrowRightSquareFill, BsTicketPerforated } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import UsersList from '../../pages/Users/UsersList';
import MainPage from "../../pages/Main/MainPage";
import SpaceShips from '../../pages/SpaceShips/SpaceShips';
import PlanetsAdmin from '../../pages/PlanetsAdmin/PlanetsAdmin';
import Expedition from "../../pages/Expedition/Expedition";
import { PageButton } from '../../components/PageButton/PageButton';
import { checkToken } from '../../services/AuthService';
import { fetchUsersDataGet } from '../../services/UserService';
import TicketAdmin from '../TicketAdmin/TicketAdmin';
import APImanager from '../../apiManager';

export default function AsideHeader() {
    const [activeButton, setActiveButton] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const baseUrl = APImanager.getBaseURL();

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
        localStorage.setItem("activeButton", buttonText);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function getUser() {
            const url = `${baseUrl}/users/info`;
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUserInfo(data);
        }
        getUser();
    }, []);

    useEffect(() => {
        const savedActiveButton = localStorage.getItem("activeButton");
        if (savedActiveButton) {
            setActiveButton(savedActiveButton);
        }
    }, []);

    useEffect(() => {
        const isFirstLogin = localStorage.getItem("isActive") !== "true";
        const savedActiveButton = localStorage.getItem("activeButton");

        if (isFirstLogin) {
            setActiveButton(savedActiveButton);
            localStorage.setItem("activeButton", "Anasayfa");
            localStorage.setItem("isFirstLogin", "true");
        } else {
            const savedActiveButton = localStorage.getItem("activeButton");
            if (savedActiveButton) {
                setActiveButton(savedActiveButton);
            }
        }
    }, []);

    return (
        <container id='admin-panel-body'>
            <div className='admin-panel-all'>
                <div className='aside'>
                    <div className='renta-rocket'>
                        <img alt="logo" className='admin-rocket-img' src='/images/rocket-img.png' />
                        <h1>Renta Rocket</h1>
                    </div>
                    <div className='admin-btn-container'>
                        <div className='admin-btn-position'>
                            <PageButton to="mainpage" className={`admin-panel-button ${activeButton === "Anasayfa" ? 'active' : ''}`} icon={<AiOutlineHome />} onClick={() => handleButtonClick("Anasayfa")} text="Anasayfa" />
                            <PageButton to="userlist" className={`admin-panel-button ${activeButton === "Kullanıcılar" ? 'active' : ''}`} icon={<AiOutlineUser />} onClick={() => handleButtonClick("Kullanıcılar")} text="Kullanıcılar" />
                            <PageButton to="spaceships" className={`admin-panel-button ${activeButton === "Uzay Araçları" ? 'active' : ''}`} icon={<AiOutlineRocket />} onClick={() => handleButtonClick("Uzay Araçları")} text="Uzay Araçları" />
                            <PageButton to="planetsadmin" icon={<BiPlanet />} onClick={() => handleButtonClick("Gezegenler")} text="Gezegenler" className={`admin-panel-button ${activeButton === "Gezegenler" ? 'active' : ''}`} />
                            <PageButton to="expedition" icon={<GiPathDistance />} onClick={() => handleButtonClick("Seferler")} text="Seferler" className={`admin-panel-button ${activeButton === "Seferler" ? 'active' : ''}`} />
                            <PageButton to="ticketadmin" icon={<BsTicketPerforated />} onClick={() => handleButtonClick("Ticket")} text="Biletler" className={`admin-panel-button ${activeButton === "Ticket" ? 'active' : ''}`} />
                        </div>
                        <div className='admin-btn-exit-container'>
                            <PageButton to="/" className="admin-panel-button-exit" icon={<BiExit />} onClick={handleLogout} text="Çıkış" id='icon-style adminpanel-exit-btn-position' />
                        </div>
                    </div>
                </div>
                <article className='header'>
                    <div className='header-position'>
                        <div className='customer-btn'>
                            <Link className='bilgi-button' to={"/"} alt={"Customer Page"}><BsFillArrowRightSquareFill /></Link>
                            <p className='bilgi'>Müşteri Sayfası</p>
                        </div>
                        <div className='admin-info-response-header'>
                            <div className="admin-buttons">
                                <div class="admin-menu">
                                    <button class="admin-menu-button" id="admin-dropdown-button"><BiMenu /></button>
                                    <div class="admin-dropdown-content" id="admin-dropdown-content">
                                        <Link to="mainpage">Anasayfa</Link>
                                        <Link to="userlist">Kullanıcılar</Link>
                                        <Link to="spaceships">Uzay Araçları</Link>
                                        <Link to="planetsadmin">Gezegenler</Link>
                                        <Link to="expedition">Seferler</Link>
                                        <Link to="ticketadmin">Biletler</Link>
                                        <Link to="/">Müşteri Sayfası</Link>
                                        <Link to="/" onClick={handleLogout} >Çıkış</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='admin-info-response'>
                                <div className='admin-info'>
                                    <h1>{userInfo.name} {userInfo.surname}</h1>
                                    <span>Admin</span>
                                </div>
                                <div className='header-img'>
                                    <img alt='admin' className='admin-img' src='/images/AdminPP.avif' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/*" element={<MainPage />} />
                            <Route exact path="mainpage" element={<MainPage />} />
                            <Route exact path="userlist" element={<UsersList />} />
                            <Route exact path="spaceships" element={<SpaceShips />} />
                            <Route exact path="planetsadmin" element={<PlanetsAdmin />} />
                            <Route path="expedition" element={<Expedition />} />
                            <Route path="ticketadmin" element={<TicketAdmin />} />
                        </Routes>
                    </div>
                </article>
            </div>
        </container>
    )
}