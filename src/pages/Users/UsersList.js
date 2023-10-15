import "../Users/UsersList.css";
import { useEffect, useState } from 'react';
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp";
import { checkToken } from "../../services/AuthService";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteUsers, fetchUsersDataGet } from "../../services/UserService";


export default function UsersList() {
    const [usersData, setUsersData] = useState([]);
    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'deleted',
            key: 'deleted',
            render: ( id, record ) => (
                <Link onClick={() => handleDeleteUser(record.id)}><AiOutlineEdit /></Link>
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
                    return 'Aktif';
                } else if (text === false) {
                    return 'Aktif Değil';
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
                    return 'Admin';
                } else if (text === 2) {
                    return 'Customer';
                } else {
                    return 'Unknown';
                }
            },
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function fetchUsersListData() {
            try {
                const url = "http://lambalog.com/api/users";
                const data = await fetchUsersDataGet(url);
                setUsersData(data);
            } catch (error) {
                console.error('API request failed:', error);
            }
        }
        fetchUsersListData();
    }, []);

    const handleDeleteUser = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) {
            return;
        }
        deleteUsers(id)
            .then(() => {
                setUsersData((prevUsersData) =>
                    prevUsersData.filter((user) => user.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    return (
        <body className='user-list-container'>
            <div className='user-list-body'>
                <div className="search-bar-user-container">
                    <SearchBarComp />
                </div>
                <div className='list-group-container'>
                    <TableListComp columns={columns} dataSource={usersData} text="users" />
                </div>
            </div>
        </body>
    );
}
