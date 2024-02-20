import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons'
import { api } from '../../data/endpoint';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DetailArticleComp from './DetailArticleComp'; 

const ArticlesComp = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState({});
    const [categories, setCategories] = useState({});
    const [selectedArticle, setSelectedArticle] = useState(null); // Stato per l'articolo selezionato

    useEffect(() => {
        axios.get(api + 'posts')
            .then(response => {
                setPosts(response.data);
                const authorIds = response.data.map(post => post.author);
                fetchAuthors(authorIds);
                const categoryIds = response.data.flatMap(post => post.categories);
                fetchCategories(categoryIds);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore:', error);
                setLoading(false);
            });
    }, []);

    const fetchAuthors = async (authorIds) => {
        try {
            const response = await axios.get(api + 'users?include=' + authorIds.join(','));
            const fetchedAuthors = {};
            response.data.forEach(author => {
                fetchedAuthors[author.id] = author;
            });
            setAuthors(fetchedAuthors);
        } catch (error) {
            console.error('Errore durante il recupero degli autori:', error);
        }
    };

    const fetchCategories = async (categoryIds) => {
        try {
            const response = await axios.get(api + 'categories?include=' + categoryIds.join(','));
            const fetchedCategories = {};
            response.data.forEach(category => {
                fetchedCategories[category.id] = category;
            });
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Errore durante il recupero delle categorie:', error);
        }
    };

    // Funzione per gestire il click sull'icona ArrowRight
    const handleClick = (article) => {
        setSelectedArticle(article);
    };

    // Funzione per gestire il ritorno al componente precedente
    const handleGoBack = () => {
        setSelectedArticle(null);
    };

    function renderPosts() {
        if (posts.length === 0) {
            return <p>Non ci sono articoli</p>;
        }

        return (
            <Row>
                <h3 className='fw-semibold'>ARTICOLI:</h3>
                {posts.map(post => (
                    <Col key={post.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className='fw-semibold text-primary d-flex justify-content-between align-items-center'>
                                    <h4 className='titleArticle' onClick={() => handleClick(post)} >{post.title.rendered}</h4>
                                    <ArrowRight className='titleArticle text-dark arrow' onClick={() => handleClick(post)} />
                                </Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                <div className='border-top border-dark pt-2'>
                                    <p className='text-secondary'> <span className='fw-semibold ac'>Autore: </span>{authors[post.author]?.name}</p>
                                    <p className='text-secondary'> <span className='fw-semibold ac'>Categoria: </span>{categories[post.categories]?.name}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }

    return (
        <Container ref={ref} className='mt-4 pt-5 border-top border-dark-subtle'>
            {loading ? (
                <ProgressBar animated now={100} label="Caricamento..." />
            ) : (
                selectedArticle ? ( // Se è stato selezionato un articolo, mostra DetailArticleComp
                    <DetailArticleComp 
                        article={selectedArticle} 
                        authors={authors} 
                        categories={categories} 
                        onGoBack={handleGoBack}
                    />
                ) : (
                    renderPosts()
                )
            )}
        </Container>
    );
});

export default ArticlesComp;
