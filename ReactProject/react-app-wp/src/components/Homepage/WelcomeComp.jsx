import React, { useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import wpReactIMG from '../../img/wp_react.png';
import ArticlesComp from '../Homepage/ArticlesComp'

export default function WelcomeComp() {
    const articlesRef = useRef(null);

    return (
        <>
            <Container className='mt-5 border'>
                <Row>
                    <Col xs={12} md={6} className='bg-secondary-custom'>
                        <Card className='border-0 bg-secondary-custom'>
                            <Card.Body>
                                <Card.Title><h1>Benvenuto!</h1></Card.Title>
                                <Card.Text>
                                    Testa con noi le API di Wordpress!
                                    Qui sarà possibile visualizzare tutti gli articoli (se presenti).
                                </Card.Text>
                                <Button 
                                    className='fw-bold' 
                                    variant="warning" 
                                    onClick={() => {
                                        articlesRef.current.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >Inizia!
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <img id='imgWPReact' src={wpReactIMG} alt="immagine wordpress con react" />
                    </Col>
                </Row>
            </Container>
            <ArticlesComp ref={articlesRef} />
        </>
    );
}
