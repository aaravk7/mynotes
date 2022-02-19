import React from 'react';
import Container from 'react-bootstrap/Container';
import Addnote from '../addnote/Addnote';
import Notes from '../notes/Notes';

const Home = () => {
    return (
        <Container className='mt-5'>
            {/* <Addnote /> */}
            <Notes />
        </Container>
    )
}

export default Home