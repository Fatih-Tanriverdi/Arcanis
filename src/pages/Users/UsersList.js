import "./UsersList.css";
import { useEffect, useState } from 'react';
import { checkToken } from "../../services/authService";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteUsers, fetchUsersDataGet } from "../../services/userService";
import { RiArrowRightSLine } from 'react-icons/ri';
import EditUserModal from "../../components/EditModal/EditUserModal";
import Config from "../../config-file.json"
import buildQuery from 'odata-query';
import { Button, Select } from "antd";

export default function UsersList() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [usersFiltersData, setUsersFiltersData] = useState([]);
    const [userRoleType, setUserRoleType] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [totalPageCount, setTotalPageCount] = useState(1);

    const columns = [
        {
            key: 'Id',
            dataIndex: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditUser(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'İsim',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Soyisim',
            dataIndex: 'Surname',
            key: 'Surname',
        },
        {
            title: 'Mail Adresi',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Telefon',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'Username',
            key: 'Username',
        },
        {
            title: 'Durumu',
            dataIndex: 'IsActive',
            key: 'IsActive',
            render: (value) => {
                if (value === true) {
                    return 'Aktif';
                } else if (value === false) {
                    return 'Aktif Değil';
                } else {
                    return 'Belirsiz';
                }
            },
        },
        {
            title: 'Rolü',
            dataIndex: 'UserRoleType',
            key: 'UserRoleType',
            render: (value) => {
                if (value === 'Admin') {
                    return 'Yönetici';
                } else if (value === 'Customer') {
                    return 'Müşteri';
                } else {
                    return 'Belirsiz';
                }
            },
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata]);

    const userRole = {
        Admin: "Yönetici",
        Customer: "Müşteri"
    };

    const userActive = {
        Aktif: true,
        Pasif: false
    }

    const handleDeleteUser = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteUsers(Id)
            .then(() => {
                setUsersFiltersData((prevUsersFilterData) =>
                prevUsersFilterData.filter((user) => user.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditUser = (Id) => {
        const userToEdit = usersFiltersData.find(user => user.Id === Id);
        setSelectedUser(userToEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    async function handleFilterButtonClick() {
        const isActiveValue = isActive;
        const userRoleTypeValue = userRoleType;

        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;
        const filters = {};

        if (isActiveValue != null) {
            filters.IsActive = isActiveValue;
        }

        if (userRoleTypeValue != null) {
            filters.UserRoleType = userRoleTypeValue;
        }

        const queryWithPaging = buildQuery({ filter: filters, count, top, skip });
        const url = `${Config.SERVICE_URL}/users${queryWithPaging}`;
        try {
            const data = await fetchUsersDataGet(url);
            if (data && data["@odata.count"] !== undefined) {
                const totalPageCount = Math.ceil(data["@odata.count"]);
                setTotalPageCount(totalPageCount);
                setUsersFiltersData(data.value);
            } else {
                console.error("Invalid API response:", data);
            }
        } catch (err) {
            console.error("API request failed", err);
        }
    }

    return (
        <div className='userListContainer'>
            <div className='searchBarUsersContainer'>
                <div className='searchBarTitle'>
                    <h1>Kullanıcı Filtrele</h1>
                </div>
                <div className='SelectRolePosition'>
                    <div className='searchInput'>
                        <Select
                            className='SearchBarUserRoleInput'
                            value={userRoleType}
                            onChange={(value) => setUserRoleType(value)}
                            placeholder="Kullanıcı Rolü"
                        >
                            {Object.entries(userRole).map(([key, value]) => (
                                <Select.Option key={key} value={key}>
                                    {value}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className='searchInput'>
                        <Select
                            className='SearchBarUserRoleInput'
                            value={isActive}
                            onChange={(value) => setIsActive(value)}
                            placeholder="Kullanıcı Durumu"
                        >
                            {Object.entries(userActive).map(([key, value]) => (
                                <Select.Option key={key} value={value}>
                                    {key}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <div className='userListBody'>
                <TableListComp props={{ columns: columns, dataSource: usersFiltersData && usersFiltersData.length ? usersFiltersData : null }} text="users" pageSearchType={"users"} addButtonLabel={"Kullanıcı Ekle"} addFilterName={"Kullanıcı Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditUserModal user={selectedUser} onCancel={handleModalClose} visible={isModalOpen} pageType={"users"} addEditTitle={"Kullanıcı Güncelleme"} userDelete={handleDeleteUser} />
                )}
            </div>
        </div>
    );
}