import React, { useEffect } from 'react';
import "./MainPage.css";
import { checkToken } from '../../services/AuthService';
import { TfiStatsUp } from 'react-icons/tfi';
import { FiDollarSign } from 'react-icons/fi';
import { LiaUserSolid } from 'react-icons/lia';
import { BiCube } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Progress, Space } from 'antd';

export default function MainPage() {

    useEffect(() => {
        checkToken();
    }, []);

    const progressColor1 = '#7366F0';
    const progressColor2 = '#00CEE7';
    const progressColor3 = '#EA5354';
    const progressColor4 = '#29C76F';
    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };

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
                        <div><BsThreeDotsVertical /></div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Emin Karaarslan</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor1} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Emin Karaarslan</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor2} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Emin Karaarslan</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor3} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Emin Karaarslan</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor4} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Emin Karaarslan</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} />
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mainPageBox2'>
                    <div className='mainPageBoxTitle'>
                        <h5>Completed Expeditions</h5>
                        <div><AiOutlineQuestionCircle /></div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        <div className='mainPageExpeditionsBody'>
                            <Space wrap>
                                <Progress type="dashboard" percent={93} strokeColor={conicColors}/>
                            </Space>
                        </div>
                    </div>
                    <div className='mainPageExpeditionsFooter'>
                        <div className='mainPageExpeditionsCompleted'>
                            <p>Completed</p>
                            <h1>786,617</h1>
                        </div>
                        <div className='mainPageExpeditionsProgress'>
                            <p>In Propgress</p>
                            <h1>13,561</h1>
                        </div>
                    </div>
                </div>
                <div className='mainPageBox3'>
                    <div className='mainPageBoxTitle'>
                        <h5>Top 5 Visited Planets</h5>
                        <div><BsThreeDotsVertical /></div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Mars</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor1} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Jüpiter</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor2} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Venüs</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor3} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Ay</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} strokeColor={progressColor4} />
                                </Space>
                            </div>
                        </div>
                        <div className='mainPageBoxUsersInfo'>
                            <h5>Mars</h5>
                            <div className='mainPageBoxUsersInfoSpinner'>
                                <p>150 - 54.4%</p>
                                <Space size={30}>
                                    <Progress type="circle" percent={50} size={20} />
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    )
}
