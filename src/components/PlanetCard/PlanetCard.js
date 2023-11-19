import React, { useEffect, useState } from 'react';
import './PlanetCard.css';
import { Link } from 'react-router-dom';
import { fetchPlanetsGet } from '../../services/PlanetService';
import { ClipLoader } from 'react-spinners';
import Config from "../../config-file.json"

export function PlanetCard({ defaultImage }) {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPlanets() {
            const url = `${Config.SERVICE_URL}/planets`;
            const data = await fetchPlanetsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setPlanets(data);
            setLoading(false);
        }
        getPlanets();
    }, []);

    return (
        <>
            {loading ? (
                <div className='planetCardSpinner'>
                    <div><ClipLoader color={"#fff"} /></div>
                </div>
            ) : (
                planets.map(planet => (
                    <div className='productCardContainer' key={planet.id}>
                        <div className='planetComment'>
                            <h2>{planet.name}</h2>
                            <p className='planetDescription'>{planet.description}</p>
                            <Link to={`/planet/${planet.id}`} className='planetDetailsBtn'>
                                <button>Detaylı İncele</button>
                            </Link>
                        </div>
                        <div className='planetImg'>
                            <img alt='none' src={defaultImage || planet.imageUrl} />
                        </div>
                    </div>
                ))
            )}
        </>
    )
}

PlanetCard.defaultProps = {
    defaultImage: "/images/falcon-9.jpeg",
};