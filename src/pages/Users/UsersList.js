import "../Users/UsersList.css";
import { Select, Space, Input, Button, DatePicker, Modal, InputNumber } from 'antd';
import { TiTimes } from 'react-icons/ti';
import { AiOutlineSave } from "react-icons/ai";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { checkToken } from "../../services/AuthService";

export default function UsersList() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <body className='user-list-container'>
            <div className='user-list-body'>
                <div className="search-bar-user-container">
                    <SearchBarComp />
                </div>
                <div className='list-group'>
                    <TableListComp />
                </div>
            </div>
        </body>
    )
}