import "./UsersList.css";
import { useEffect, useState } from 'react';
import { checkToken } from "../../services/authService";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteUsers, fetchUsersDataGet } from "../../services/userService";
import { RiArrowRightSLine } from 'react-icons/ri';
import EditUserModal from "../../components/EditModal/EditUserModal";
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';

export default function UsersList() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);
    const baseUrl = APImanager.getBaseURL();
    const columns = [
        {
            key: 'id',
            dataIndex: 'id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditUser(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'İSİM',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'SOYİSİM',
            dataIndex: 'Surname',
            key: 'Surname',
        },
        {
            title: 'E-POSTA',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'TELEFON',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'KULLANICI ADI',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'AKTİF',
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
            title: 'ROL',
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
        const queryWithPaging = buildQuery({
            "top": pageSizeOdata,
            "skip": (pageOdata - 1) * pageSizeOdata,
        });
        async function fetchUsersListData() {
            const url = `${baseUrl}/users${queryWithPaging}`;
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUsersData(data.value);
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

    return (
        <div className='userListContainer'>
            <div className='userListBody'>
                <TableListComp props={{ columns: columns, dataSource: usersData }} text="users" pageSearchType={"users"} addButtonLabel={"Kullanıcı Ekle"} addFilterName={"Kullanıcı Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} />
                {isModalOpen && (
                    <EditUserModal user={selectedUser} onCancel={handleModalClose} visible={isModalOpen} pageType={"users"} addEditTitle={"Kullanıcı Güncelleme"} userDelete={handleDeleteUser} />
                )}
            </div>
        </div>
    );
}