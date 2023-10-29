import React, { useEffect, useState } from 'react'
import "../TicketAdmin/TicketAdmin.css";
import { checkToken } from '../../services/AuthService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import { deleteRocket, fetchRocketsGet } from '../../services/RocketService';
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';

export default function TicketAdmin() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketSalesData, setTicketSalesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'Id',
            key: 'Id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditRocket(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'CreatedDate',
            dataIndex: 'CreatedDate',
            key: 'CreatedDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'ExpeditionId',
            dataIndex: 'ExpeditionId',
            key: 'ExpeditionId',
        },
        {
            title: 'OrderDate',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'SeatNumber',
            key: 'SeatNumber',
            dataIndex: 'SeatNumber',
        },
    ];

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function fetchTicketSalesData() {
            const url = "http://lambalog.com/api/ticket-sales";
            const data = await fetchRocketsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setTicketSalesData(data.value);
        }
        fetchTicketSalesData();
    }, []);

    const handleDeleteTicket = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteRocket(Id)
            .then(() => {
                setTicketSalesData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((ticket) => ticket.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditRocket = (Id) => {
        const ticketEdit = ticketSalesData.find(ticket => ticket.Id === Id);
        setSelectedTicket(ticketEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    return (
        <container className='space-vehicle-container'>
            <article className='space-vehicle-body'>
                <div className='product-list'>
                    <div>
                        <TableListComp props={{ columns: columns, dataSource: ticketSalesData }} text="Ticket" pageSearchType={"ticketAdmin"} addButtonLabel={"Bilet Ekle"}/>
                        {isModalOpen && (
                            <EditModal ticket={selectedTicket} onCancel={handleModalClose} visible={isModalOpen} pageType={"ticketAdmin"} addEditTitle={"Bilet Güncelleme"} rocketDelete={handleDeleteTicket} />
                        )}
                    </div>
                </div>
            </article>
        </container>
    )
}

