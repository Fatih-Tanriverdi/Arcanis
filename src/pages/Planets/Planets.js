import React, { useEffect } from 'react'
import "./Planets.css";
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { checkToken } from '../../services/AuthService';

export default function SpaceShips() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <container>
            <section>
                <div>
                    <div className='space-ship-col' sm={12} md={8} lg={8}>
                        <article className='planets-container'>
                            <div className='product-list'>
                                <h1 id='planets-title'>Planets</h1>
                                <ProductCard />
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </container>
    )
}

