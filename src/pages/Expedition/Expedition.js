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
import Config from "../../config-file.json"
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
    const [totalPageCount, setTotalPageCount] = useState(1);

    const [expeditionFilter, setExpeditionFilter] = useState([]);
    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState();
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState();
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState();

    const [ticketPrice, setTicketPrice] = useState("");
    const [arrivalDateFilter, setArrivalDateFilter] = useState(null);
    const [expeditionDateFilter, setExpeditionDateFilter] = useState(null);
    
    const columns = [
        {
            title: '',
            dataIndex: 'Id',
            key: 'Id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditExpedition(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'SEFER ADI',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'KALKIŞ TARİHİ',
            dataIndex: 'ExpeditionDate',
            key: 'ExpeditionDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'VARIŞ TARİHİ',
            dataIndex: 'ArrivalDate',
            key: 'ArrivalDate',
            render: (arrivalDate, record) => formatDate(arrivalDate)
        },
        {
            title: 'BİLET FİYATI',
            key: 'TicketPrice',
            dataIndex: 'TicketPrice',
            render: (_, record) => {
                const roundedTicketPrice = record.TicketPrice.toFixed(2);
                const formattedTicketPrice = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(roundedTicketPrice);
                return formattedTicketPrice;
            },
        },
        {
            title: 'UZAY ARACI',
            key: 'SpaceVehicleId',
            dataIndex: 'SpaceVehicleId',
            render: (spaceVehicleData) => mapSpaceVehicleIdToName(spaceVehicleData)
        },
        {
            title: 'KALKIŞ GEZEGENİ',
            key: 'DeparturePlanetId',
            dataIndex: 'DeparturePlanetId',
            render: (departurePlanetId) => mapPlanetIdToName(departurePlanetId)
        },
        {
            title: 'VARIŞ GEZEGENİ',
            key: 'ArrivalPlanetId',
            dataIndex: 'ArrivalPlanetId',
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
                const url = `${Config.SERVICE_URL}/lookups/space-vehicles`;
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
                const url = `${Config.SERVICE_URL}/lookups/planets`;
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
        handleFilterButtonClick();
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

        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;

        const filterObject = {};

        if (arrivalDateFilter) {
            filterObject.arrivalDate = { ge: new Date(arrivalDateFilter) };
        }
        if (expeditionDateFilter) {
            filterObject.expeditionDate = { ge: new Date(expeditionDateFilter) };
        }
        if (selectedSpaceVehicle) {
            filterObject.spaceVehicleId = { eq: {type:'guid', value:selectedSpaceVehicle }  };
        }
        if (selectedDeparturePlanet) {
            filterObject.departurePlanetId = { eq: {type:'guid', value:selectedDeparturePlanet } };
        }
        if (selectedArrivalPlanet) {
            filterObject.arrivalPlanetId = { eq: {type:'guid', value:selectedArrivalPlanet} };
        }

        const queryWithPaging = buildQuery({ filter: filterObject, count, top, skip });
        console.log(filterObject);
        const url = `${Config.SERVICE_URL}/expenditions${queryWithPaging}`;
        const data = await fetchExpenditionsGet(url)
            .catch(err => { console.log("API request failed", err); })
        if (data !== undefined && data.value !== null) {
            const totalPageCount = Math.ceil(data["@odata.count"]);
            setTotalPageCount(totalPageCount);
            setExpeditionFilter(data.value);
        }
        else {
            setExpeditionFilter([]);
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
                }} text="expedition" pageSearchType={"expedition"} addButtonLabel={"Sefer Ekle"} addFilterName={"Sefer Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount}/>
                {isModalOpen && (
                    <EditUserModal expendition={selectedExpeditions} onCancel={handleModalClose} visible={isModalOpen} pageType={"expedition"} addEditTitle={"Sefer Güncelleme"} expeditionDelete={handleDeleteExpedition} />
                )}
            </article>
        </container>
    )
}