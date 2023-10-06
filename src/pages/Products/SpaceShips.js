import React, { useEffect } from 'react'
import "../Products/SpaceShips.css";
import { Container, Row, Col } from 'react-grid-system';
import { PlanetCard } from '../../components/PlanetCard/PlanetCard';
import { checkToken } from '../../services/AuthService';

export default function SpaceShips() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <Container>
            <section>
                <Row>
                    <Col className='space-ship-col' sm={12} md={8} lg={8}>
                        <article className='space-vehicle-container'>
                            <div className='product-list'>
                                <h1 id='space-vehicle-title'>Space Ships</h1>
                                <hr />
                                <PlanetCard />
                            </div>
                        </article>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}

