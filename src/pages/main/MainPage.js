import React, { useEffect } from 'react'
import "./MainPage.css";
import { Container, Row, Col } from 'react-grid-system';
import { checkToken } from '../../services/AuthService';

export default function MainPage() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <>
            <Container className='main-page-body' >
                <Row className='main-page-container'>
                    <Col sm={12} md={8} lg={8} >
                        {/* Tam genişlikte içerik */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
