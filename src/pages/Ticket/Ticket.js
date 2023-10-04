import React, { useEffect, useState } from 'react';
import "./Ticket.css";
import { Select, Space, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCreditCard2Back, BsCashCoin, BsPeople, BsStopwatchFill, BsCoin, BsGeoAlt } from "react-icons/bs";
import { fetchPlanets } from '../../services/RocketService';

export default function Ticket() {

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        async function getPlanets() {
            const data = await fetchPlanets()
            .catch(error => {
                console.error('API request failed:', error);
                return [];
            });
            setPlanets(data);
        }
        getPlanets();
    }, []);

    return (
        <>
            <container>
                <div className='ticket-page-body'>
                    <div className='ticket-search'>
                        <Space wrap className='ticket-dropdown-style'>
                            <Select
                                suffixIcon={<BsGeoAlt style={{ marginRight: '260px', color: "white" }} />}
                                defaultValue="Kalkış Noktası"
                                bordered={false}
                            >
                                {planets.map(planet => (
                                    <Option key={planet.id} value={planet.id}>
                                        {planet.name}
                                    </Option>
                                ))}
                            </Select>
                        </Space>
                        <Space wrap className='ticket-dropdown-style'>
                            <Select
                                suffixIcon={<BsGeoAlt style={{ marginRight: '260px', color: "white" }} />}
                                defaultValue="Varış Noktası"
                                bordered={false}
                            >
                                {planets.map(planet => (
                                    <Option key={planet.id} value={planet.id}>
                                        {planet.name}
                                    </Option>
                                ))}
                            </Select>
                        </Space>
                        <Space direction="vertical" size={12}>
                            <RangePicker bordered={false} placeholder={['Gidiş Tarihi', 'Dönüş Tarihi']} />
                        </Space>
                        <Link className='ticket-btn-group'>
                            <button>Seyahat Bileti Bul</button>
                        </Link>
                    </div>
                    <div className='ticket-decription'>
                        <h1>Uzayın Derinliklerine Yolculuk</h1>
                        <div className='desk-box-container'>
                            <div className='desc-box'>
                                <TfiHeadphoneAlt />
                                <p>7/24 Müşteri Hizmetleri</p>
                            </div>
                            <div className='desc-box'>
                                <BsCreditCard2Back />
                                <p>Güvenli Ödeme</p>
                            </div>
                            <div className='desc-box'>
                                <BsCashCoin />
                                <p>Komisyon Yok, Ücretsiz</p>
                            </div>
                            <div className='desc-box'>
                                <BsPeople />
                                <p>Ayda 25 Milyondan Fazla Ziyaretçi</p>
                            </div>
                            <div className='desc-box'>
                                <BsStopwatchFill />
                                <p>İki Dakikada Biletini Al</p>
                            </div>
                            <div className='desc-box'>
                                <BsCoin />
                                <p>İptal Edilen Bilete Kesintisiz İade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </container>
            <container className='ticket-page-footer' >
                <div className='ticket-page-footer'>
                </div>
            </container>
        </>
    )
}
