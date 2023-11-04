import { DatePicker, Select } from 'antd';
import React, { useState } from 'react';
import "./SearchBarTicketAdmin.css";

export default function SearchBarTicketAdmin() {

    const [selectedFilters, setSelectedFilters] = useState({});

    const ageLimitOptions = [];
    for (let age = 1; age <= 100; age++) {
        ageLimitOptions.push({
            value: age.toString(),
            label: age.toString()
        })
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className='searchBarTicketsContainer'>
            <div className='SelectRolePosition'>
                <DatePicker onChange={onChange} placeholder='Oluşturma Tarihi' />
            </div>
            <div className='SelectRolePosition'>
                <DatePicker onChange={onChange} placeholder='Sipariş Tarihi' />
            </div>
            <div className='SelectRolePosition'>
                <Select
                    value={selectedFilters.difficultyLevel}
                    onChange={(value) => setSelectedFilters({ ...selectedFilters, difficultyLevel: value })}
                    placeholder="Koltuk Numarası"
                    options={ageLimitOptions}
                />
            </div>
        </div>
    )
}