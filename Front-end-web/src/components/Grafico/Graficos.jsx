import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Segunda', Manha: 4000, Tarde: 2400, Noite: 2300 },
    { name: 'Terça', Manha: 3000, Tarde: 1398, Noite: 2210 },
    { name: 'Quarta', Manha: 2000, Tarde: 9800, Noite: 2290 },
    { name: 'Quinta', Manha: 2780, Tarde: 3908, Noite: 2000 },
    { name: 'Sexta', Manha: 1890, Tarde: 4800, Noite: 2181 }
];

const GraficoComTema = () => {
    const [theme, setTheme] = useState('Claro'); // Estado para armazenar o tema

    // Recupera o tema do localStorage ao montar o componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('tema') || 'Claro'; // Pega o tema salvo
        setTheme(savedTheme); // Atualiza o estado com o tema salvo
    }, []);

    // Definindo as cores com base no tema
    const eixoColor = theme === 'Claro' ? '#000' : '#fff'; // Preto no tema claro, branco no escuro
    const gridColor = theme === 'Claro' ? '#ccc' : '#444'; // Cores da grade

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    padding={{ left: 30, right: 30 }}
                    tick={{ fill: eixoColor }} // Cor dos labels do eixo X
                    stroke={eixoColor} // Cor da linha do eixo X
                />
                <YAxis
                    tick={{ fill: eixoColor }} // Cor dos labels do eixo Y
                    stroke={eixoColor} // Cor da linha do eixo Y
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Manha" stroke="#8884d8" />
                <Line type="monotone" dataKey="Tarde" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Noite" stroke="#0000ff" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default GraficoComTema;
