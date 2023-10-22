import React, { useEffect } from 'react';
import "./Expedition.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { deleteExpedition } from '../../services/ExpeditionService';
import UserDropdownMenu from '../../components/UserDropdownMenu/UserDropdownMenu';
import EditUserModal from '../../components/EditModal/EditUserModal';


export default function UsersList() {
    const [expenditions, setExpenditions] = useState([]);
    const [selectedExpeditions, setSelectedExpeditions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (id, record) => (
                <UserDropdownMenu
                    onEditClick={() => handleEditExpedition(id)}
                    onDeleteClick={() => handleDeleteExpedition(id)}
                />
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Expedition Date',
            dataIndex: 'expeditionDate',
            key: 'expeditionDate',
        },
        {
            title: 'Arrival Date',
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
        },
        {
            title: 'Ticket Price',
            key: 'ticketPrice',
            dataIndex: 'ticketPrice',
        },
        {
            title: 'Space Vehicle Id',
            key: 'spaceVehicleId',
            dataIndex: 'spaceVehicleId',
        },
        {
            title: 'Departure Planet Id',
            key: 'departurePlanetId',
            dataIndex: 'departurePlanetId',
        },
        {
            title: 'Arrival Planet Id',
            key: 'arrivalPlanetId',
            dataIndex: 'arrivalPlanetId',
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function planetsData() {
            const url = "http://lambalog.com/api/expenditions";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setExpenditions(data);
        }
        planetsData();
    }, []);

    const handleDeleteExpedition = (id) => {
        const confirmDelete = window.confirm('Expeditioni silmek istediğinize emin misiniz?');
        if (!confirmDelete) {
            return;
        }
        deleteExpedition(id)
            .then(() => {
                setExpenditions((prevExpeditionData) =>
                    prevExpeditionData.filter((expedition) => expedition.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditExpedition = (id) => {
        const expeditionEdit = expenditions.find(expedition => expedition.id === id);
        setSelectedExpeditions(expeditionEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedExpeditions(null);
        setIsModalOpen(false);
    };

    console.log(selectedExpeditions);

    return (
        <container className='expedition-container'>
            <article className='expedition-body'>
                <div className='expedition-list'>
                    <TableListComp props={{ columns: columns, dataSource: expenditions }} text="expedition" pageSearchType={"expedition"} />
                    {isModalOpen && (
                        <EditUserModal expedition={selectedExpeditions} onCancel={handleModalClose} visible={isModalOpen} pageType={"expedition"} />
                    )}
                </div>
            </article>
        </container>
    )
}
