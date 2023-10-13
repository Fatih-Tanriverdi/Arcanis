import React, { useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Space, Input, Button, DatePicker, Modal, Dropdown, InputNumber, Table } from 'antd';
import { TiTimes } from 'react-icons/ti';
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineSave } from 'react-icons/ai';

export function TableListComp(props) {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [showModal, setShowModal] = useState(null);
    const [open, setOpen] = useState(false);

    const showModall = () => {
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

    return (
        <div className="listBtn">
            <Button className='add-btn' type="text" onClick={showModall}>Add New User</Button>
            <div className='input-user-group'>
                <span>Search: </span>
                <Input className='search-input' />
            </div>
            <div className='table'>
                <Table
                    loading={loading}
                    columns={props.columns}
                    dataSource={props.dataSource}
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
            <div className='modal-style'>
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
                            </Button>,
                            <Button type='primary' key="submit" loading={loading} onClick={handleOk}>
                                <div>
                                    <AiOutlineSave style={{ color: "white", fontSize: "15px", marginRight: "5px" }} />
                                    <span>Kaydet</span>
                                </div>
                            </Button>
                        </div>
                    ]}
                >
                    <div id='modal-container'>
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
                                    <DatePicker placeholder='01.01.2023' style={{ marginLeft: "10px", marginBottom: "20px", marginTop: "10px" }} id='date-picker-style' />
                                </div>
                                <div className='input-number-style'>
                                    <InputNumber placeholder='0' style={{ marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} />
                                </div>
                                <div className='modal-dropdown-container'>
                                    <h5>Plan</h5>
                                    <Dropdown
                                        placement="bottomLeft"
                                    >
                                        <Button placeholder='Garanti BBVA' style={{ color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} id='modal-dropdown-button'>Plan</Button>
                                    </Dropdown>
                                </div>
                                <div className='modal-textbox-container'>
                                    <h5>E-mail Adres</h5>
                                    <Input placeholder="admin@gmail.com" style={{ color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} />
                                </div>
                                <div className='modal-role-dropdown-container'>
                                    <h5>Role</h5>
                                    <Dropdown
                                        placement="bottomLeft"
                                    >
                                        <Button placeholder='Garanti BBVA' style={{ color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} id='modal-dropdown-button'>Role</Button>
                                    </Dropdown>
                                </div>
                                <div className='input-text-style'>
                                    <h5>Açıklama</h5>
                                    <Input id='modal-comment-style' placeholder=' ' style={{ marginLeft: "10px", marginBottom: "20px ", marginTop: "10px", color: "white" }} showCount maxLength={20} />
                                </div>
                                <div className='modal-status-dropdown-container'>
                                    <h5>Status</h5>
                                    <Dropdown
                                        placement="bottomLeft"
                                    >
                                        <Button placeholder='Garanti BBVA' style={{ color: "white", marginLeft: "10px", marginBottom: "20px ", marginTop: "10px" }} id='modal-dropdown-button'>Status</Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </Space>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
