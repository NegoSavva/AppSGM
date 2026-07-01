import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importe o contexto

const LoginButton = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Use o contexto para obter o tema

    const login = () => {
        navigate("/login");
    }

    // Define a cor do botão com base no tema
    const buttonColor = theme === 'Claro' ? 'primary' : 'secondary';

    return (
        <>
            <Button onClick={login} color={buttonColor}>Acesso Restrito</Button>
        </>
    );
};

export default LoginButton;
