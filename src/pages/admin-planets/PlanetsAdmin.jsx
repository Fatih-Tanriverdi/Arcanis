import "./PlanetsAdmin.css";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { checkToken } from '../../services/authService';
import { TableListComp } from '../../components/admin-table/TableListComp';
import EditModal from '../../components/edit-modal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import Config from "../../config-file.json"
import { Button, Input, Popover } from 'antd';
import buildQuery from 'odata-query';
import { deleteDataById, getData, putData } from '../../services/BaseApiOperations';

export default function UsersList() {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [squenceFilter, setSquenceFilter] = useState("");
    const [difficultyLevelFilter, setDifficultyLevelFilter] = useState("");
    const [planetsFilteredData, setPlanetsFilteredData] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState(1);

    const columns = [
        {
            title: '',
            key: 'Id',
            dataIndex: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditPlanet(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'GEZEGEN ADI',
            dataIndex: 'Name',
            key: 'user',
        },
        {
            title: 'SIRA',
            dataIndex: 'Sequence',
            key: 'sequence',
        },
        {
            title: 'SEVİYE',
            dataIndex: 'DifficultyLevel',
            key: 'difficultyLevel',
        },
        {
            title: 'DETAYLI AÇIKLAMA',
            key: 'summaryDescription',
            dataIndex: 'summaryDescription',
        },
        {
            title: 'AÇIKLAMA',
            key: 'Description',
            dataIndex: 'Description',
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
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata, planets]);

    const updatePlanets = (Id, updatedData) => {
        const url = `${Config.SERVICE_URL}/planets`;
        const data = updatedData;
        putData(url, data)
            .then((responseData) => {
                console.log('Gezegen güncellendi:', responseData);
                setPlanets(responseData);
            })
            .catch(error => {
                console.error('Güncelleme isteği başarısız oldu:', error);
            });
    };

    const handleDeletePlanet = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        const url = `${Config.SERVICE_URL}/planets/${Id}`;
        deleteDataById(url)
            .then(() => {
                setPlanets((prevPlanetsData) =>
                    prevPlanetsData.filter((planet) => planet.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditPlanet = (Id) => {
        const planetEdit = planetsFilteredData.find(planet => planet.Id === Id);
        setSelectedPlanet(planetEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPlanet(null);
        setIsModalOpen(false);
    };

    const handleFilterButtonClick = async () => {
        const Sequence = parseInt(squenceFilter);
        const DifficultyLevel = parseInt(difficultyLevelFilter);

        const filters = {};
        if (Sequence > 0) {
            filters.Sequence = Sequence;
        }
        if (DifficultyLevel > 0) {
            filters.DifficultyLevel = DifficultyLevel;
        }

        const queryWithPaging = buildQuery({ filter: filters });
        const url = `${Config.SERVICE_URL}/planets${queryWithPaging}`;
        const data = await getData(url)
            .catch(err => {
                console.log("API request failed", err);
            })
        if (data !== undefined && data.value !== null) {
            const totalPageCount = Math.ceil(data["@odata.count"]);
            setTotalPageCount(totalPageCount);
            setPlanetsFilteredData(data.value);
        }
        else {
            setPlanetsFilteredData([]);
        }
    };

    return (
        <container className='planetsContainer'>
            <div className='searchBarPlanetsContainer'>
                <div className='searchBarTitle'>
                    <h1>Gezegen Filtrele</h1>
                </div>
                <div className='SelectRolePosition'>
                    <Input
                        className='SearchBarSpaceShipsInput'
                        value={squenceFilter}
                        onChange={(e) => setSquenceFilter(e.target.value)}
                        placeholder="Sıra Numarası"
                    />
                    <Input
                        className='SearchBarSpaceShipsInput'
                        value={difficultyLevelFilter}
                        onChange={(e) => setDifficultyLevelFilter(e.target.value)}
                        placeholder="Zorluk Seviyesi"
                    />
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <article className='planetsBody'>
                <TableListComp
                    props={{
                        columns: columns,
                        dataSource: planetsFilteredData.length
                            ? planetsFilteredData
                            : planets
                    }}
                    text="planets"
                    pageSearchType={"planets"}
                    addButtonLabel={"Gezegen Ekle"}
                    addFilterName={"Gezegen Filtreleme"}
                    setPageOdata={setPageOdata}
                    setPageSizeOdata={setPageSizeOdata}
                    pageOdata={pageOdata}
                    pageSizeOdata={pageSizeOdata}
                    totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditModal
                        planet={selectedPlanet}
                        onCancel={handleModalClose}
                        onSave={updatePlanets}
                        visible={isModalOpen}
                        pageType={"planets"}
                        addEditTitle={"Gezegen Güncelleme"}
                        planetDelete={handleDeletePlanet} />
                )}
            </article>
        </container>
    )
}