import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ThemeToggleButton from '../Botoes/TrocarCor';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importe o contexto
import './Navegar.css';

function BasicExample() {
    const { theme } = useContext(ThemeContext); // Use o contexto

    return (
        <Navbar expand="lg" data-bs-theme={theme === 'Claro' ? 'light' : 'dark'}>
            <Container>
                <Navbar.Brand href="#home"><p>Sistema SGM</p></Navbar.Brand>
                <Nav className="ms-auto">
                    <ThemeToggleButton /> {/* Não precisa passar a função aqui */}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
