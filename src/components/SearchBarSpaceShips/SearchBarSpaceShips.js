import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import APImanager from '../../apiManager';
import "./SearchBarSpaceShips.css";
import buildQuery from 'odata-query';
import { fetchRocketsGet } from '../../services/RocketService';

export default function SearchBarSpaceShips() {

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredSpaceShipData, setFilteredSpaceShipData] = useState([]);
    const baseUrl = APImanager.getBaseURL();

    const modelYearOptions = [];
    for (let year = 1950; year <= 2100; year++) {
        modelYearOptions.push({
            value: year.toString(),
            label: year.toString(),
        });
    };

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

    useEffect(() => {
        const modelYear = parseInt(selectedFilters.modelYear);
        const MaxNumberOfPassengers = parseInt(selectedFilters.MaxNumberOfPassengers);
        const ageLimit = parseInt(selectedFilters.ageLimit);

        async function searchBarFilter() {
            const queryWithPaging = buildQuery({
                filter: { modelYear: modelYear, MaxNumberOfPassengers: MaxNumberOfPassengers, ageLimit: ageLimit }
            });
            const url = `${baseUrl}/space-vehicles${queryWithPaging}`;
            const data = await fetchRocketsGet(url)
                .catch(err => {
                    console.log("API request failed", err);
                })
            setFilteredSpaceShipData(data);
        }
        searchBarFilter();
    }, [baseUrl]);

    console.log(filteredSpaceShipData);
    console.log(selectedFilters);

    return (
        < div className='searchBarSpaceShipsContainer'>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.modelYear}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, modelYear: value })}
                    placeholder="Model Yılı"
                    options={modelYearOptions}
                />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.maxNumberOfPassengers}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, maxNumberOfPassengers: value })}
                    placeholder="Koltuk Numarası"
                    options={seatNumberOptions}
                />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.ageLimit}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, ageLimit: value })}
                    placeholder="Yaş Sınırı"
                    options={ageLimitOptions}
                />
            </div>
        </div >
    )
}