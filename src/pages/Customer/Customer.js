import "./Customer.css";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import About from "../../pages/About/About";
import Planets from '../../pages/Planets/Planets';
import Iletisim from '../../pages/Iletisim/Iletisim';
import { PageButton } from '../../components/PageButton/PageButton';
import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";
import ProductDetails from "../ProductDetails/ProductDetails";
import { checkToken } from '../../services/AuthService';
import { IoExitOutline } from "react-icons/io5";

export default function AsideHeader() {

    const [activeButton, setActiveButton] = useState("");

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <Container id='customer-panel-body'>
            <Row className='customer-container-header'>
                <Col>
                    <section>
                        <article className='header-customer'>
                            <div className='header-position-customer'>
                                <div className="customer-btn">
                                    <PageButton text="Bilet Al" to="ticket" className={`customer-btn-hover ${activeButton === "Bilet Al" ? 'active' : ''}`} onClick={() => handleButtonClick("Bilet Al")} />
                                    <PageButton text="Gezegenler" to="planets" className={`customer-btn-hover ${activeButton === "Gezegenler" ? 'active' : ''}`} onClick={() => handleButtonClick("Gezegenler")} />
                                    <PageButton text="Hakkımızda" to="about" className={`customer-btn-hover ${activeButton === "Hakkımızda" ? 'active' : ''}`} onClick={() => handleButtonClick("Hakkımızda")} />
                                    <PageButton text="İletişim" to="iletisim" className={`customer-btn-hover ${activeButton === "İletişim" ? 'active' : ''}`} onClick={() => handleButtonClick("İletişim")} />
                                </div>
                                <div className="customer-exit">
                                    <div className='customer-info'>
                                        <h1>Fatih</h1>
                                        <span>Admin</span>
                                    </div>
                                    <div>
                                        <img alt='admin' className='customer-img' src='/images/fatihtan.jpg' />
                                    </div>
                                    <Link to="/" className="customer-ext-btn">
                                        <IoExitOutline onClick={handleLogout} alt="Çıkış" style={{ color: "white", fontSize: "30px" }} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div>
                                <container className='customer-page-body' >
                                    <div className='customer-page-container'>
                                        <Routes>
                                            <Route exact path="about" element={<About />} />
                                            <Route exact path="ticket" element={<Ticket />} />
                                            <Route exact path="iletisim" element={<Iletisim />} />
                                            <Route exact path="planets/" element={<Planets />} />
                                            <Route exact path="/planets/:productId" element={<ProductDetails />} />
                                        </Routes>
                                    </div>
                                </container>
                            </div>
                        </article>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}