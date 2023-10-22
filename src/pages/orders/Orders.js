import React, { useEffect } from 'react';
import "./Orders.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { deletePlanet, fetchPlanetsGet } from '../../services/PlanetService';
import UserDropdownMenu from '../../components/UserDropdownMenu/UserDropdownMenu';
import EditModal from '../../components/EditModal/EditUserModal';


export default function UsersList() {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'EDIT',
            key: 'id',
            dataIndex: 'id',
            render: (id, record) => (
                <UserDropdownMenu
                    onEditClick={() => handleEditPlanet(id)}
                    onDeleteClick={() => handleDeletePlanet(id)}
                />
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'user',
        },
        {
            title: 'SIRA',
            dataIndex: 'sequence',
            key: 'sequence',
        },
        {
            title: 'LEVEL',
            dataIndex: 'difficultyLevel',
            key: 'difficultyLevel',
        },
        {
            title: 'SUMMARY DESCRIPTION',
            key: 'summaryDescription',
            dataIndex: 'summaryDescription',
        },
        {
            title: 'DESCRIPTION',
            key: 'description',
            dataIndex: 'description',
            render: (text) => (
                <div className="table-cell">{text}</div>
            ),
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function planetsData() {
            const url = "http://lambalog.com/api/planets";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setPlanets(data);
        }
        planetsData();
    }, []);

    const handleDeletePlanet = (id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deletePlanet(id)
            .then(() => {
                setPlanets((prevPlanetsData) =>
                    prevPlanetsData.filter((planet) => planet.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditPlanet = (id) => {
        const planetEdit = planets.find(planet => planet.id === id);
        setSelectedPlanet(planetEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPlanet(null);
        setIsModalOpen(false);
    };

    return (
        <container className='orders-container'>
            <article className='orders-body'>
                <div className='orders-list'>
                    <TableListComp props={{ columns: columns, dataSource: planets }} text="planets" pageSearchType={"planets"} />
                    {isModalOpen && (
                        <EditModal planet={selectedPlanet} onCancel={handleModalClose} visible={isModalOpen} pageType={"planets"} />
                    )}
                </div>
            </article>
        </container>
    )
}
