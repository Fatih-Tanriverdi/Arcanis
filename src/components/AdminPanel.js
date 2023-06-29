import React from 'react';
import "../cssfield/AdminPanel.css";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import UsersList from './UsersList';
import UzayAracları from './UzayAracları';


export default function
    () {
    return (
        <body>
            <section id='admin-panel-body'>
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
                            <UsersList />
                    </article>
                    <article>
                        <div>
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
                                        <Link>
                                            <div className='icon-style'>
                                                <AiOutlineHome style={{ marginRight: 10 }} />
                                                <p><a href='/' />Anasayfa</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <div className='icon-style'>
                                                <AiOutlineRocket style={{ marginRight: 10 }} />
                                                <p><a href='/' />Uzay Araçları</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <div className='icon-style'>
                                                <AiOutlineUser style={{ marginRight: 10 }} />
                                                <p><a href='/' />Kullanıcılar</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link>
                                            <div className='icon-style'>
                                                <BsClipboardCheck style={{ marginRight: 10 }} />
                                                <p><a href='/' />Siparişler</p>
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

