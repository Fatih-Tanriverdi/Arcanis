import { DatePicker, Select } from 'antd';
import React from 'react';
import './SearchBarItem.css';
const { RangePicker } = DatePicker;

export function SearchDropdown(props) {
    return (
        <div className='SelectRolePosition'>
            <Select
                defaultValue="Select Role"
                style={{
                }}
                onChange={props.onChange}
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                ]}
            />
        </div>
    )
}

export function SearchRangePicker() {
    return (
        <div className='RangePickerPosition'>
            <RangePicker id='range-picker-userlist'
                style={{
                    backgroundColor: "transparent",
                    color: "white",
                    borderColor: "#858B9B"
                }}
            />
        </div>
    )
}
