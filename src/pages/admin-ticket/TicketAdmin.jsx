import "./TicketAdmin.css";
import React, { useEffect, useState } from 'react'
import { checkToken } from '../../services/authService';
import { TableListComp } from "../../components/admin-table/TableListComp"
import EditModal from '../../components/edit-modal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import Config from "../../config-file.json";
import buildQuery from 'odata-query';
import { Button, DatePicker, Input } from 'antd';
import { deleteDataById, getData, putData } from '../../services/BaseApiOperations';

export default function TicketAdmin() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketSalesData, setTicketSalesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [seatNumber, setSeatNumber] = useState("");
    const [orderDateStart, setOrderDateStart] = useState(null);
    const [orderDateEnd, setOrderDateEnd] = useState(null);
    const [ticketAdminFilter, setTicketAdminFilter] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState(1);

    const columns = [
        {
            title: '',
            dataIndex: 'Id',
            key: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditRocket(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'Müşteri Adı',
            key: 'FullName',
            render: (data) => `${data.User.Name} ${data.User.Surname}`
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        checkToken();
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata, ticketSalesData]);

    const updateTicket = (Id, updatedData) => {
        const url = `${Config.SERVICE_URL}/ticket-sales`;
        const data = updatedData;
        putData(url, data)
            .then((responseData) => {
                console.log('Bilet güncellendi:', responseData);
                setTicketSalesData(responseData);
            })
            .catch(error => {
                console.error('Güncelleme isteği başarısız oldu:', error);
            });
    };

    const handleDeleteTicket = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        const url = `${Config.SERVICE_URL}/ticket-sales/${Id}`;
        deleteDataById(url)
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
        const ticketEdit = ticketAdminFilter.find(ticket => ticket.Id === Id);
        setSelectedTicket(ticketEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    const onChangeOrderDateStart = (date, dateString) => {
        setOrderDateStart(dateString);
    };

    const onChangeOrderDateEnd = (date, dateString) => {
        setOrderDateEnd(dateString);
    };

    const handleFilterButtonClick = async () => {

        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;
        const expand = 'User';

        const filters = {};

        if (seatNumber > 0) {
            filters.SeatNumber = parseInt(seatNumber);
        }
        if (orderDateStart != null) {
            filters.OrderDate = { ge: new Date(orderDateStart) };
        }
        if (orderDateEnd != null) {
            filters.OrderDate = { le: new Date(orderDateEnd) };
        }

        const queryWithPaging = buildQuery({ filter: filters, count, top, skip, expand });
        const url = `${Config.SERVICE_URL}/ticket-sales${queryWithPaging}`;
        const data = await getData(url)
            .catch(err => { console.log("API request failed", err); })
        if (data !== undefined && data.value !== null) {
            const totalPageCount = Math.ceil(data["@odata.count"]);
            setTotalPageCount(totalPageCount);
            setTicketAdminFilter(data.value);
        }
        else {
            setTicketAdminFilter([]);
        }
    };

    return (
        <container className='spaceVehicleContainer'>
            <div className='searchBarTicketsContainer'>
                <div className='searchBarTitle'>
                    <h1>Bilet Filtrele</h1>
                </div>
                <div className='searchBarTicketSelectContainer'>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeOrderDateStart} placeholder='Sipariş Başlangıç Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeOrderDateEnd} placeholder='Sipariş Bitiş Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            placeholder="Koltuk Numarası"
                        />
                    </div>
                    <div className='SelectRolePosition'>
                        <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                    </div>
                </div>
            </div>
            <article className='spaceVehicleBody'>
                <TableListComp
                    props={{
                        columns: columns,
                        dataSource: ticketAdminFilter.length
                            ? ticketAdminFilter
                            : ticketSalesData
                    }}
                    text="Ticket"
                    pageSearchType={"ticketAdmin"}
                    addFilterName={"Bilet Filtreleme"}
                    setPageOdata={setPageOdata}
                    setPageSizeOdata={setPageSizeOdata}
                    pageOdata={pageOdata}
                    pageSizeOdata={pageSizeOdata}
                    totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditModal
                        ticket={selectedTicket}
                        onCancel={handleModalClose}
                        onSave={updateTicket}
                        visible={isModalOpen}
                        pageType={"ticketAdmin"}
                        addEditTitle={"Bilet Güncelleme"}
                        ticketDelete={handleDeleteTicket} />
                )}
            </article>
        </container>
    )
}