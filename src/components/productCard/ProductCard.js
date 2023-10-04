import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { fetchPlanets } from '../../services/RocketService';

export function ProductCard({ defaultImage }) {
    const [planets, setPlanets] = useState([]);
    const [setSelectedPlanetId] = useState(null);

    useEffect(() => {
        async function getPlanets() {
            const data = await fetchPlanets().catch(error => {
                console.error('API request failed:', error);
                return [];
            });
            setPlanets(data);
        }
        getPlanets();
    }, []);

    const handlePlanetClick = (planetId) => {
        setSelectedPlanetId(planetId);
    };

    return (
        <>
            {planets.map(planet => (
                <div className='product-card' key={planet.id}>
                    <div className='comment-rocket'>
                        <h2>{planet.name}</h2>
                        <p className='product-description'>{planet.description}</p>
                        <Link to={`/planets/${planet.id}`} className='product-btn-group'>
                            <button onClick={() => handlePlanetClick(planet.id)}>Detaylı İncele</button>
                        </Link>
                    </div>
                    <div className='rocket-img'>
                        <img alt='none' src={defaultImage || planet.imageUrl} />
                    </div>
                </div>
            ))}
        </>
    )
}

ProductCard.defaultProps = {
    defaultImage: "/images/falcon-9.jpeg",
};
