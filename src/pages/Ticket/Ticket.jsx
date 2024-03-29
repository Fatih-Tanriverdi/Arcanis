import "./Ticket.css";
import { Select, Space, DatePicker, message } from "antd";
import { Link } from "react-router-dom";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";
import Config from "../../config-file.json";
import moment from "moment";
import buildQuery from "odata-query";
import BuyTicket from "../buy-ticket/BuyTicket";
import { displayDate } from "../../helpers/utils";
import {
    BsFillRocketTakeoffFill,
} from "react-icons/bs";
import {
    BsCreditCard2Back,
    BsCashCoin,
    BsPeople,
    BsStopwatchFill,
    BsCoin,
    BsGeoAlt,
    BsFillClockFill,
    BsFillLockFill,
} from "react-icons/bs";
import { getData } from "../../services/BaseApiOperations";

export default function Ticket() {
    const [planetData, setPlanetData] = useState([]);
    const [departureDate, setDepartureDate] = useState(null);
    const [firstDateFilter, setFirstDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [ticketSalesFilter, setTicketSalesFilter] = useState([]);
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState();
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [expandingBox, setExpandingBox] = useState(null);

    const handleBoxExpand = (index) => {
        if (index === expandingBox) {
            setExpandingBox(null);
        } else {
            setExpandingBox(index);
        }
    };

    const initialData = [
        { title: "Arcanis'de hangi roketler bulunuyor?", content: "Arcanis'de SpaceX, Blue Origin, Virgin Galaactic gibi Evrenin dört bir yanına seferler düzenleyen yüzlerce Uzay Seyahati firmasına ulaşabilirsiniz." },
        { title: "Arcanis'de biletini nasıl satın alabilirim?", content: "Arcanis'den Roket bileti satın almak için web sitemizi veya mobil uygulamalarımızı kullanabilirsiniz. Seyahat etmek istediğiniz yeri ve tarihi girdikten sonra tüm seferleri karşılaştırabilir, size uygun sefer için yolcu ve kart bilgilerinizi girerek biletinizi satın alabilirsiniz." },
        { title: "Arcanis'de bilet satın alırken komisyon ödenir mi?", content: "Arcanis komisyon ücreti almaz. Arcanis'i kullanarak otobüs bileti alırken sadece biletinizin fiyatını ödersiniz." },
        { title: "Arcanis'de biletimi iptal edilebilir miyim?", content: "Roket biletinizi firmaların belirlediği iptal koşulları doğrultusunda iptal edebilirsiniz. İptal koşulları satın alma sırasında size bildirilir." },
        { title: "Arcanis'de bilet iadem ne zaman gerçekleşir?", content: "İptal işleminiz onaylandıktan sonra ücret iadesi, hiçbir kesinti olmadan bankanıza aktarılır. Ödediğiniz tutar bankanızın iade prosedürlerine bağlı olarak 7 iş günü içerisinde hesabınıza yansır. Bankamatik kartları ile yapılan işlemlerde bu süreç 1-20 iş gününü bulabilir. İade süreci tamamen bankanıza bağlıdır ve Arcanis'in müdahale etme hakkı yoktur." },
    ];

    const disabledDate = (current) => {
        return current && current < moment().endOf("day");
    };

    const disabledReturnDate = (current) => {
        return current && current < moment(departureDate).endOf("day");
    };

    /* LOOKUPS */
    useEffect(() => {
        fetchPlanetData();
    }, []);
    /* LOOKUPS */

    useEffect(() => {
        filterExpedition();
    }, [pageOdata, pageSizeOdata]);

    const fetchPlanetData = async () => {
        try {
            const url = `${Config.SERVICE_URL}/lookups/planets`;
            const data = await getData(url);
            setPlanetData(data);
        } catch (error) {
            console.error("API talebi başarısız oldu: ", error);
        }
    };

    /* BUY TICKET */

    const onChangeFirstDate = (date, dateString) => {
        setFirstDateFilter(dateString);
        setDepartureDate(date);
    };

    const onChangeLastDate = (date, dateString) => {
        setEndDateFilter(dateString);
    };

    const handleSelectDeparturePlanet = (value) => {
        const selectedPlanet = planetData.find((planet) => planet.id === value);
        setSelectedDeparturePlanet(selectedPlanet ? selectedPlanet.id : value);
    };

    const handleSelectArrivalPlanet = (value) => {
        const selectedPlanet = planetData.find((planet) => planet.id === value);
        setSelectedArrivalPlanet(selectedPlanet ? selectedPlanet.id : value);
    };

    const showWarningMessage = (message) => {
        messageApi.open({
            type: "warning",
            content: message,
        });
    };

    const filterExpedition = async () => {
        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;

        const filterObject = {};

        if (selectedDeparturePlanet !== undefined) {
            filterObject.DeparturePlanetId = {
                eq: { type: "guid", value: selectedDeparturePlanet },
            };
        } else {
            showWarningMessage("Kalkış gezegeni seçilmelidir.");
            return;
        }

        if (selectedArrivalPlanet !== undefined) {
            filterObject.ArrivalPlanetId = {
                eq: { type: "guid", value: selectedArrivalPlanet },
            };
        } else {
            showWarningMessage("Varış gezegeni seçilmelidir.");
            return;
        }

        if (firstDateFilter != null && endDateFilter != null) {
            filterObject.ExpeditionDate = {
                ge: new Date(firstDateFilter),
                le: new Date(endDateFilter),
            };
        } else {
            showWarningMessage("Başlangıç ve bitiş tarihleri seçilmelidir.");
            return;
        }

        const queryWithPaging = buildQuery({
            filter: filterObject,
            count,
            top,
            skip,
        });
        const url = `${Config.SERVICE_URL}/expenditions${queryWithPaging}`;
        const data = await getData(url).catch((err) => {
            console.log("API request failed", err);
        });
        if (data !== undefined && data.value !== null && data.value.length > 0) {
            const totalPageCount = Math.ceil(data["@odata.count"]);
            setTotalPageCount(totalPageCount);
            setTicketSalesFilter(data.value);
        } else {
            setTicketSalesFilter([]);
            showWarningMessage(
                `${displayDate(firstDateFilter)} - ${displayDate(
                    endDateFilter
                )} aralığında aktif sefer kaydı bulunamadı.`
            );
        }
    }

    /* BUY TICKET */

    return (
        <>
            {contextHolder}
            <div className="ticketPageContainer">
                <div className="ticketPageBody">
                    <div className="ticketPageBodyPosition">
                        <div className="ticketSearch">
                            <Space wrap>
                                <Select
                                    onChange={handleSelectDeparturePlanet}
                                    value={selectedDeparturePlanet}
                                    className="selectDeparture"
                                    suffixIcon={<BsGeoAlt />}
                                    defaultValue="Kalkış Noktası"
                                    bordered={false}
                                >
                                    {planetData.map((planet) => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                            <Space wrap>
                                <Select
                                    onChange={handleSelectArrivalPlanet}
                                    value={selectedArrivalPlanet}
                                    className="selectArrival"
                                    suffixIcon={<BsGeoAlt />}
                                    defaultValue="Varış Noktası"
                                    bordered={false}
                                >
                                    {planetData.map((planet) => (
                                        <Select.Option key={planet.id} value={planet.id}>
                                            {planet.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                            <Space>
                                <DatePicker
                                    className="firstDateTicket"
                                    onChange={onChangeFirstDate}
                                    disabledDate={disabledDate}
                                    placeholder="Başlangıç Tarih"
                                />
                                <DatePicker
                                    className="lastDateTicket"
                                    onChange={onChangeLastDate}
                                    disabledDate={disabledReturnDate}
                                    placeholder="Bitiş Tarih"
                                />
                            </Space>
                            <Link className="ticketBtnStyle">
                                <button onClick={filterExpedition}>Seyahat Bileti Bul</button>
                            </Link>
                        </div>
                        <div className="ticketDescription">
                            <h1>Uzayın Derinliklerine Yolculuk</h1>
                            <div className="deskBoxContainer">
                                <div className="descBox">
                                    <TfiHeadphoneAlt />
                                    <p>7/24 Müşteri Hizmetleri</p>
                                </div>
                                <div className="descBox">
                                    <BsCreditCard2Back />
                                    <p>Güvenli Ödeme</p>
                                </div>
                                <div className="descBox">
                                    <BsCashCoin />
                                    <p>Komisyon Yok, Ücretsiz</p>
                                </div>
                                <div className="descBox">
                                    <BsPeople />
                                    <p>Ayda 25 Milyondan Fazla Ziyaretçi</p>
                                </div>
                                <div className="descBox">
                                    <BsStopwatchFill />
                                    <p>İki Dakikada Biletini Al</p>
                                </div>
                                <div className="descBox">
                                    <BsCoin />
                                    <p>İptal Edilen Bilete Kesintisiz İade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {ticketSalesFilter.length > 0 ? (
                    <BuyTicket
                        ticketSalesFilter={ticketSalesFilter}
                        setPageOdata={setPageOdata}
                        setPageSizeOdata={setPageSizeOdata}
                        pageOdata={pageOdata}
                        pageSizeOdata={pageSizeOdata}
                        totalPageCount={totalPageCount}
                    />
                ) : (
                    <>
                        <h1 className="ticketPageBodyTitle">Uzay Seyahati için Arcanis</h1>
                        <div className="ticketPageBodyContent">
                            <div className="ticketPageBodyContentInfoBox">
                                <i className="ticketPageInfoIcon">
                                    <TfiHeadphoneAlt />
                                </i>
                                <h3 className="ticketPageInfoTitle">7/24 Müşteri Hizmetleri</h3>
                                <p className="ticketPageInfoDescription">
                                    Site üzerinden yapacağınız tüm işlemlerde müşteri hizmetleri
                                    ekibimiz 7/24 yanınızda. Bir tıkla Canlı Destek başlatabilir
                                    ve yardım alabilirsiniz.
                                </p>
                            </div>
                            <div className="ticketPageBodyContentInfoBox">
                                <i className="ticketPageInfoIcon">
                                    <BsCreditCard2Back />
                                </i>
                                <h3 className="ticketPageInfoTitle">Güvenli Ödeme</h3>
                                <p className="ticketPageInfoDescription">
                                    Tüm uzay bilet alımlarınızı ister evinizden, ister ofisinizden
                                    ya da dilerseniz cep telefonunuzdan kolay, hızlı ve güvenilir
                                    bir şekilde gerçekleştirebilirsiniz.
                                </p>
                            </div>
                            <div className="ticketPageBodyContentInfoBox">
                                <i className="ticketPageInfoIcon">
                                    <BsCashCoin />
                                </i>
                                <h3 className="ticketPageInfoTitle">Her Bütçeye Uygun</h3>
                                <p className="ticketPageInfoDescription">
                                    Arcais size tüm firmaların uzay biletlerini sorgulama ve
                                    karşılaştırma imkanı sunar. Bu sayede bütçenize uygun uzay
                                    biletini rahatlıkla bulabilir ve satın alabilirsiniz.
                                </p>
                            </div>
                            <div className="ticketPageBodyContentInfoBox">
                                <i className="ticketPageInfoIcon">
                                    <BsFillRocketTakeoffFill />
                                </i>
                                <h3 className="ticketPageInfoTitle">En Seçkin Firmalar</h3>
                                <p className="ticketPageInfoDescription">
                                    Arcanis olarak en seçkin uzay firmalarını sizler için bir
                                    araya topladık. Tüm firmaların uzay biletlerini
                                    karşılaştırabilir, uygun uzay biletini bulabilir ve online
                                    alabilirsiniz
                                </p>
                            </div>
                        </div>
                        <h1 className="ticketPageBodyQuestionsTitle">
                            Sıkça Sorulan Sorular
                        </h1>
                        <div className="ticketPageBodyQuestions">
                            {initialData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`ticketPageBodyQuestionsBox ${index === expandingBox ? "expanded" : ""
                                        }`}
                                >
                                    <div className="ticketPageBodyQuestionsBoxTitle">
                                        <h3>{item.title}</h3>
                                        <i
                                            className="ticketPageBodyQuestionsBoxSvg"
                                            onClick={() => handleBoxExpand(index)}
                                        >
                                            {index === expandingBox ? "-" : "+"}
                                        </i>
                                    </div>
                                    <div className="ticketPageBodyQuestionsBoxContent">{item.content}</div>
                                </div>
                            ))}
                        </div>
                        <div className="ticketPageFooterPromo">
                            <div className="ticketPagePromoContainer">
                                <div className="ticketPagePromoContent">
                                    <h1>Arcanis</h1>
                                </div>
                                <div className="ticketPagePromoContent">
                                    <i>
                                        <BsFillClockFill />
                                    </i>
                                    <h3>En Hızlı</h3>
                                </div>
                                <div className="ticketPagePromoContent">
                                    <i>
                                        <BsFillLockFill />
                                    </i>
                                    <h3>En Güvenilir</h3>
                                </div>
                                <div className="ticketPagePromoContent">
                                    <i>
                                        <FaWallet />
                                    </i>
                                    <h3>En Ekonomik</h3>
                                </div>
                            </div>
                        </div>
                        <div className="ticketPageFooterContainer">
                            <div className="ticketPageFooterInfoBox">
                                <th className="ticketPageListGroup">
                                    <td className="ticketPageListHeader">Arcanis</td>
                                    <ul>
                                        <li>
                                            <a href="none">En Ucuz Roket Biletleri</a>
                                        </li>
                                        <li>
                                            <a href="none">Bilet Al</a>
                                        </li>
                                        <li>
                                            <a href="none">Seyahatler</a>
                                        </li>
                                        <li>
                                            <a href="none">Uzay İstasyonları</a>
                                        </li>
                                    </ul>
                                </th>
                            </div>
                            <div className="ticketPageFooterInfoBox">
                                <th className="ticketPageListGroup">
                                    <td className="ticketPageListHeader">
                                        Popüler Uzay Seyahati Firmaları
                                    </td>
                                    <ul>
                                        <li>
                                            <a href="none">SpaceX</a>
                                        </li>
                                        <li>
                                            <a href="none">Blue Origin</a>
                                        </li>
                                        <li>
                                            <a href="none">Virgin Galactics</a>
                                        </li>
                                        <li>
                                            <a href="none">Nasa</a>
                                        </li>
                                    </ul>
                                </th>
                            </div>
                            <div className="ticketPageFooterInfoBox">
                                <th className="ticketPageListGroup">
                                    <td className="ticketPageListHeader">Arcanis</td>
                                    <ul>
                                        <li>
                                            <a href="none">Roket Bileti</a>
                                        </li>
                                        <li>
                                            <a href="none">Rezervasyon</a>
                                        </li>
                                        <li>
                                            <a href="none">Roket Kiralama</a>
                                        </li>
                                        <li>
                                            <a href="none">Hakkımızda</a>
                                        </li>
                                        <li>
                                            <a href="none">KVKK Aydınlatma Metni</a>
                                        </li>
                                        <li>
                                            <a href="none">Çerez Politikası</a>
                                        </li>
                                    </ul>
                                </th>
                            </div>
                            <div className="ticketPageFooterInfoBox">
                                <th className="ticketPageListGroup">
                                    <td className="ticketPageListHeader">Bizi Takip Edin</td>
                                    <ul>
                                        <li>
                                            <a href="none">Twitter</a>
                                        </li>
                                        <li>
                                            <a href="none">Facebook</a>
                                        </li>
                                        <li>
                                            <a href="none">Instagram</a>
                                        </li>
                                    </ul>
                                </th>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};