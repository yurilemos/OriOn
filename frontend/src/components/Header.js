import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = (props) => {
    const { title } = props;
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">{title}</Navbar.Brand>    
            </Container>
        </Navbar>
    )
};

export default Header;