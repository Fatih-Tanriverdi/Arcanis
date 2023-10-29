import React, { useEffect, useState } from 'react';
import "./MainPage.css";
import { checkToken } from '../../services/AuthService';
import { TfiStatsUp } from 'react-icons/tfi';
import { FiDollarSign } from 'react-icons/fi';
import { LiaUserSolid } from 'react-icons/lia';
import { BiCube } from 'react-icons/bi';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Popover, Progress, Space } from 'antd';
import { fetchUsersDataGet } from "../../services/UserService";
import { fetchPlanetsGet } from '../../services/PlanetService';
import { fetchExpenditionsGet } from '../../services/ExpeditionService';

export default function MainPage() {

    const [usersMostTicketsData, setUsersMostTicketsData] = useState([]);
    const [planetsMostPopulerData, setPlanetsMostPopulerData] = useState([]);
    const [expeditionsTotalCompleted, setExpeditionsTotalCompleted] = useState([]);

    useEffect(() => {
        checkToken();
    }, []);

    const progresColor = [
        { color: '#7366F0' },
        { color: '#00CEE7' },
        { color: '#EA5354' },
        { color: '#29C76F' },
    ];

    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };
    /* Ticket */
    useEffect(() => {
        async function fetchUsersMostTicketsData() {
            const url = "http://lambalog.com/api/statistics/users-who-purchased-most-tickets";
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUsersMostTicketsData(data);
        }
        fetchUsersMostTicketsData();
    }, []);

    const handleRefreshUsersMostTickets = async () => {
        const url = "http://lambalog.com/api/statistics/users-who-purchased-most-tickets";
        const data = await fetchUsersDataGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setUsersMostTicketsData(data);
    };
    /* Ticket */
    /* Expedetion */
    useEffect(() => {
        async function fetcTotalExpeditionsData() {
            const url = "http://lambalog.com/api/statistics/completed-expeditions";
            const data = await fetchExpenditionsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setExpeditionsTotalCompleted(data);
        }
        fetcTotalExpeditionsData();
    }, []);

    const handleRefreshExpeditions = async () => {
        const url = "http://lambalog.com/api/statistics/completed-expeditions";
        const data = await fetchExpenditionsGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setExpeditionsTotalCompleted(data);
    };
    /* Expedetion */
    /* Planet */
    useEffect(() => {
        async function fetchUsersMostPlanetsData() {
            const url = "http://lambalog.com/api/statistics/most-traveled-planet";
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setPlanetsMostPopulerData(data);
        }
        fetchUsersMostPlanetsData();
    }, []);

    const handleRefreshPlanetsMostPopular = async () => {
        const url = "http://lambalog.com/api/statistics/most-traveled-planet";
        const data = await fetchPlanetsGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setPlanetsMostPopulerData(data);
    };
    /* Planet */

    return (
        <container className='main-page-container' >
            <div className='main-page-body'>
                <div className='mainPageTitle'>
                    <h3>Anasayfa</h3>
                    <p>Updated 1 month ago</p>
                </div>
                <div className='mainPageBodyContent'>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>230</h1>
                            <p>Total Space Vehicles</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-2 svgColor-2'>
                            <LiaUserSolid />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>8.549k</h1>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-3 svgColor-3'>
                            <BiCube />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>1.423k</h1>
                            <p>Total Tickets</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>$9745</h1>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>230k</h1>
                            <p>Total Planets</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>230k</h1>
                            <p>Total Expeditions</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>$9745</h1>
                            <p>Total Monthly Revenue</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>$9745</h1>
                            <p>Total Daily Revenue</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPageBoxContainer'>
                <div className='mainPageBox1'>
                    <div className='mainPageBoxTitle'>
                        <h5>Top 5 Most Traveled Users</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste en çok seyahat eden 5 kullanıcımızın listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <a onClick={handleRefreshUsersMostTickets}><BiRefresh className='mainPageSvg' /></a>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        {usersMostTicketsData.map(ticketData => (
                            <div className='mainPageBoxUsersInfo' key={ticketData.id}>
                                <h5>{ticketData.name}</h5>
                                <div className='mainPageBoxUsersInfoSpinner'>
                                    <p>{ticketData.value} - {ticketData.rate.toFixed(1)}%</p>
                                    <Space size={30}>
                                        <Progress type="circle" percent={ticketData.rate} size={20} strokeColor={progresColor} />
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mainPageBox2'>
                    <div className='mainPageBoxTitle'>
                        <h5>Completed Expeditions</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste, firmamızın şu ana kadar yaptığı ve tamamladığı bütün seyahatlerin listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <a onClick={handleRefreshExpeditions}><BiRefresh className='mainPageSvg' /></a>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        <div className='mainPageExpeditionsBody'>
                            <Space wrap>
                                {expeditionsTotalCompleted && expeditionsTotalCompleted.rate !== undefined ? (
                                    <Progress type="dashboard" percent={expeditionsTotalCompleted.rate.toFixed(2)} strokeColor={conicColors} />
                                ) : (
                                    <Progress type="dashboard" percent={0} strokeColor={conicColors} />
                                )}
                            </Space>
                        </div>
                    </div>
                    <div className='mainPageExpeditionsFooter'>
                        <div className='mainPageExpeditionsCompleted'>
                            <p>Completed</p>
                            <h1>{expeditionsTotalCompleted.completedExpeditionCount}</h1>
                        </div>
                        <div className='mainPageExpeditionsProgress'>
                            <p>In Propgress</p>
                            <h1>{expeditionsTotalCompleted.activeExpeditionCount}</h1>
                        </div>
                    </div>
                </div>
                <div className='mainPageBox3'>
                    <div className='mainPageBoxTitle'>
                        <h5>Top 5 Visited Planets</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste en çok seyahat edilen 5 Gezegenin listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <a onClick={handleRefreshPlanetsMostPopular}><BiRefresh className='mainPageSvg' /></a>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        {planetsMostPopulerData.map(planetData => (
                            <div className='mainPageBoxUsersInfo' key={planetData.id}>
                                <h5>{planetData.name}</h5>
                                <div className='mainPageBoxUsersInfoSpinner'>
                                    <p>{planetData.value} - {planetData.rate.toFixed(1)}%</p>
                                    <Space size={30}>
                                        <Progress type="circle" percent={planetData.rate} size={20} strokeColor={progresColor} />
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </container>
    )
}
