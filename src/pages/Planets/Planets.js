import React, { useEffect } from 'react'
import "./Planets.css";
import { PlanetCard } from '../../components/PlanetCard/PlanetCard';
import { checkToken } from '../../services/AuthService';

export default function SpaceShips() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <container className='space-ship-col'>
            <article className='planets-container'>
                <h1 id='planets-title'>Planets</h1>
                <div className='planet-list'>
                    <PlanetCard />
                </div>
            </article>
        </container>
    )
}

