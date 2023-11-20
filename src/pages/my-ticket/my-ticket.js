import React, { useEffect, useState } from 'react';
import './my-ticket.css';
import { Table } from 'antd';
import { fetchTicketsGet } from '../../services/TicketService';
import Config from "../../config-file.json"
import { fetchUsersDataGet } from '../../services/userService';
import buildQuery from 'odata-query';

export default function MyTicket() {

    const [myTicket, setMyTicket] = useState([]);
    const [userData, setUserData] = useState([]);

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

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        console.log('çalışıyor')
        const fetchData = async () => {
            try {
                const expand = 'User,Expedition';
                const queryWithPaging = buildQuery({ expand });
                const url = `${Config.SERVICE_URL}/ticket-sales${queryWithPaging}`;
                const data = await fetchTicketsGet(url);
                setMyTicket(data.value);
console.log(data.value)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
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
