import React, { useEffect, useState } from 'react';
import './PlanetDetails.css';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function PlanetDetails() {
    const [planetDetails, setPlanetDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localStorageToken = localStorage.getItem('access-token');
                const response = await fetch(`http://lambalog.com/api/planets/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorageToken}`
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setPlanetDetails(data);
                } else {
                    console.error("Hata oluştu: ", response.statusText);
                }
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
                        <p>Yükleniyor...</p>
                    )}
                </div>
            </div>
        </body>
    )
}
