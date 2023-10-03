import "./Customer.css";
import { Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import About from "../../pages/About/About";
import Planets from '../../pages/Planets/Planets';
import Iletisim from '../../pages/Iletisim/Iletisim';
import { PageButton } from '../../components/PageButton/PageButton';
import { useState } from "react";
import Ticket from "../Ticket/Ticket";
import ProductDetails from "../ProductDetails/ProductDetails";

export default function AsideHeader() {

    const [activeButton, setActiveButton] = useState("");

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    return (
        <Container id='admin-panel-body'>
            <Row className='admin-container-header'>
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
                                <div>
                                    <img alt='admin' className='customer-img' src='/images/fatihtan.jpg' />
                                </div>
                                <div className='customer-info'>
                                    <h1>Fatih Tanrıverdi</h1>
                                    <span>Admin</span>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div>
                                <Routes>
                                    <Route exact path="about" element={<About />} />
                                    <Route exact path="ticket" element={<Ticket />} />
                                    <Route exact path="planets" element={<Planets />} />
                                    <Route exact path="iletisim" element={<Iletisim />} />
                                    <Route path="productdetails" element={<ProductDetails />} />
                                </Routes>
                            </div>
                        </article>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}