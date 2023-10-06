import "../Users/UsersList.css";
import { Select, Space, Input, Button, DatePicker, Modal, InputNumber } from 'antd';
import { TiTimes } from 'react-icons/ti';
import { AiOutlineSave } from "react-icons/ai";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Container } from 'react-grid-system';
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
        <body id='user-list-body'>
            <Container id='user-list-body'>
                <div className='container'>
                    <SearchBarComp />
                    <div className='list-group'>
                        <Button className='add-btn' type="text" onClick={showModal}>Add New User</Button>
                        <div className='input-user-group'>
                            <span>Search: </span>
                            <Input className='search-input' />
                        </div>
                        <TableListComp />
                    </div>
                    <Modal
                        open={open}
                        title="Yeni Kullanıcı Ekle"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <div id='modal-footer-button-style'>
                                <Button style={{ backgroundColor: "#11B76A" }} key="back" onClick={handleCancel}>
                                    <div>
                                        <TiTimes style={{ color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        <span style={{ color: "white" }}>Vazgeç</span>
                                    </div>
                                </Button>
                                <Button type='primary' key="submit" loading={loading} onClick={handleOk}>
                                    <div>
                                        <AiOutlineSave style={{ color: "white", fontSize: "15px", marginRight: "5px" }} />
                                        <span>Kaydet</span>
                                    </div>
                                </Button>
                            </div>
                        ]}
                    >
                        <Space direction="vertical" id='date-picker-body'>
                            <div className='modal-list'>
                                <div className='modal-usarname-style'>
                                    <h5>Username</h5>
                                    <Input
                                        id='modal-username-style-input' style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }}
                                        placeholder="Enter your username"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                    />
                                </div>
                                <div className='datepicker-style'>
                                    <h5>Kayıt Tarihi</h5>
                                    <DatePicker placeholder='01.01.2023' style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }} onChange={onChange} id='date-picker-style' />
                                </div>
                                <div className='input-number-style'>
                                    <InputNumber placeholder='0' style={{ marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} onChange={onChange} />
                                </div>
                                <div className='modal-dropdown-container'>
                                    <h5>Plan</h5>
                                    <Select
                                        id='modal-dropdown-button'
                                        defaultValue="Select Plan"
                                        style={{
                                            color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px", width: "220px",
                                        }}
                                        onChange={handleChange}
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
                                <div className='modal-textbox-container'>
                                    <h5>E-mail Adres</h5>
                                    <Input placeholder="admin@gmail.com" style={{ color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} />
                                </div>
                                <div className='modal-role-dropdown-container'>
                                    <h5>Role</h5>
                                    <Select
                                        id='modal-dropdown-button'
                                        defaultValue="Select Role"
                                        style={{
                                            color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px"
                                        }}
                                        onChange={handleChange}
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
                                <div className='input-text-style'>
                                    <h5>Açıklama</h5>
                                    <Input id='modal-comment-style' placeholder=' ' style={{ marginLeft: "10px", marginBottom: "20px ", marginTop: "10px", color: "white" }} showCount maxLength={20} onChange={onChange} />
                                </div>
                                <div className='modal-status-dropdown-container'>
                                    <h5>Status</h5>
                                    <Select
                                        id='modal-dropdown-button'
                                        defaultValue="Select Status"
                                        style={{
                                            color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px"
                                        }}
                                        onChange={handleChange}
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
                            </div>
                        </Space>
                    </Modal>
                </div>
            </Container >
        </body>
    )
}