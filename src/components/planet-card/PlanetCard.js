import React, { useEffect, useState } from 'react';
import './PlanetCard.css';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Config from "../../config-file.json"
import { getData } from '../../services/BaseApiOperations';

export function PlanetCard({ defaultImage }) {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPlanets = async () => {
            const url = `${Config.SERVICE_URL}/planets`;
            const data = await getData(url)
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