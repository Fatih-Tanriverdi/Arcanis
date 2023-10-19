import React, { useState } from 'react';
import '../TableListComp/TableListComp.css';
import { Input, Button, Table } from 'antd';
import { ModelComponent } from '../ModalComponent/ModalComponent';

export function TableListComp(props) {
    const [page, setPage] = useState(1);
    const [modelContent, setModelContent] = useState("");
    const [pageSize, setPageSize] = useState(10);
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
        setSearchText(e.target.value);
    };

    return (
        <div className='listCompContainer'>
            <div className="listBtn">
                <div className='table-list-head'>
                    <Button className='add-btn' type="text" onClick={() => showModall(props.text)}>Add New User</Button>
                    <div className='input-user-group'>
                        <span>Search: </span>
                        <Input
                            className='search-input'
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className='table'>
                    <Table
                        columns={props.columns}
                        dataSource={props.dataSource}
                        pagination={{
                            current: page,
                            pageSize: pageSize,
                            total: 100,
                            onChange: (page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }
                        }}
                    />
                </div>
                <ModelComponent isModalVisible={isModalVisible} onCancel={handleCancel} modalContent={modelContent} />
            </div>
        </div>
    )
}
