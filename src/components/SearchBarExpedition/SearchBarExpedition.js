import "./SearchBarExpedition.css";
import { DatePicker, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import APImanager from '../../apiManager';
import { fetchRocketsGet } from '../../services/RocketService';
import { fetchPlanetsGet } from '../../services/PlanetService';

export default function SearchBarExpedition() {

    const [selectedFilters, setSelectedFilters] = useState({});
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const baseUrl = APImanager.getBaseURL();

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Uzay Aracı");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Kalkış Gezegeni");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Varış Gezegeni");

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const priceOptions = [];
    for (let price = 100000; price <= 500000; price += 10000) {
        priceOptions.push({
            value: price.toLocaleString(),
            label: `$${price.toLocaleString()}`
        });
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

    return (
        <div className='searchBarExpeditionContainer'>
            <div className='SelectRolePosition'>
                <DatePicker onChange={onChange} placeholder='Kalkış Tarihi' />
            </div>
            <div className='SelectRolePosition'>
                <DatePicker onChange={onChange} placeholder='Varış Tarihi' />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.ticketPrice}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, ticketPrice: value })}
                    placeholder="Bilet Fiyatı"
                    options={priceOptions}
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
        </div>
    )
}