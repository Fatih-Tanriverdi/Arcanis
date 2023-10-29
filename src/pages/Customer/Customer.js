import "./Customer.css";
import { Routes, Route } from "react-router-dom";
import About from "../../pages/About/About";
import Planets from '../../pages/Planets/Planets';
import Iletisim from '../Communication/Iletisim';
import { useState } from "react";
import Ticket from "../Ticket/Ticket";
import PlanetDetails from "../PlanetDetails/PlanetDetails";
import AuthModal from "../../components/AuthModal/AuthModal";

export default function AsideHeader() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonModalClick = (buttonText) => {
        if (buttonText === "Üye Girişi") {
            setIsModalOpen(true);
        }
    };
    
    return (
        <container id='customer-panel-body'>
            <article className='headerCustomer'>
                <div className='headerCustomerInfo'>
                    <h1 className="headerTitleStyle">Arcanis</h1>
                    <div className="headerButtonContainer">
                        <a className="headerButtonStyle" onClick={() => handleButtonModalClick("Üye Girişi")}>Üye Girişi</a>
                        <a className="headerButtonStyle borderRL">Hakkımızda</a>
                        <a className="headerButtonStyle">İletişim</a>
                    </div>
                </div>
            </article>
            <article>
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
            </article>
            {isModalOpen && <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} pageAuthType={"authLogin"} />}
        </container>
    )
}