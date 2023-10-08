import React, { useEffect, useState } from 'react';
import "./AdminPanel.css";
import { Routes, Route } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { Container, Row, Col } from 'react-grid-system';
import UsersList from '../../pages/Users/UsersList';
import MainPage from "../../pages/Main/MainPage";
import SpaceShips from '../../pages/Products/SpaceShips';
import Orders from '../../pages/Orders/Orders';
import { PageButton } from '../../components/PageButton/PageButton';
import { checkToken } from '../../services/AuthService';
import { fetchUser } from '../../services/UserService';

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
            const data = await fetchUser()
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUserInfo(data);
        }
        getUser();
    }, []);

    return (
        <Container id='admin-panel-body'>
            <Row className='admin-container-aside'>
                <Col sm={12} md={4} lg={4} className='admin-col-4'>
                    <div className='aside'>
                        <div>
                            <div className='renta-rocket'>
                                <img alt="logo" className='admin-rocket-img' src='/images/rocket-img.png' />
                                <h1>Renta Rocket</h1>
                            </div>
                        </div>
                        <PageButton to={"mainpage"} className={`icon-style ${activeButton === "Anasayfa" ? 'active' : ''}`} icon={<AiOutlineHome />} onClick={() => handleButtonClick("Anasayfa")} text="Anasayfa" />
                        <PageButton to="spaceships" className={`icon-style ${activeButton === "Uzay Araçları" ? 'active' : ''}`} icon={<AiOutlineRocket />} onClick={() => handleButtonClick("Uzay Araçları")} text="Uzay Araçları" />
                        <PageButton to="userlist" className={`icon-style ${activeButton === "Kullanıcılar" ? 'active' : ''}`} icon={<AiOutlineUser />} onClick={() => handleButtonClick("Kullanıcılar")} text="Kullanıcılar" />
                        <PageButton to="orders" icon={<BsClipboardCheck />} onClick={() => handleButtonClick("Siparişler")} text="Siparişler" className={`icon-style ${activeButton === "Siparişler" ? 'active' : ''}`} />
                        <PageButton to="/" icon={<BiExit />} onClick={handleLogout} text="Çıkış" className='icon-style adminpanel-exit-btn-position' />
                    </div>
                </Col>
            </Row>
            <Row className='admin-container-header'>
                <Col sm={12} md={8} lg={8} className='admin-col-8'>
                    <section>
                        <article className='header'>
                            <div className='header-position'>
                                <div className='admin-info'>
                                    <h1>{userInfo.name} {userInfo.surname}</h1>
                                    <span>Admin</span>
                                </div>
                                <div className='header-img'>
                                    <img alt='admin' className='admin-img' src='/images/AdminPP.avif' />
                                </div>
                            </div>
                        </article>
                        <article>
                            <div>
                                <Routes>
                                    <Route exact path="mainpage" element={<MainPage />} />
                                    <Route exact path="userlist" element={<UsersList />} />
                                    <Route exact path="spaceships" element={<SpaceShips />} />
                                    <Route exact path="orders" element={<Orders />} />
                                </Routes>
                            </div>
                        </article>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}