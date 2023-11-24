import React, { useEffect, useState } from 'react';
import './BuyTicket.css';
import { Button, Table } from 'antd';
import Config from "../../config-file.json"
import BuyTicketModal from '../../components/buy-ticket-modal/buy-ticket-modal';
import { getData } from '../../services/BaseApiOperations';

export default function BuyTicket({ ticketSalesFilter, totalPageCount, pageOdata, pageSizeOdata, setPageOdata, setPageSizeOdata }) {

    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [ticketId, setTicketId] = useState();

    const columns = [
        {
            title: 'Sefer Adı',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Varış Tarihi',
            dataIndex: 'ArrivalDate',
            key: 'ArrivalDate',
            render: (arrivalDate, record) => formatDate(arrivalDate)
        },
        {
            title: 'Bilet Fiyatı',
            dataIndex: 'TicketPrice',
            key: 'TicketPrice',
            render: (_, record) => {
                const roundedTicketPrice = record.TicketPrice.toFixed(2);
                const formattedTicketPrice = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(roundedTicketPrice);
                return formattedTicketPrice;
            },
        },
        {
            title: 'Uzay Aracı Adı',
            dataIndex: 'SpaceVehicleId',
            key: 'SpaceVehicleId',
            render: (spaceVehicleData) => mapSpaceVehicleIdToName(spaceVehicleData)
        },
        {
            title: 'Satın Al',
            dataIndex: '',
            key: '',
            render: (_, record) => (
                <Button className='buyButton' type="primary" onClick={() => handleBuyClick(record)}>
                    Satın Al
                </Button>
            ),
        },
    ];

    /* Sunucudan gelen veriler düzeltilerek kullanıcıya gösteriliyor*/
    const mapSpaceVehicleIdToName = (spaceVehicleId) => {
        const spaceVehicle = spaceVehicleData.find(vehicle => vehicle.id === spaceVehicleId);
        return spaceVehicle ? spaceVehicle.displayName : '';
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    /* Sunucudan gelen veriler düzeltilerek kullanıcıya gösteriliyor*/

    /* LOOKUPS */
    useEffect(() => {
        async function fetchRocketData() {
            try {
                const url = `${Config.SERVICE_URL}/lookups/space-vehicles`;
                const data = await getData(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);
    /* LOOKUPS */

    const handleBuyClick = (record) => {
        setModalVisible(true);
        setTicketId(record.Id);
    };

    return (
        <div className='buyTicketContainer'>
            <div className='tableWrapper'>
                <Table
                    className='buyTicketTable'
                    columns={columns}
                    dataSource={ticketSalesFilter}
                    rowClassName="tableRow"
                    pagination={{
                        total: totalPageCount,
                        current: pageOdata,
                        pageSize: pageSizeOdata,
                        showSizeChanger: true,
                        onChange: (page, pageSize) => {
                            setPageOdata(page);
                            setPageSizeOdata(pageSize);
                        }
                    }}
                />
            </div>
            <BuyTicketModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                ticketId={ticketId}
            />
        </div>
    )
}