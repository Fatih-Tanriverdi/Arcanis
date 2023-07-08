import React, { useEffect } from 'react';
import "../cssfield/UsersList.css";
import { Select, Space, Tag, Table, Input, Button, DatePicker, Modal, InputNumber } from 'antd';
import { TiTimes } from 'react-icons/ti';
import { AiOutlineSave } from "react-icons/ai";
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const columns = [
    {
        title: 'USER',
        dataIndex: 'user',
        key: 'user',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'EMAIL',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'PLAN',
        dataIndex: 'plan',
        key: 'plan',
    },
    {
        title: 'ROLE',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'STATUS',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'ACTIONS',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>:</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        user: 'John Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['developer'],
    },
    {
        key: '2',
        user: 'Jim Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['editor'],
    },
    {
        key: '3',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['teacher'],
    },
    {
        key: '4',
        user: 'John Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['developer'],
    },
    {
        key: '5',
        user: 'Jim Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['author'],
    },
    {
        key: '6',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['teacher'],
    },
    {
        key: '7',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['maıntraıner'],
    },
    {
        key: '8',
        user: 'John Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['developer'],
    },
    {
        key: '9',
        user: 'Jim Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['developer'],
    },
    {
        key: '10',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['teacher'],
    },
    {
        key: '11',
        user: 'Emirhan Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['developer'],
    },
    {
        key: '12',
        user: 'Fatih Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['developer'],
    },
    {
        key: '13',
        user: 'Muhammed Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['teacher'],
    },
    {
        key: '14',
        user: 'Kübra Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['developer'],
    },
    {
        key: '15',
        user: 'Jim Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['author'],
    },
    {
        key: '16',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['teacher'],
    },
    {
        key: '17',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['teacher'],
    },
    {
        key: '18',
        user: 'John Brown',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Company',
        tags: ['developer'],
    },
    {
        key: '19',
        user: 'Jim Green',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Enterprise',
        tags: ['developer'],
    },
    {
        key: '20',
        user: 'Joe Black',
        age: 'fmehmettanriverdi@gmail.com',
        plan: 'Teams',
        tags: ['teacher'],
    },



];

export default function UsersList() {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false);

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

    return (
        <body id='user-list-body'>
            <div className='container'>
                <div className='search-bar'>
                    <div className='search-bar-item'>
                        <div className='search-bar-item-top'>
                            <h1>Search Filter</h1>
                        </div>
                        <div className='search-bar-item-bottom'>
                            <Space>
                                <div>
                                    <RangePicker id='range-picker-userlist'
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            borderColor: "#858B9B"
                                        }}
                                    />
                                </div>
                                <div>
                                    <Select
                                        defaultValue="Select Role"
                                        style={{
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
                                <div>
                                    <Select
                                        defaultValue="Select Plan"
                                        style={{
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
                                <div>
                                    <Select
                                        defaultValue="Select Status"
                                        style={{
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
                            </Space>
                        </div>
                    </div>
                </div>
                <div className='list-group'>
                    <Button className='add-btn' type="text" onClick={showModal}>Add New User</Button>
                    <div className='input-user-group'>
                        <span>Search: </span>
                        <Input className='search-input' />
                    </div>
                    <div className='table'>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={data}
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
                        </div>
                    </Modal>
                </div>
            </div>
        </body>
    )
}


