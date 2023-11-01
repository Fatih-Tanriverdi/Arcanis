import { Select } from 'antd';
import React, { useState } from 'react';

export default function SearchBarSpaceShips() {

    const [selectedFilters, setSelectedFilters] = useState({});

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

    return (
        < div className='seacrh-bar-filter-container' >
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
                    value={selectedFilters.seatNumber}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, seatNumber: value })}
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