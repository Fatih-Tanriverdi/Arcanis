import React, { useEffect, useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Input, Button, Table, Select, DatePicker } from 'antd';
import { ModelComponent } from '../ModalComponent/ModalComponent';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { fetchRocketsGet } from '../../services/RocketService';

export function TableListComp({ pageSearchType, props, addButtonLabel }) {
    const [page, setPage] = useState(1);
    const [modelContent, setModelContent] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Space Vehicle");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Departure Planet");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Arrival Planet");
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    const showModall = (content) => {
        setIsModalVisible(true);
        setModelContent(content);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
        filterDataSource(searchText, selectedFilters);
    };

    const handleFilter = () => {
        filterDataSource(searchText, selectedFilters);
    };

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' },
    ];

    const activeOptions = [
        { value: 'active', label: 'Active' },
        { value: 'passive', label: 'Passive' },
    ];

    const modelYearOptions = [];
    for (let year = 1950; year <= 2100; year++) {
        modelYearOptions.push({
            value: year.toString(),
            label: year.toString(),
        });
    }

    const seatNumberOptions = [];
    for (let seatNumber = 1; seatNumber <= 50; seatNumber++) {
        seatNumberOptions.push({
            value: seatNumber.toString(),
            label: seatNumber.toString()
        });
    };

    const ageLimitOptions = [];
    for (let age = 1; age <= 100; age++) {
        ageLimitOptions.push({
            value: age.toString(),
            label: age.toString()
        })
    };

    const priceOptions = [];
    for (let price = 100000; price <= 500000; price += 10000) {
        priceOptions.push({
            value: price.toLocaleString(),
            label: `$${price.toLocaleString()}`
        });
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    /* LOOKUPS */
    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = "http://lambalog.com/api/lookups/planets";
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
                const url = "http://lambalog.com/api/lookups/space-vehicles";
                const data = await fetchRocketsGet(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);
    /* LOOKUPS */

    const getSearchContent = () => {
        switch (pageSearchType) {
            case 'spaceShips':
                return (
                    <div className='search-filter-container'>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.modelYear}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, modelYear: value })}
                                placeholder="Model Years"
                                options={modelYearOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.seatNumber}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, seatNumber: value })}
                                placeholder="Seat Number"
                                options={seatNumberOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.ageLimit}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, ageLimit: value })}
                                placeholder="Age Limit"
                                options={ageLimitOptions}
                            />
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className='search-filter-container'>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.userRoleType}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, userRoleType: value })}
                                placeholder="User Role"
                                options={roleOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.isActive}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, isActive: value })}
                                placeholder="User Status"
                                options={activeOptions}
                            />
                        </div>
                    </div>
                );
            case 'planets':
                return (
                    <div className='search-filter-container'>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.sequence}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, sequence: value })}
                                placeholder="Sıra No"
                                options={seatNumberOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.difficultyLevel}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, difficultyLevel: value })}
                                placeholder="Difficulty Level"
                                options={ageLimitOptions}
                            />
                        </div>
                    </div>
                );
            case 'expedition':
                return (
                    <div className='search-expedition-container'>
                        <div className='SelectRolePosition'>
                            <DatePicker onChange={onChange} placeholder='Expedition Date' />
                        </div>
                        <div className='SelectRolePosition'>
                            <DatePicker onChange={onChange} placeholder='Arrival Date' />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                value={selectedFilters.ticketPrice}
                                onChange={(value) => setSelectedFilters({ ...selectedFilters, ticketPrice: value })}
                                placeholder="Ticket Price"
                                options={priceOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                id='modal-username-style-input'
                                onChange={handleSelectSpaceVehicle}
                                value={selectedSpaceVehicle}
                                placeholder='Space Vehicle Id'
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
                                id='modal-username-style-input'
                                onChange={handleSelectDeparturePlanet}
                                value={selectedDeparturePlanet}
                                placeholder='Departure Planet Id'
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
                                placeholder={"Arrival Planet"}
                                id='modal-username-style-input'
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
                    </div>
                );
            default:
                return null;
        }
    };

    const [selectedFilters, setSelectedFilters] = useState({});
    const [filteredData, setFilteredData] = useState(props.dataSource);

    const filterDataSource = (searchText) => {
        const filteredDataBase = props.dataSource.filter(item => {
            let isMatch = true;

            if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
                isMatch = false;
            } else if (selectedFilters.modelYear && item.modelYear !== selectedFilters.modelYear) {
                isMatch = false;
            } else if (selectedFilters.seatNumber && item.seatNumber !== selectedFilters.seatNumber) {
                isMatch = false;
            } else if (selectedFilters.ageLimit && item.ageLimit !== selectedFilters.ageLimit) {
                isMatch = false;
            }

            return isMatch;
        });

        setFilteredData(filteredDataBase);
    };

    console.log(selectedFilters);

    return (
        <div className='listCompContainer'>
            <div className='search-bar-item-top'>
                <h1>Search Filter</h1>
                <div className='seacrh-bar-filter-container'>
                    {getSearchContent()}
                    <Button type="text" className="filter-btn" onClick={handleFilter}>Filter</Button>
                </div>
            </div>
            <div className="listBtn">
                <div className='table-list-head'>
                    <Button className='add-btn' type="text" onClick={() => showModall(pageSearchType)}>{addButtonLabel}</Button>
                    <div className='input-user-group'>
                        <span>Search: </span>
                        <Input
                            className='search-input'
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className='table'>
                    <Table
                        columns={props.columns}
                        dataSource={searchText ? filteredData : props.dataSource}
                        pagination={{
                            current: page,
                            pageSize: pageSize,
                            total: 100,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }
                        }}
                    />
                </div>
                <ModelComponent isModalVisible={isModalVisible} onCancel={handleCancel} modalContent={modelContent} addTitle={pageSearchType === 'spaceShips' ? 'Uzay Aracı Ekle' : pageSearchType === 'users' ? 'Kullanıcı Ekle' : pageSearchType === 'planets' ? 'Gezegen Ekle' : pageSearchType === 'expedition' ? 'Sefer Ekle' : ''} />
            </div>
        </div>
    )
}
