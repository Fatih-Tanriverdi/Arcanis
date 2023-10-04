import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { fetchPlanets } from '../../services/RocketService';

export default function ProductDetails() {
    const [planet, setPlanet] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        async function getPlanetDetails() {
            const planetId = parseInt(productId);

            const data = await fetchPlanets().catch(error => {
                console.error('API request failed:', error);
                return [];
            });
            const selectedPlanet = data.find(p => p.id === planetId);
            if (selectedPlanet) {
                setPlanet(selectedPlanet);
            } else {
                console.error(`Gezegen bulunamadı: ID - ${planetId}`);
            }
        }
        getPlanetDetails();
    }, [productId]);

    return (
        <>
            <div className='product-details-body' key={planet?.id}>
                <div className='product-details-container '>
                    {planet && (
                        <>
                            <img alt='none' src={planet.detailsImgUrl} />
                            <h1>{planet.name}</h1>
                            <p>{planet.description}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
