import { Space } from 'antd';
import React from 'react';
import '../SearchBarComp/SearchBarComp.css';
import { SearchDropdown, SearchRangePicker } from '../SearchBarItem/SearchBarItem';

export function SearchBarComp() {

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='search-bar'>
            <div className='search-bar-item'>
                <div className='search-bar-item-top'>
                    <h1>Search Filter</h1>
                </div>
                <div className='search-bar-item-bottom'>
                    <Space>
                        <SearchRangePicker />
                        <SearchDropdown onChange={handleChange} />
                        <SearchDropdown onChange={handleChange} />
                        <SearchDropdown onChange={handleChange} />
                    </Space>
                </div>
            </div>
        </div>
    )
}
