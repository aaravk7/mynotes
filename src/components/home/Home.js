import React from 'react';
import Container from 'react-bootstrap/Container';
import Notes from '../notes/Notes';

const Home = () => {
    return (
        <Container className='mt-5'>
            <Notes />
        </Container>
    )
}

export default Home