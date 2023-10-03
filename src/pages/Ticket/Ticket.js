import React from 'react';
import "./Ticket.css";
import { Select, Space, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BsCreditCard2Back, BsCashCoin, BsPeople, BsStopwatchFill, BsCoin } from "react-icons/bs";

export default function Ticket() {

    const { RangePicker } = DatePicker;

    return (
        <>
            <container>
                <div className='ticket-page-body'>
                    <div className='ticket-search'>
                        <Space wrap className='ticket-dropdown-style'>
                            <Select
                                defaultValue="lucy"
                                bordered={false}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                ]}
                            />
                        </Space>
                        <Space wrap className='ticket-dropdown-style'>
                            <Select
                                defaultValue="lucy"
                                style={{
                                    width: 120,
                                }}
                                bordered={false}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                ]}
                            />
                        </Space>
                        <Space direction="vertical" size={12}>
                            <RangePicker bordered={false} />
                        </Space>
                        <Link to="productdetails" className='ticket-btn-group'>
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
