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
import { Button, DatePicker, Input, Select } from 'antd';

export default function UsersList() {
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [expenditions, setExpenditions] = useState([]);
    const [selectedExpeditions, setSelectedExpeditions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [expeditionFilter, setExpeditionFilter] = useState([]);
    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("");

    const [ticketPrice, setTicketPrice] = useState("");
    const [arrivalDateFilter, setArrivalDateFilter] = useState(null);
    const [expeditionDateFilter, setExpeditionDateFilter] = useState(null);
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
            render: (_, record) => {
                const roundedTicketPrice = record.ticketPrice.toFixed();
                return roundedTicketPrice;
            },
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

    /* LOOKUPS */
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
    /* LOOKUPS */

    const onChangeDepartureDate = (date, dateString) => {
        setArrivalDateFilter(dateString);
    };

    const onChangeArrivalDate = (date, dateString) => {
        setExpeditionDateFilter(dateString);
    };

    const handleSelectSpaceVehicle = (value) => {
        const selectedVehicle = spaceVehicleData.find(vehicle => vehicle.id === value);
        setSelectedSpaceVehicle(selectedVehicle ? selectedVehicle.id : value);
    };

    const handleSelectDeparturePlanet = (value) => {
        const selectedPlanet = planetData.find(planet => planet.id === value);
        setSelectedDeparturePlanet(selectedPlanet ? selectedPlanet.id : value);
    };

    const handleSelectArrivalPlanet = (value) => {
        const selectedPlanet = planetData.find(planet => planet.id === value);
        setSelectedArrivalPlanet(selectedPlanet ? selectedPlanet.id : value);
    };

    async function handleFilterButtonClick() {

        const filterObject = {};

        if (selectedSpaceVehicle) {
            filterObject.spaceVehicleId = { eq: selectedSpaceVehicle };
        }

        if (selectedDeparturePlanet) {
            filterObject.departurePlanetId = { eq: selectedDeparturePlanet };
        }

        if (selectedArrivalPlanet) {
            filterObject.arrivalPlanetId = { eq: selectedArrivalPlanet };
        }

        const queryWithPaging = buildQuery({ filter: filterObject });
        console.log(filterObject);
        const url = `${baseUrl}/expenditions${queryWithPaging}`;
        try {
            const response = await fetchExpenditionsGet(url);

            if (!response || !response.value) {
                console.error('API response is undefined or does not have a value property.');
                return;
            }

            setExpeditionFilter(response.value);
            console.log(filterObject);
        } catch (err) {
            console.log('API request failed', err);
        }
    };

    return (
        <container className='expeditionContainer'>
            <div className='searchBarExpeditionContainer'>
                <div className='searchBarTitle'>
                    <h1>Sefer Filtrele</h1>
                </div>
                <div className='searchBarExpeditionSelectContainer'>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeDepartureDate} placeholder='Kalkış Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeArrivalDate} placeholder='Varış Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={ticketPrice}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            placeholder="Bilet Fiyatı"
                        />
                    </div>
                    <div className='SelectRolePosition'>
                        <Select
                            onChange={handleSelectSpaceVehicle}
                            value={selectedSpaceVehicle}
                            placeholder='Uzay Aracı'
                            name="spaceVehicleId"
                        >
                            {spaceVehicleData.map(vehicle => (
                                <Select.Option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className='SelectRolePosition'>
                        <Select
                            onChange={handleSelectDeparturePlanet}
                            value={selectedDeparturePlanet}
                            placeholder='Kalkış Gezegeni'
                            name="departurePlanetId"
                        >
                            {planetData.map(planet => (
                                <Select.Option key={planet.id} value={planet.id}>
                                    {planet.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className='SelectRolePosition'>
                        <Select
                            placeholder="Varış Gezegeni"
                            onChange={handleSelectArrivalPlanet}
                            value={selectedArrivalPlanet}
                            name="arrivalPlanetId"
                        >
                            {planetData.map(planet => (
                                <Select.Option key={planet.id} value={planet.id}>
                                    {planet.displayName}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <article className='expeditionBody'>
                <TableListComp props={{
                    columns: columns, dataSource: expeditionFilter?.length ? expeditionFilter : expenditions
                }} text="expedition" pageSearchType={"expedition"} addButtonLabel={"Sefer Ekle"} addFilterName={"Sefer Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} />
                {isModalOpen && (
                    <EditUserModal expendition={selectedExpeditions} onCancel={handleModalClose} visible={isModalOpen} pageType={"expedition"} addEditTitle={"Sefer Güncelleme"} expeditionDelete={handleDeleteExpedition} />
                )}
            </article>
        </container>
    )
}