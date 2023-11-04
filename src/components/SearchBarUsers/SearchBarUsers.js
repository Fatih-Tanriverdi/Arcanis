import { Select } from 'antd';
import React, { useState } from 'react';
import "./SearchBarUsers.css";

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
        <div className='searchBarUsersContainer'>
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
