import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { api } from '../../data/endpoint';

const DetailCategoryComp = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        // Recuperiamo gli articoli della categoria selezionata dall'API
        axios.get(api + 'posts?category=' + category) 
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore durante il recupero degli articoli della categoria:', error);
                setLoading(false);
            });
    }, [category]);

    const handleClick = (article) => {
        setSelectedArticle(article);
    };

    return (
        <Container className='pt-5'>
            <h4>Articoli nella categoria: {category}</h4>
            {loading ? (
                <p>Caricamento...</p>
            ) : selectedArticle ? (
                <div>
                    <button onClick={() => setSelectedArticle(null)}>Torna alla lista</button>
                    <h2>{selectedArticle.title.rendered}</h2>
                    <div dangerouslySetInnerHTML={{ __html: selectedArticle.content.rendered }} />
                </div>
            ) : articles.length > 0 ? (
                <div>
                    {articles.map(article => (
                        <Card key={article.id} className="mb-3">
                            <Card.Body>
                                <Card.Title className='titleArticle' onClick={() => handleClick(article)}>{article.title.rendered}</Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>Nessun articolo trovato in questa categoria.</p>
            )}
        </Container>
    );    
};

export default DetailCategoryComp;
