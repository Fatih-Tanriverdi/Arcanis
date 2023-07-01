import React from 'react';
import "../cssfield/AdminPanel.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import UsersList from './UsersList';
import UzayAracları from './SpaceShips';
import Anasayfa from './SpaceShips';
import AdminPanel from './AdminPanel';
import MainPage from './MainPage';
import SpaceShips from './SpaceShips';
import Orders from './Orders';


export default function () {
    return (
        <body id='admin-panel-body'>
            <section>
                <container className="col-8">
                    <navbar>
                        <div className='header'>
                            <div className='admin-info'>
                                <h1>Fatih Tanrıverdi</h1>
                                <p>Admin</p>
                            </div>
                            <img className='admin-img' src='/images/fatihtan.jpg' />
                        </div>
                    </navbar>
                    <article>
                        <div>
                            <Routes>
                                <Route exact path="mainpage" Component={MainPage} />
                                <Route exact path="userlist" Component={UsersList} />
                                <Route exact path="spaceships" Component={SpaceShips} />
                                <Route exact path="orders" Component={Orders} />
                            </Routes>
                        </div>
                    </article>
                </container>
                <aside className='col-4'>
                    <div className='aside'>
                        <row>
                            <div className='renta-rocket'>
                                <img className='admin-rocket-img' src='/images/rocket-img.png' />
                                <h1>Renta Rocket</h1>
                            </div>
                            <div className='navigate'>
                                <ul>
                                    <li id='navigate-style'>
                                        <Link to={"mainpage"}>
                                            <div className='icon-style'>
                                                <AiOutlineHome style={{ marginRight: 10 }} />
                                                <p><a />Anasayfa</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="spaceships">
                                            <div className='icon-style'>
                                                <AiOutlineRocket style={{ marginRight: 10 }} />
                                                <p><a />Uzay Araçları</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="userlist">
                                            <div className='icon-style'>
                                                <AiOutlineUser style={{ marginRight: 10 }} />
                                                <p><a />Kullanıcılar</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="orders">
                                            <div className='icon-style'>
                                                <BsClipboardCheck style={{ marginRight: 10 }} />
                                                <p><a />Siparişler</p>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </row>
                    </div>
                </aside>
                <footer>
                </footer>
            </section>
        </body>
    )
}

