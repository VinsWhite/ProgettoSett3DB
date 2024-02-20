import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { api } from '../../data/endpoint';

const DetailCategoryComp = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Recupera gli articoli della categoria selezionata dall'API
        axios.get(api + 'posts?categories=' + category)
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore durante il recupero degli articoli della categoria:', error);
                setLoading(false);
            });
    }, [category]);

    return (
        <Container className='pt-5'>
            <h4>Articoli nella categoria: {category}</h4>
            {loading ? (
                <p>Caricamento...</p>
            ) : (
                articles.length > 0 ? (
                    <div>
                        {articles.map(article => (
                            <Card key={article.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{article.title.rendered}</Card.Title>
                                    <Card.Text dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>Nessun articolo trovato in questa categoria.</p>
                )
            )}
        </Container>
    );
};

export default DetailCategoryComp;
