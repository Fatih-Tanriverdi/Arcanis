import React from 'react';
import "../cssfield/Orders.css";
import { Select, Space, Tag, Table, Pagination, Input, Button, DatePicker } from 'antd';
import { useState } from 'react';
import AdminPanel from './AdminPanel';

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const { RangePicker } = DatePicker;

const showTotal = (total) => `Total ${total} items`;

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
        sorter: (record1, record2) => {
            return record1.age > record2.age
        }
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


export default function Orders() {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
        <body id='user-list-body'>
            <div className='search-bar'>
                <h1>Search Filter</h1>
                <Space direction="vertical" size={12}>
                    <RangePicker style={{
                        width: 320,
                    }} />
                </Space>
                <Space>
                    <Select
                        defaultValue="Select Role"
                        style={{
                            width: 320,
                            marginLeft: 35,
                            marginBottom: 20,
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
                    <Select
                        defaultValue="Select Plan"
                        style={{
                            width: 320,
                            marginLeft: 25,
                            marginRight: 25,
                            marginBottom: 20,
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
                    <Select
                        defaultValue="Select Status"
                        style={{
                            width: 320,
                            marginBottom: 20,
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
                </Space>
            </div>
            <div className='list-group'>
                <div className='show-entries'>
                    <span> Show</span>
                    <Space>
                        <Select
                            defaultValue='10'
                            style={{
                                width: 60,
                            }}
                        />
                    </Space>
                    <span> entries</span>
                </div>
                <Button className='add-btn' type="text">Add New User</Button>
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
                            total: 500,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }
                        }}
                    />
                </div>
            </div>
        </body>
    )
}
