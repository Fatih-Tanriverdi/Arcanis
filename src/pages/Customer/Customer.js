import "./Customer.css";
import { Routes, Route, Link } from "react-router-dom";
import { Row, Col } from 'react-grid-system';
import About from "../../pages/About/About";
import Planets from '../../pages/Planets/Planets';
import Iletisim from '../ Communication/Iletisim';
import { PageButton } from '../../components/PageButton/PageButton';
import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";
import { checkToken } from '../../services/AuthService';
import { IoExitOutline } from "react-icons/io5";
import { fetchUser } from '../../services/UserService';
import PlanetDetails from "../PlanetDetails/PlanetDetails";

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
        async function getUsers() {
            const data = await fetchUser()
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setUserInfo(data);
        }
        getUsers();
    }, []);

    return (
        <container id='customer-panel-body'>
            <Row className='customer-container-header'>
                <Col>
                    <section>
                        <article className='header-customer'>
                            <div className='header-position-customer'>
                                <div className="customer-btn">
                                    <PageButton id="customer-btn-position" text="Bilet Al" to="ticket" className={`customer-btn-hover ${activeButton === "Bilet Al" ? 'active' : ''}`} onClick={() => handleButtonClick("Bilet Al")} />
                                    <PageButton id="customer-btn-position" text="Gezegenler" to="planets" className={`customer-btn-hover ${activeButton === "Gezegenler" ? 'active' : ''}`} onClick={() => handleButtonClick("Gezegenler")} />
                                    <PageButton id="customer-btn-position" text="Hakkımızda" to="about" className={`customer-btn-hover ${activeButton === "Hakkımızda" ? 'active' : ''}`} onClick={() => handleButtonClick("Hakkımızda")} />
                                    <PageButton id="customer-btn-position" text="İletişim" to="iletisim" className={`customer-btn-hover ${activeButton === "İletişim" ? 'active' : ''}`} onClick={() => handleButtonClick("İletişim")} />
                                </div>
                                <div className="customer-exit">
                                    <div className='customer-info'>
                                        <h1>{userInfo.name} {userInfo.surname}</h1>
                                    </div>
                                    <div>
                                        <img alt='admin' className='customer-img' src='/images/CustomerPP.png' />
                                    </div>
                                    <Link to="/" className="customer-ext-btn">
                                        <IoExitOutline onClick={handleLogout} alt="Çıkış" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div>
                                <container className='customer-page-body' >
                                    <div className='customer-page-container'>
                                        <Routes>
                                            <Route path="/*" element={<Ticket />} />
                                            <Route path="about" element={<About />} />
                                            <Route path="ticket" element={<Ticket />} />
                                            <Route path="iletisim" element={<Iletisim />} />
                                            <Route path="planets" element={<Planets />} />
                                            <Route path="/planet/:id" element={<PlanetDetails />} />
                                        </Routes>
                                    </div>
                                </container>
                            </div>
                        </article>
                    </section>
                </Col>
            </Row>
        </container>
    )
}