import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
        <Container fluid className='text-center pt-5 fw-bold'>
            <h1 className='pt-5'>Ehh??? Ma dove sei finito?</h1>
            <p> Pagina non trovata</p>
            <p>Error 404</p>
            <Link to={"/"} className='btn btn-warning text-light fww-semibold'>Torna alla Homepage</Link>
        </Container>
    </>
  )
}
