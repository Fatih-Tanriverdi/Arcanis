import React, { useEffect } from 'react';
import "./Orders.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { SearchBarComp } from '../../components/SearchBarComp/SearchBarComp';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

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
        title: 'SIRA',
        dataIndex: 'sequence',
        key: 'sequence',
    },
    {
        title: 'LEVEL',
        dataIndex: 'difficultyLevel',
        key: 'difficultyLevel',
    },
    {
        title: 'SUMMARY DESCRIPTION',
        key: 'summaryDescription',
        dataIndex: 'summaryDescription',
    },
    {
        title: 'DESCRIPTION',
        key: 'description',
        dataIndex: 'description',
        render: (text) => (
            <div className="table-cell">{text}</div>
        ),
    },
];

export default function UsersList() {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function planetsData() {
            const url = "http://lambalog.com/api/planets";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setPlanets(data);
        }
        planetsData();
    }, []);

    return (
        <container className='orders-container'>
            <article className='orders-body'>
                <div className='orders-list'>
                    <SearchBarComp />
                    <TableListComp columns={columns} dataSource={planets} text="planets"/>
                </div>
            </article>
        </container>
    )
}
