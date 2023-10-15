import React, { useEffect, useState } from 'react'
import "../Products/SpaceShips.css";
import { checkToken } from '../../services/AuthService';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { deleteUsers, fetchUsersDataGet } from '../../services/UserService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp"


export default function SpaceShips() {
    const [spaceShipData, setSpaceShipData] = useState([]);

    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (id, record) => (
                <Link onClick={() => handleDeleteUser(record.id)}><AiOutlineEdit /></Link>
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'user',
        },
        {
            title: 'MODEL NAME',
            dataIndex: 'modelName',
            key: 'modelName',
        },
        {
            title: 'MODEL YEARS',
            dataIndex: 'modelYear',
            key: 'modelYear',
        },
        {
            title: 'SERI NO',
            key: 'serialNumber',
            dataIndex: 'serialNumber',
        },
        {
            title: 'SEAT NUMBER',
            key: 'maxNumberOfPassengers',
            dataIndex: 'maxNumberOfPassengers',
        },
        {
            title: 'AGE LIMIT',
            dataIndex: 'ageLimit',
            key: 'ageLimit',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
    ];

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

    const handleDeleteUser = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) {
            return;
        }
        deleteUsers(id)
            .then(() => {
                setSpaceShipData((prevUsersData) =>
                    prevUsersData.filter((user) => user.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    return (
        <container className='space-vehicle-container'>
            <article className='space-vehicle-body'>
                <div className='product-list'>
                    <SearchBarComp />
                    <TableListComp columns={columns} dataSource={spaceShipData} text="spaceShips" />
                </div>
            </article>
        </container>
    )
}

