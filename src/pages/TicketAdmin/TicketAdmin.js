import React, { useEffect, useState } from 'react'
import "../TicketAdmin/TicketAdmin.css";
import { checkToken } from '../../services/AuthService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { deleteTicket, fetchTicketsGet } from '../../services/TicketService';
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';

export default function TicketAdmin() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketSalesData, setTicketSalesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const baseUrl = APImanager.getBaseURL();

    const columns = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditRocket(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'OLUŞTURMA TARİHİ',
            dataIndex: 'CreatedDate',
            key: 'CreatedDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'SEFER ID',
            dataIndex: 'ExpeditionId',
            key: 'ExpeditionId',
        },
        {
            title: 'SİPARİŞ TARİHİ',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'KOLTUK NUMARASI',
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
        const queryWithPaging = buildQuery({
            "top": pageSizeOdata,
            "skip": (pageOdata - 1) * pageSizeOdata,
        });
        async function fetchTicketSalesData() {
            const url = `${baseUrl}/ticket-sales${queryWithPaging}`;
            const data = await fetchTicketsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setTicketSalesData(data.value);
        }
        fetchTicketSalesData();
    }, [pageOdata, pageSizeOdata]);

    const handleDeleteTicket = (id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteTicket(id)
            .then(() => {
                setTicketSalesData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((ticket) => ticket.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditRocket = (id) => {
        const ticketEdit = ticketSalesData.find(ticket => ticket.id === id);
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
                        <TableListComp props={{ columns: columns, dataSource: ticketSalesData }} text="Ticket" pageSearchType={"ticketAdmin"} addFilterName={"Bilet Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} />
                        {isModalOpen && (
                            <EditModal ticket={selectedTicket} onCancel={handleModalClose} visible={isModalOpen} pageType={"ticketAdmin"} addEditTitle={"Bilet Güncelleme"} ticketDelete={handleDeleteTicket} />
                        )}
                    </div>
                </div>
            </article>
        </container>
    )
}