import React, { useEffect } from 'react';
import "./Expedition.css";
import { useState } from 'react';
import { checkToken } from '../../services/AuthService';
import { SearchBarComp } from '../../components/SearchBarComp/SearchBarComp';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';


export default function UsersList() {
    const [expenditions, setExpenditions] = useState([]);
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
            key: 'name',
        },
        {
            title: 'Expedition Date',
            dataIndex: 'expeditionDate',
            key: 'expeditionDate',
        },
        {
            title: 'Arrival Date',
            dataIndex: 'arrivalDate',
            key: 'arrivalDate',
        },
        {
            title: 'Ticket Price',
            key: 'ticketPrice',
            dataIndex: 'ticketPrice',
        },
        {
            title: 'Space Vehicle Id',
            key: 'spaceVehicleId',
            dataIndex: 'spaceVehicleId',
        },
        {
            title: 'Departure Planet Id',
            key: 'departurePlanetId',
            dataIndex: 'departurePlanetId',
        },
        {
            title: 'Arrival Planet Id',
            key: 'arrivalPlanetId',
            dataIndex: 'arrivalPlanetId',
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function planetsData() {
            const url = "http://lambalog.com/api/expenditions";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
                setExpenditions(data);
        }
        planetsData();
    }, []);

    return (
        <container className='expedition-container'>
            <article className='expedition-body'>
                <div className='expedition-list'>
                    <SearchBarComp />
                    <TableListComp columns={columns} dataSource={expenditions} text="expedition"/>
                </div>
            </article>
        </container>
    )
}
