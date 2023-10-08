import React, { useEffect, useState } from 'react';
import './PlanetDetails.css';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchPlanetDetails } from '../../services/PlanetService';
import { ClipLoader } from 'react-spinners';

export default function PlanetDetails() {
    const [planetDetails, setPlanetDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPlanetDetails(id);
                setPlanetDetails(data);
            } catch (error) {
                console.error("Hata oluştu: ", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <body className='product-global'>
            <div className='product-details-body'>
                <div className='product-details-container'>
                    {planetDetails ? (
                        <div className='planet-details'>
                            <Link to="/customer/planets">
                                <IoIosArrowBack className='planet-details-icon' />
                            </Link>
                            <img alt='none' className='planet-img' src="/images/istockphoto-1053794310-612x612.jpg" />
                            <h1>{planetDetails.name}</h1>
                            <p>{planetDetails.description}</p>
                        </div>
                    ) : (
                        <div className='planet-spinner'><ClipLoader color={"#fff"}/></div>
                    )}
                </div>
            </div>
        </body>
    )
}
