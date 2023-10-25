import React, { useEffect } from 'react';
import "./MainPage.css";
import { checkToken } from '../../services/AuthService';
import { RadialChart, VerticalBarSeries, XYPlot } from 'react-vis';

export default function MainPage() {

    useEffect(() => {
        checkToken();
    }, []); 

    const myData = [
        { angle: 1, label: "1" },
        { angle: 4, label: "2" },
        { angle: 3, label: "3" }
    ];

    const data = [
        { x: 0, y: 8, color: "#0F9399", label: "Paz" },
        { x: 1, y: 5, color: "#79C7E3", label: "Sal" },
        { x: 2, y: 4, color: "#0F9399", label: "Çar" },
        { x: 3, y: 9, color: "#79C7E3", label: "Perş" },
        { x: 4, y: 1, color: "#0F9399", label: "Cum" },
        { x: 5, y: 7, color: "#79C7E3", label: "Cmt" },
        { x: 6, y: 6, color: "#0F9399", label: "Paz" },
    ];

    return (
        <container className='main-page-container' >
            <div className='main-page-body'>
                <div className='main-page-content'>
                    <h1>Anasayfa</h1>
                    <div className='radialChartContainer'>
                        <RadialChart
                            data={myData}
                            width={300}
                            height={300}
                            showLabels={true}
                            labelsRadiusMultiplier={0.8}
                            labelsStyle={{
                                fontSize: 14,
                                fill: 'white'
                            }}
                        />
                    </div>
                    <div className='xyplotContainer'>
                        <XYPlot height={300} width={300}>
                            <VerticalBarSeries data={data} colorType="literal" />
                            {data.map((bar) => (
                                <text key={bar.x}
                                    x={bar.x}
                                    y={bar.y + 100}
                                    textAnchor="middle"
                                    fontSize={14}
                                    fill={bar.color}
                                >
                                    {bar.label}
                                </text>
                            ))}
                        </XYPlot>
                    </div>
                </div>
            </div>
        </container>
    )
}
