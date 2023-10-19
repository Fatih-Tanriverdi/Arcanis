import "../Users/UsersList.css";
import { useEffect, useState } from 'react';
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp";
import { checkToken } from "../../services/AuthService";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteUsers, fetchUsersDataGet, putUsers } from "../../services/UserService";
import UserDropdownMenu from "../../components/UserDropdownMenu/UserDropdownMenu";
import EditUserModal from "../../components/EditModal/EditUserModal";

export default function UsersList() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const columns = [
        {
            title: 'EDIT',
            key: 'id',
            dataIndex: 'id',
            render: (id, record) => (
                <UserDropdownMenu
                    onEditClick={() => handleEditUser(id)}
                    onDeleteClick={() => handleDeleteUser(id)}
                />
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
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
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            key: 'username',
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
                }
            },
        },
        {
            title: 'ROLE',
            dataIndex: 'userRoleType',
            key: 'userRoleType',
            render: (text) => {
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
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
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

    const handleEditUser = (id) => {
        const userToEdit = usersData.find(user => user.id === id);
        setSelectedUser(userToEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const updateUser = (id, updatedData) => {
        putUsers(id, updatedData)
            .then((responseData) => {
                console.log('Kullanıcı güncellendi:', responseData);
                setIsModalOpen(false);
                setUsersData(responseData);
            })
            .catch(error => {
                console.error('Güncelleme isteği başarısız oldu:', error);
            });
    };

    return (
        <div className='user-list-container'>
            <div className='user-list-body'>
                <div className="search-bar-user-container">
                    <SearchBarComp pageSearchType={"users"}/>
                </div>
                <div className='list-group-container'>
                    <TableListComp columns={columns} dataSource={usersData} text="users"/>
                    {isModalOpen && (
                        <EditUserModal user={selectedUser} onSave={updateUser} onCancel={handleModalClose} visible={isModalOpen} pageType={"users"}/>
                    )}
                </div>
            </div>
        </div>
    );
}
