import React, { useState, useEffect } from 'react';
import { Button, Container, FormControl } from 'react-bootstrap';
import { api } from '../../data/endpoint';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import DetailCategoryComp from './DetailCategoryComp';

export default function MainComp() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Recupera le categorie dall'API al caricamento della pagina
        axios.get(api + 'categories')
            .then(response => {
                const categoryNames = response.data.map(category => category.name);
                setCategories(categoryNames);
                setFilteredCategories(categoryNames); // Inizializza le categorie filtrate con tutte le categorie
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore durante il recupero delle categorie:', error);
                setLoading(false);
            });
    }, []);

    // Funzione per gestire la ricerca
    const handleSearch = () => {
        // Effettua la ricerca delle categorie basata sulla query di ricerca
        const results = categories.filter(category =>
            category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(results);
    };

    // Funzione per gestire il dettaglio della categoria
    const handleClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Container className='mt-5'>
            <div>
                <h4>Cerca articoli per categorie!</h4>
                <div className="d-flex">
                    <FormControl
                        className="me-2"
                        placeholder="Cerca"
                        aria-label="Cerca"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        variant='warning'
                        onClick={handleSearch}
                    >
                        Cerca
                    </Button>
                </div>
                {loading ? (
                    <Spinner animation="grow" className="mt-5"/>
                ) : (
                    <div className="mt-5">
                        <ul>
                            {filteredCategories.map((category, index) => (
                                <li key={index} onClick={() => handleClick(category)} style={{cursor: 'pointer'}}>{category}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedCategory && (
                    <DetailCategoryComp category={selectedCategory} />
                )}
            </div>
        </Container>
    );
}
