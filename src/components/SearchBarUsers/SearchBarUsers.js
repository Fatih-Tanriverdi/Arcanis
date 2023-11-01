import { Select } from 'antd';
import React, { useState } from 'react';

export default function SearchBarUsers() {

    const [selectedFilters, setSelectedFilters] = useState({});

    const roleOptions = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Customer' },
    ];

    const activeOptions = [
        { value: true, label: 'Active' },
        { value: false, label: 'Passive' },
    ];

    return (
        <div className='seacrh-bar-filter-container'>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.userRoleType}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, userRoleType: value })}
                    placeholder="Kullanıcı Rolü"
                    options={roleOptions}
                />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.isActive}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, isActive: value })}
                    placeholder="Kullanıcı Durumu"
                    options={activeOptions}
                />
            </div>
        </div>
    )
}
