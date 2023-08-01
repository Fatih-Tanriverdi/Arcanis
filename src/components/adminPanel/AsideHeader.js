import React from 'react';
import "./AsideHeader.css";
import { Routes, Route } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import UsersList from '../../pages/userlist-page/UsersList';
import MainPage from "../../pages/main/MainPage";
import SpaceShips from '../../pages/rockets/SpaceShips';
import Orders from '../../pages/orders/Orders';




export default function () {


    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };


    return (
        <Container id='admin-panel-body'>
            <Row className='admin-container-aside'>
                <Col sm={12} className='admin-col-4'>
                    <div className='aside'>
                        <div>
                            <div className='renta-rocket'>
                                <img className='admin-rocket-img' src='/images/rocket-img.png' />
                                <h1>Renta Rocket</h1>
                            </div>
                            <div className='navigate'>
                                <ul>
                                    <li id='navigate-style'>
                                        <Link to={"mainpage"}>
                                            <div id='icon-home-position-sm' className='icon-style'>
                                                <AiOutlineHome />
                                                <p>Anasayfa</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="spaceships">
                                            <div id='icon-home-position-sm' className='icon-style'>
                                                <AiOutlineRocket />
                                                <p>Uzay Araçları</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="userlist">
                                            <div id='icon-home-position-sm' className='icon-style'>
                                                <AiOutlineUser
                                                    style={{
                                                        fontSize: '30px',
                                                    }} />
                                                <p>Kullanıcılar</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="orders">
                                            <div id='icon-home-position-sm' className='icon-style'>
                                                <BsClipboardCheck />
                                                <p>Siparişler</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <div  id='icon-home-position-sm exit-btn' className='icon-style adminpanel-exit-btn-position'>
                                                <BiExit />
                                                <p onClick={handleLogout}>Çıkış</p>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <footer>
                    </footer>
                </Col>
            </Row>
            <Row className='admin-container-header'>
                <Col sm={12} className='admin-col-8'>
                    <section className="col-8">
                        <article className='navbar'>
                            <div className='header'>
                                <div className='header-position'>
                                    <div className='admin-info'>
                                        <h1>Fatih Tanrıverdi</h1>
                                        <span>Admin</span>
                                    </div>
                                    <div className='header-img'>
                                        <img className='admin-img' src='/images/fatihtan.jpg' />
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div>
                                <Routes>
                                    <Route exact path="mainpage" element={<MainPage />} />
                                    <Route exact path="userlist" Component={UsersList} />
                                    <Route exact path="spaceships" Component={SpaceShips} />
                                    <Route exact path="orders" Component={Orders} />
                                </Routes>
                            </div>
                        </article>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

