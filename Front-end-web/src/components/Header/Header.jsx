import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { ThemeContext } from '../../contexts/ThemeContext'; // Ajuste o caminho conforme seu projeto

const Header = ({ goto, title, logo }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Pega o tema do contexto

  const vaipara = () => {
    navigate(goto);
  };

  const buttonColor = theme === 'Claro' ? 'primary' : 'error';
  const homeBgColor = theme === 'Claro' ? 'primary.main' : 'error.main';

  return (
    <div className="
        d-flex justify-content-between align-content-center 
        p-3 border-bottom shadow rounded caixota">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Button 
          onClick={vaipara} 
          variant="contained" 
          color={buttonColor} 
          className="fw-medium shadow"
        >
          Voltar
        </Button>
        <span className="fw-bold h2">{title}</span>
        <Avatar sx={{ bgcolor: homeBgColor }}>
          <HomeIcon />
        </Avatar>
      </Box>
    </div>
  );
};

export default Header;
