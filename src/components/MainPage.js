import React from 'react'
import "../cssfield/MainPage.css";
import { Container, Row, Col } from 'react-grid-system';

export default function MainPage() {
    return (
        <Container className='main-page-body' >
            <Row className='main-page-container'>
                <Col sm={12} >
                    {/* Tam genişlikte içerik */}
                </Col>
            </Row>
        </Container>
    )
}
