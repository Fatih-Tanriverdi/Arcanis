import React, { useEffect } from 'react';
import "./Expedition.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { deleteExpedition, fetchExpenditionsGet } from '../../services/ExpeditionService';
import EditUserModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';


export default function UsersList() {
    const [expenditions, setExpenditions] = useState([]);
    const [selectedExpeditions, setSelectedExpeditions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditExpedition(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'EXPEDITION DATE',
            dataIndex: 'expeditionDate',
            key: 'expeditionDate',
        },
        {
            title: 'ARRIVAL DATE',
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
        },
        {
            title: 'TICKET PRICE',
            key: 'ticketPrice',
            dataIndex: 'ticketPrice',
        },
        {
            title: 'SPACE VEHICLE ID',
            key: 'spaceVehicleId',
            dataIndex: 'spaceVehicleId',
        },
        {
            title: 'DEPARTURE PLANET ID',
            key: 'departurePlanetId',
            dataIndex: 'departurePlanetId',
        },
        {
            title: 'ARRIVAL PLANET ID',
            key: 'arrivalPlanetId',
            dataIndex: 'arrivalPlanetId',
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function expeditionsData() {
            const url = "http://lambalog.com/api/expenditions";
            const data = await fetchExpenditionsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setExpenditions(data);
        }
        expeditionsData();
    }, []);

    const handleDeleteExpedition = (id) => {
        const confirmDelete = window.confirm('Expeditioni silmek istediğinize emin misiniz?');
        if (!confirmDelete) {
            return;
        }
        deleteExpedition(id)
            .then(() => {
                setExpenditions((prevExpenditionsData) =>
                    prevExpenditionsData.filter((expendition) => expendition.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditExpedition = (id) => {
        const expendEdit = expenditions.find(expend => expend.id === id);
        setSelectedExpeditions(expendEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedExpeditions(null);
        setIsModalOpen(false);
    };

    const expendition = selectedExpeditions;
    console.log(expendition);

    return (
        <container className='expedition-container'>
            <article className='expedition-body'>
                <div className='expedition-list'>
                    <TableListComp props={{ columns: columns, dataSource: expenditions }} text="expedition" pageSearchType={"expedition"} addButtonLabel={"Sefer Ekle"} />
                    {isModalOpen && (
                        <EditUserModal expendition={selectedExpeditions} onCancel={handleModalClose} visible={isModalOpen} pageType={"expedition"} addEditTitle={"Sefer Güncelleme"} expeditionDelete={handleDeleteExpedition}/>
                    )}
                </div>
            </article>
        </container>
    )
}
