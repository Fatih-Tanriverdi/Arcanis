import React, { useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Input, Button, Table } from 'antd';
import { ModelComponent } from '../ModalComponent/ModalComponent';
import SearchBarSpaceShips from '../SearchBarSpaceShips/SearchBarSpaceShips';
import SearchBarUsers from '../SearchBarUsers/SearchBarUsers';
import SearchBarPlanets from '../SearchBarPlanets/SearchBarPlanets';
import SearchBarExpedition from '../SearchBarExpedition/SearchBarExpedition';
import SearchBarTicketAdmin from '../SearchBarTicketAdmin/SearchBarTicketAdmin';

export function TableListComp({ pageSearchType, props, addButtonLabel, addFilterName, setPageOdata, setPageSizeOdata, pageOdata, pageSizeOdata }) {

    const [modelContent, setModelContent] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    const showModall = (content) => {
        setIsModalVisible(true);
        setModelContent(content);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
    };

    const getSearchContent = () => {
        switch (pageSearchType) {
            case 'spaceShips':
                return (
                    <SearchBarSpaceShips />
                );
            case 'users':
                return (
                    <SearchBarUsers />
                );
            case 'planets':
                return (
                    <SearchBarPlanets />
                );
            case 'expedition':
                return (
                    <SearchBarExpedition />
                );
            case 'ticketAdmin':
                return (
                    <SearchBarTicketAdmin />
                );
            default:
                return null;
        }
    };

    return (
        <div className='listCompContainer'>
            <div className='searchBarItemTop'>
                <h1>{addFilterName}</h1>
                <div className='seacrhBarFilterContainer'>
                    {getSearchContent()}
                    <Button type="text" className="filterBtn" >Filtrele</Button>
                </div>
            </div>
            <div className="listContainer">
                <div className='tableListHead'>
                    <Button className='addBtn' type="text" onClick={() => showModall(pageSearchType)}>{addButtonLabel}</Button>
                    <div className='inputListGroup'>
                        <span>Search: </span>
                        <Input
                            className='searchInput'
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className='tableContainer'>
                    <Table
                        className='tableListBody'
                        columns={props.columns}
                        dataSource={props.dataSource}
                        rowClassName="tableRow"
                        pagination={{
                            total: 100,
                            current: pageOdata,
                            pageSize: pageSizeOdata,
                            onChange: (page, pageSize) => {
                                setPageOdata(page);
                                setPageSizeOdata(pageSize);
                            }
                        }}
                    />
                </div>
                <ModelComponent isModalVisible={isModalVisible} onCancel={handleCancel} modalContent={modelContent} addTitle={pageSearchType === 'spaceShips' ? 'Uzay Aracı Ekle' : pageSearchType === 'users' ? 'Kullanıcı Ekle' : pageSearchType === 'planets' ? 'Gezegen Ekle' : pageSearchType === 'expedition' ? 'Sefer Ekle' : pageSearchType === 'ticketAdmin' ? 'Yeni Bilet Ekle' : ''} />
            </div>
        </div>
    )
}