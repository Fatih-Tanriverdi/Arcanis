import React, { useEffect } from 'react';
import "./Expedition.css";
import { useState } from 'react';
import { checkToken } from '../../services/authService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { deleteExpedition, fetchExpenditionsGet } from '../../services/ExpeditionService';
import EditUserModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { fetchRocketsGet } from '../../services/RocketService';
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';

export default function UsersList() {
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [expenditions, setExpenditions] = useState([]);
    const [selectedExpeditions, setSelectedExpeditions] = useState([]);
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
                <button className="editButton" onClick={() => handleEditExpedition(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'SEFER ADI',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'KALKIŞ TARİHİ',
            dataIndex: 'expeditionDate',
            key: 'expeditionDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'VARIŞ TARİHİ',
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
            render: (arrivalDate, record) => formatDate(arrivalDate)
        },
        {
            title: 'BİLET FİYATI',
            key: 'ticketPrice',
            dataIndex: 'ticketPrice',
        },
        {
            title: 'UZAY ARACI',
            key: 'spaceVehicleId',
            dataIndex: 'spaceVehicleId',
            render: (spaceVehicleData) => mapSpaceVehicleIdToName(spaceVehicleData)
        },
        {
            title: 'KALKIŞ GEZEGENİ',
            key: 'departurePlanetId',
            dataIndex: 'departurePlanetId',
            render: (departurePlanetId) => mapPlanetIdToName(departurePlanetId)
        },
        {
            title: 'VARIŞ GEZEGENİ',
            key: 'arrivalPlanetId',
            dataIndex: 'arrivalPlanetId',
            render: (arrivalPlanetId) => mapPlanetIdToName(arrivalPlanetId)
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    /* Sunucudan gelen veriler düzeltilerek kullanıcıya gösteriliyor*/
    const mapSpaceVehicleIdToName = (spaceVehicleId) => {
        const spaceVehicle = spaceVehicleData.find(vehicle => vehicle.id === spaceVehicleId);
        return spaceVehicle ? spaceVehicle.displayName : '';
    };

    const mapPlanetIdToName = (planetId) => {
        const planet = planetData.find(planet => planet.id === planetId);
        return planet ? planet.displayName : '';
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
                const url = `${baseUrl}/lookups/space-vehicles`;
                const data = await fetchRocketsGet(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);

    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = `${baseUrl}/lookups/planets`;
                const data = await fetchPlanetsGet(url);
                setPlanetData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchPlanetData();
    }, []);
    /* LOOKUPS */

    useEffect(() => {
        const queryWithPaging = buildQuery({
            "top": pageSizeOdata,
            "skip": (pageOdata - 1) * pageSizeOdata,
        });
        async function expeditionsData() {
            const url = `${baseUrl}/expenditions${queryWithPaging}`;
            const data = await fetchExpenditionsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setExpenditions(data);
        }
        expeditionsData();
    }, [pageOdata, pageSizeOdata]);

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

    return (
        <container className='expeditionContainer'>
            <article className='expeditionBody'>
                <TableListComp props={{ columns: columns, dataSource: expenditions }} text="expedition" pageSearchType={"expedition"} addButtonLabel={"Sefer Ekle"} addFilterName={"Sefer Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} />
                {isModalOpen && (
                    <EditUserModal expendition={selectedExpeditions} onCancel={handleModalClose} visible={isModalOpen} pageType={"expedition"} addEditTitle={"Sefer Güncelleme"} expeditionDelete={handleDeleteExpedition} />
                )}
            </article>
        </container>
    )
}