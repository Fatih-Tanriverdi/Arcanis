import { Select } from 'antd';
import React, { useState } from 'react';
import "./SearchBarPlanets.css";

export default function SearchBarPlanets() {

    const [selectedFilters, setSelectedFilters] = useState({});

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

    return (
        <div className='searchBarPlanetsContainer'>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.sequence}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, sequence: value })}
                    placeholder="Sıra Numarası"
                    options={seatNumberOptions}
                />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.difficultyLevel}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, difficultyLevel: value })}
                    placeholder="Zorluk Seviyesi"
                    options={ageLimitOptions}
                />
            </div>
        </div>
    )
}
