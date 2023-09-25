import { DatePicker, Select } from 'antd';
import React from 'react';
import './SearchBarItem.css';
const { RangePicker } = DatePicker;

export function SearchDropdown(props) {
    return (
        <div>
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
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'Yiminghe',
                        label: 'yiminghe',
                    },
                    {
                        value: 'disabled',
                        label: 'Disabled',
                        disabled: true,
                    },
                ]}
            />
        </div>
    )
}

export function SearchRangePicker() {
    return (
        <div>
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
