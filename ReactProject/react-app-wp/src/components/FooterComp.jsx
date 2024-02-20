import React from 'react'
import Container from 'react-bootstrap/esm/Container'

export default function FooterComp() {
    const today = new Date();
    const year = today.getFullYear();

  return (
    <>
        <Container fluid className='text-center border-top pt-3 pb-2 mt-5 bg-secondary-custom footer'>
            <div className='d-flex justify-content-between align-items-center px-5'>
                <p>&copy; Vincenzo Saccone {year}</p>
                <p>Tutti i diritti riservati</p>
            </div>
        </Container>
    </>
  )
}
