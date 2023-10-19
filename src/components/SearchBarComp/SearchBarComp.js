import React from 'react';
import '../SearchBarComp/SearchBarComp.css';
import { DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;

export function SearchBarComp({ pageSearchType }) {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
    }

    const ageLimitOptions = [];
    for (let age = 1; age <= 100; age++) {
        ageLimitOptions.push({
            value: age.toString(),
            label: age.toString()
        })
    }

    const getSearchContent = () => {
        switch (pageSearchType) {
            case 'spaceShips':
                return (
                    <div className='search-filter-container'>
                        <div className='SelectRolePosition'>
                            <Select
                                defaultValue="Model Years"
                                style={{
                                }}
                                onChange={handleChange}
                                options={modelYearOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                defaultValue="Seat Number"
                                style={{
                                }}
                                onChange={handleChange}
                                options={seatNumberOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                defaultValue="Age Limit"
                                style={{
                                }}
                                onChange={handleChange}
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
                                defaultValue="Role"
                                style={{
                                }}
                                onChange={handleChange}
                                options={roleOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                defaultValue="Active"
                                style={{
                                }}
                                onChange={handleChange}
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
                                defaultValue="Sıra"
                                style={{
                                }}
                                onChange={handleChange}
                                options={ageLimitOptions}
                            />
                        </div>
                        <div className='SelectRolePosition'>
                            <Select
                                defaultValue="Level"
                                style={{
                                }}
                                onChange={handleChange}
                                options={ageLimitOptions}
                            />
                        </div>
                    </div>
                );
            case 'expedition':
                return (
                    <div className='search-filter-container'>
                        <RangePicker />
                        <RangePicker />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='search-bar'>
            <div className='search-bar-item-top'>
                <h1>Search Filter</h1>
                {getSearchContent()}
            </div>
        </div>
    );
}
