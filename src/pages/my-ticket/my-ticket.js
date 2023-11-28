import React, { useEffect, useState } from 'react';
import './my-ticket.css';
import { Table } from 'antd';
import Config from "../../config-file.json"
import buildQuery from 'odata-query';
import { getData } from '../../services/BaseApiOperations';

export default function MyTicket() {

    const [myTicket, setMyTicket] = useState([]);

    const columns = [
        {
            title: 'Kullanıcı Adı',
            key: 'Fullname',
            render: (data) => `${data.User.Name} ${data.User.Surname}`
        },
        {
            title: 'Sefer Adı',
            key: 'ExpeditionId',
            render: (data) => `${data.Expedition.Name}`
        },
        {
            title: 'Sipariş Tarihi',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'Koltuk Numarası',
            key: 'SeatNumber',
            dataIndex: 'SeatNumber',
        },
    ];

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const fetchData = async () => {
        try {
            const expand = 'User,Expedition';
            const queryWithPaging = buildQuery({ expand });
            const url = `${Config.SERVICE_URL}/ticket-sales${queryWithPaging}`;
            const data = await getData(url);
            setMyTicket(data.value);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='myTicketContainer'>
            <h1 className='myTicketTitle'>Biletlerim</h1>
            <Table
                className='myTicketTable'
                columns={columns}
                dataSource={myTicket}
                rowClassName="tableRow"
                pagination={false}
            />
        </div>
    )
}