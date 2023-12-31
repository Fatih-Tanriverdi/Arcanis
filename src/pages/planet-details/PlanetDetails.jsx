import React, { useEffect, useState } from 'react';
import './PlanetDetails.css';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';
import Config from "../../config-file.json"
import { getData } from '../../services/BaseApiOperations';

export default function PlanetDetails() {
    const [planetDetails, setPlanetDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${Config.SERVICE_URL}/planets/${id}`
                const data = await getData(url);
                setPlanetDetails(data);
            } catch (error) {
                console.error("Hata oluştu: ", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <body className='planetBodyColor'>
            <div className='planetDetailsContainer'>
                <div className='planetDetailsBody'>
                    {planetDetails ? (
                        <div className='planetDetails'>
                            <Link to="/customer/planets">
                                <IoIosArrowBack className='planetDetailsIcon' />
                            </Link>
                            <img alt='none' className='planetImg' src="/images/istockphoto-1053794310-612x612.jpg" />
                            <h1>{planetDetails.name}</h1>
                            <p>{planetDetails.description}</p>
                        </div>
                    ) : (
                        <div className='planetSpinner'><ClipLoader color={"#fff"} /></div>
                    )}
                </div>
            </div>
        </body>
    )
}