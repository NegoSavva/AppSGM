import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Inicializa direto do localStorage para evitar render inicial errado
    return localStorage.getItem('tema') || 'Claro';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('tema', theme);
  }, [theme]);

  const applyTheme = (theme) => {
    if (theme === 'Escuro') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'Claro' ? 'Escuro' : 'Claro'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
