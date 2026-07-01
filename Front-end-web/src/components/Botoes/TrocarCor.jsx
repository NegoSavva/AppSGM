import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importe o contexto
import Button from '@mui/material/Button';

function BotaoTroca() {
    const { theme, toggleTheme } = useContext(ThemeContext); // Use o contexto

    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <Button onClick={toggleTheme} variant='contained' color={buttonColor} sx={{ mt: 2, mb: 2 }}>
            Trocar tema: {theme === 'Claro' ? 'Escuro' : 'Claro'}
        </Button>
    );
}

export default BotaoTroca;
