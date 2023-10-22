import React, { useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Input, Button, Table, Select } from 'antd';
import { ModelComponent } from '../ModalComponent/ModalComponent';

export function TableListComp({ pageSearchType, props }) {
    const [page, setPage] = useState(1);
    const [modelContent, setModelContent] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

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
                        <Select
                            value={selectedFilters.userRoleType}
                            onChange={(value) => setSelectedFilters({ ...selectedFilters, userRoleType: value })}
                            placeholder="User Role"
                            options={roleOptions}
                        />
                        <Select
                            value={selectedFilters.isActive}
                            onChange={(value) => setSelectedFilters({ ...selectedFilters, isActive: value })}
                            placeholder="User Status"
                            options={activeOptions}
                        />
                    </div>
                );
            case 'planets':
                return (
                    <div className='search-filter-container'>

                    </div>
                );
            case 'expedition':
                return (
                    <div className='search-filter-container'>

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
                    <Button className='add-btn' type="text" onClick={() => showModall(pageSearchType)}>Add New User</Button>
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
                <ModelComponent isModalVisible={isModalVisible} onCancel={handleCancel} modalContent={modelContent} />
            </div>
        </div>
    )
}
