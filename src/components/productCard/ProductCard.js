import { useEffect, useState } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export function ProductCard({ defaultImage }) {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('access-token');
        fetch("http://lambalog.com/api/planets", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        })
            .then(response => response.json())
            .then(data => setPlanets(data))
    }, [])

    return (
        <>
            {planets.map(planet => (
                <div className='product-card' key={planet.id}>
                    <div className='comment-rocket'>
                        <h2>{planet.name}</h2>
                        <p className='product-description'>{planet.description}</p>
                        <div>
                            <Link to="productdetails" className='product-btn-group'>
                                <button >Detaylı İncele</button>
                            </Link>
                        </div>
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


