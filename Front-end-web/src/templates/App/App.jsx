import React, { useContext } from 'react';
import './App.css';
import Navbar from '../../components/Navbar/Navegacao';
import SectionContent from '../../components/Secoes/SectionContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importar o contexto
import CustomCarousel from '../../components/Carousel/Carousel';

function App() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Usar o contexto para obter o tema

    const login = () => {
        navigate("/login");
    }

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <div className={`opa ${theme === 'Escuro' ? 'dark-theme' : ''}`}>
            <nav>
                <Navbar />
            </nav>
            <div className="container mb-5 ">
                <h1 className="text-center fw-bold m-4">Bem-vindo ao SGM!</h1>
                <section className="uepa">
                    <CustomCarousel />
                    <p>
                         
                    </p>
                </section>
            </div>
            <main className="container">
                <SectionContent />
            </main>
            <footer>
                <Button onClick={login} color={buttonColor}>Acesso Restrito</Button>
            </footer>
        </div>
    );
}

export default App;
