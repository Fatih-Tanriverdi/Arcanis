import "./Customer.css";
import { Routes, Route, Link } from "react-router-dom";
import About from "../About/About";
import Planets from '../Planets/Planets';
import Iletisim from '../Communication/Iletisim';
import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";
import PlanetDetails from "../PlanetDetails/PlanetDetails";
import AuthModal from "../../components/AuthModal/AuthModal";
import PasswordResetScreen from "../PasswordResetScreen/PasswordResetScreen";
import NotFoundPage from "../NotFound/NotFound";
import BuyTicket from "../BuyTicket/BuyTicket";
import MyTicket from "../my-ticket/my-ticket";
import { BiMenu } from "react-icons/bi";

export default function AsideHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access-token'));
    const [isMobile, setIsMobile] = useState(false);

    const handleButtonModalClick = (buttonText) => {
        if (buttonText === 'Üye Girişi') {
            setIsModalOpen(true);
        } else if (buttonText === 'Çıkış Yap') {
            localStorage.removeItem('access-token');
            setAccessToken(null);
        }
    };

    useEffect(() => {
        setAccessToken(localStorage.getItem('access-token'));
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id='customerPageContainer'>
            <article className="headerCustomer">
                <div className="headerCustomerInfo">
                    <Link to="/">
                        <h1 className="headerTitleStyle">Arcanis</h1>
                    </Link>
                    {isMobile ? (
                        <div className="dropdown">
                            <button className="dropbtn"><BiMenu /></button>
                            <div className="dropdown-content">
                                {accessToken ? (
                                    <>
                                        <Link to="/myticket">Biletlerim</Link>
                                        <Link to="/" className="headerButtonStyle" onClick={() => handleButtonModalClick('Çıkış Yap')}>
                                            Çıkış Yap
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <a className="headerButtonStyle" onClick={() => handleButtonModalClick('Üye Girişi')}>
                                            Üye Girişi
                                        </a>
                                    </>
                                )}
                                <Link to="/about">Hakkımızda</Link>
                                <Link to="/communication">İletişim</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="headerButtonContainer">
                            {accessToken ? (
                                <>
                                    <Link
                                        to="/"
                                        className="headerButtonStyle"
                                        onClick={() => handleButtonModalClick('Çıkış Yap')}
                                    >
                                        Çıkış Yap
                                    </Link>
                                    <Link to="/myticket" className="headerButtonStyle borderRL">
                                        Biletlerim
                                    </Link>
                                </>
                            ) : (
                                <a className="headerButtonStyle" onClick={() => handleButtonModalClick('Üye Girişi')}>
                                    Üye Girişi
                                </a>
                            )}
                            <Link to="/about" className="headerButtonStyle borderRL">
                                Hakkımızda
                            </Link>
                            <Link to="/communication" className="headerButtonStyle">
                                İletişim
                            </Link>
                        </div>
                    )}
                </div>
            </article>
            <article>
                <div className='customerPageBody' >
                    <Routes>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/" element={<Ticket />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/communication" element={<Iletisim />} />
                        <Route path="/myticket" element={<MyTicket />} />
                        <Route path="/reset-password/:recoveryCode" element={<PasswordResetScreen />} />
                        <Route path="/planets" element={<Planets />} />
                        <Route path="buyticket" element={<BuyTicket />} />
                        <Route path="/planet/:id" element={<PlanetDetails />} />
                    </Routes>
                </div>
            </article>
            {isModalOpen && <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setAccessToken={setAccessToken} pageAuthType={"authLogin"} />}
        </div>
    )
}
