import React, { useState, useEffect } from 'react';
import immagineLogo from '../img/immagineLogo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavbarComp() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className={`nav sticky-top ${scrolled ? 'bg-danger' : 'bg-light'}`} style={{ transition: 'background-color 1s' }}>
      <Container>
        <Navbar.Brand href="/" className='nav-link text-warning fw-bold'>
          <img
            alt=""
            src={immagineLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '} 
          API DI WORDPRESS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className={`nav-link ${scrolled ? 'text-light' : 'text-dark'}`}>Home</Link>
            <Link to={"/categories"} className={`nav-link ${scrolled ? 'text-light' : 'text-dark'}`}>Categorie</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
