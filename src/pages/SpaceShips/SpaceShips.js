import React, { useEffect, useState } from 'react'
import "./SpaceShips.css";
import { checkToken } from '../../services/authService';
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteRocket, fetchRocketsGet } from '../../services/RocketService';
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Button, Input, Popover, Select } from 'antd';
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';

export default function SpaceShips() {
    const [selectedRocket, setSelectedRocket] = useState(null);
    const [spaceShipData, setSpaceShipData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredSpaceShipData, setFilteredSpaceShipData] = useState([]);

    const [modelYearFilter, setModelYearFilter] = useState("");
    const [maxNumberOfPassengersFilter, setMaxNumberOfPassengersFilter] = useState("");
    const [ageLimitFilter, setAgeLimitFilter] = useState("");

    const baseUrl = APImanager.getBaseURL();

    const columns = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <button className="editButton" onClick={() => handleEditRocket(id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'ARAÇ ADI',
            dataIndex: 'Name',
            key: 'user',
        },
        {
            title: 'MODEL ADI',
            dataIndex: 'ModelName',
            key: 'modelName',
        },
        {
            title: 'MODEL YILI',
            dataIndex: 'ModelYear',
            key: 'modelYear',
        },
        {
            title: 'SERI NUMARASI',
            key: 'SerialNumber',
            dataIndex: 'SerialNumber',
        },
        {
            title: 'KOLTUK NUMARASI',
            key: 'MaxNumberOfPassengers',
            dataIndex: 'MaxNumberOfPassengers',
        },
        {
            title: 'YAŞ SINIRI',
            dataIndex: 'AgeLimit',
            key: 'ageLimit',
        },
        {
            title: 'AÇIKLAMA',
            dataIndex: 'Description',
            key: 'description',
            render: (text) => (
                <div className="table-cell">
                    <Popover content={text}>
                        {text}
                    </Popover>
                </div>
            ),
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function fetchSpaceShipData() {
            const queryWithPaging = buildQuery({
                "top": pageSizeOdata,
                "skip": (pageOdata - 1) * pageSizeOdata,
            });
            const url = `${baseUrl}/space-vehicles${queryWithPaging}`;
            const data = await fetchRocketsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setSpaceShipData(data.value);
        }
        fetchSpaceShipData();
    }, [pageOdata, pageSizeOdata]);

    const handleDeleteRocket = (id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteRocket(id)
            .then(() => {
                setSpaceShipData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((rocket) => rocket.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditRocket = (id) => {
        const rocketEdit = spaceShipData.find(rocket => rocket.id === id);
        setSelectedRocket(rocketEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedRocket(null);
        setIsModalOpen(false);
    };

    async function handleFilterButtonClick() {
        const modelYear = parseInt(modelYearFilter);
        const maxNumberOfPassengers = parseInt(maxNumberOfPassengersFilter);
        const ageLimit = parseInt(ageLimitFilter);
        const filters = {};
        if (modelYear) {
            filters.ModelYear = modelYear;
        }
        if (maxNumberOfPassengers) {
            filters.MaxNumberOfPassengers = maxNumberOfPassengers;
        }
        if (ageLimit) {
            filters.AgeLimit = ageLimit;
        }
        const queryWithFilters = buildQuery({ filter: filters });
        const url = `${baseUrl}/space-vehicles${queryWithFilters}`;
        const data = await fetchRocketsGet(url)
            .catch(err => {
                console.log("API request failed", err);
            });
        setFilteredSpaceShipData(data.value);
    }

    return (
        <container className='spaceVehicleContainer'>
            <div className='searchBarSpaceShipsContainer'>
                <div className='searchBarTitle'>
                    <h1>Uzay Aracı Filtrele</h1>
                </div>
                <div className='searchInputPosition'>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={modelYearFilter}
                            onChange={(e) => setModelYearFilter(e.target.value)}
                            placeholder="Model Yılı"
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={maxNumberOfPassengersFilter}
                            onChange={(e) => setMaxNumberOfPassengersFilter(e.target.value)}
                            placeholder="Koltuk Numarası"
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={ageLimitFilter}
                            onChange={(e) => setAgeLimitFilter(e.target.value)}
                            placeholder="Yaş Sınırı"
                        />
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <article className='spaceVehicleBody'>
                <TableListComp props={{ columns: columns, dataSource: filteredSpaceShipData.length ? filteredSpaceShipData : spaceShipData }} filteredSpaceShipData={filteredSpaceShipData} text="spaceShips" pageSearchType={"spaceShips"} addButtonLabel={"Uzay Aracı Ekle"} addFilterName={"Uzay Aracı Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} />
                {isModalOpen && (
                    <EditModal rocket={selectedRocket} onCancel={handleModalClose} visible={isModalOpen} pageType={"spaceShips"} addEditTitle={"Uzay Aracı Güncelleme"} rocketDelete={handleDeleteRocket} />
                )}
            </article>
        </container>
    )
}