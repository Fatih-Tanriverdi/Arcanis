import React from 'react';
import "./AsideHeader.css";
import { Routes, Route } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { Container, Row, Col } from 'react-grid-system';
import UsersList from '../../pages/userlist-page/UsersList';
import MainPage from "../../pages/main/MainPage";
import SpaceShips from '../../pages/rockets/SpaceShips';
import Orders from '../../pages/orders/Orders';
import { PageButton } from '../pageButton/PageButton';

export default function AsideHeader () {

    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };

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
                        <PageButton to={"mainpage"} className='icon-style' icon={<AiOutlineHome />} text="Anasayfa" />
                        <PageButton to="spaceships" className='icon-style' icon={<AiOutlineRocket />} text="Uzay Araçları" />
                        <PageButton to="userlist" className='icon-style' icon={<AiOutlineUser />} text="Kullanıcılar" />
                        <PageButton to="orders" icon={<BsClipboardCheck />} text="Siparişler" className='icon-style' />
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
                                    <h1>Fatih Tanrıverdi</h1>
                                    <span>Admin</span>
                                </div>
                                <div className='header-img'>
                                    <img alt='admin' className='admin-img' src='/images/fatihtan.jpg' />
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