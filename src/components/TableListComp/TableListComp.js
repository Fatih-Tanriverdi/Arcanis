import { Table } from 'antd';
import React, { useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Tag, Space } from 'antd';

const columns = [
    {
        title: 'USER',
        dataIndex: 'user',
        key: 'user',
        render: (text) => <a href="none">{text}</a>
    },
    {
        title: 'EMAIL',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'PLAN',
        dataIndex: 'plan',
        key: 'plan'
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
                <a href="none">:</a>
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

export function TableListComp() {

    const [loading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
        <div className='table'>
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: 20,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    }
                }}
            />
        </div>
    )
}
