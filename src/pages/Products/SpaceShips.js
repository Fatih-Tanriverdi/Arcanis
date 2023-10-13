import React, { useEffect, useState } from 'react'
import "../Products/SpaceShips.css";
import { checkToken } from '../../services/AuthService';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { fetchUsersDataGet } from '../../services/UserService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp"

const columns = [
    {
        title: 'EDIT',
        dataIndex: 'deleted',
        key: 'deleted',
        render: () => (
            <Link><AiOutlineEdit /></Link>
        ),
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'user',
    },
    {
        title: 'SURNAME',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'PHONE',
        key: 'phone',
        dataIndex: 'phone',
    },
    {
        title: 'USERNAME',
        key: 'username',
        dataIndex: 'username',
    },
    {
        title: 'ACTIVE',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (text) => {
            if (text === true) {
                return 'Çevrimiçi';
            } else if (text === false) {
                return 'ÇevrimDışı';
            } else {
                return 'Unknown';
            };
        },
    },
    {
        title: 'ROLE',
        dataIndex: 'userRoleType',
        key: 'userRoleType',
        render: (text, record) => {
            if (text === 1) {
                return 'admin';
            } else if (text === 2) {
                return 'customer';
            } else {
                return 'Unknown';
            }
        },
    },
];

export default function SpaceShips() {
    const [spaceShipData, setSpaceShipData] = useState([]);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function spaceShipData() {
            const url = "http://lambalog.com/api/space-vehicles";
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setSpaceShipData(data);
        }
        spaceShipData();
    }, []);

    return (
        <container className='space-vehicle-container'>
            <article className='space-vehicle-body'>
                <div className='product-list'>
                    <SearchBarComp />
                    <TableListComp columns={columns} dataSource={spaceShipData} />
                </div>
            </article>
        </container>
    )
}

