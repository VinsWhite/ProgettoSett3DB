import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const DetailArticleComp = ({ article, authors, categories, onGoBack }) => {
    return (
        <Container className='pt-5'>
            <Card>
                <Card.Body>
                    <Card.Title className='fw-semibold text-primary d-flex justify-content-between'>
                        {article.title.rendered} 
                        <ArrowLeft className='titleArticle text-dark arrow' onClick={onGoBack} />
                    </Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
                    <div className='border-top border-dark pt-2'>
                        <p className='text-secondary'> <span className='fw-semibold'>Autore: </span>{authors[article.author]?.name}</p>
                        <p className='text-secondary'> <span className='fw-semibold'>Categoria: </span>{categories[article.categories]?.name}</p>
                        <p className='text-secondary'> <span className='fw-semibold'>Data: </span>{article.date}</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailArticleComp;
