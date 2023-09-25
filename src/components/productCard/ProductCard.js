import React from 'react';
import '../productCard/ProductCard.css';

export function ProductCard(props) {
    return (
        <div className='product-card'>
            <div className='comment-rocket'>
                <h2>Falcon-9 Space Rocket</h2>
                <span>Falcon 9 is a reusable, two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of people and payloads into Earth orbit and beyond. Falcon 9 is the world’s first orbital class reusable rocket. Reusability allows SpaceX to refly the most expensive parts of the rocket, which in turn drives down the cost of space access.
                </span>
                <div className='btn-group'>
                    <span id='rocket-price'>500.000 $</span>
                    <button href='/'>Hemen Kirala</button>
                </div>
            </div>
            <div className='rocket-img'>
                <img alt='none' src='/images/falcon-9.jpeg' />
            </div>
        </div>
    )
}
