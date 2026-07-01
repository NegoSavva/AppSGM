import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import CategoriaService from "../../services/CategoriaService";
import { Alert, Button, TextField, Grid, Paper, Box, ButtonGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ThemeContext } from "../../contexts/ThemeContext";

const AlterarCategoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [categoria, setCategoria] = useState({
        id: null,
        nome: "",
        diaServido: "",
    });

    const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        CategoriaService.findById(id)
            .then((response) => {
                setCategoria(response.data);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao buscar cardápio.', type: 'error' });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CategoriaService.update(id, categoria)
            .then(() => {
                setAlerta({ show: true, message: 'cardápio atualizado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/categorialista'), 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao atualizar cardápio.', type: 'error' });
            });
    };

    const inativar = () => {
        CategoriaService.inativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Carrdápio inativado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/categorialista'), 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao inativar cardápio.', type: 'error' });
            });
    };

    const reativar = () => {
        CategoriaService.reativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Categoria reativado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/categorialista'), 2000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao reativar cardápio.', type: 'error' });
            });
    };

    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';
    const paperBackground = theme === 'Claro' ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0, 0.0)'

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/categoria'}
                    title={'Editar Categoria'}
                    logo={logo}
                />

                <section className="m-2 p-2">
                    {alerta.show && (
                        <Alert
                            icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                            severity={alerta.type}
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClose={() => setAlerta({ show: false, message: '', type: '' })}
                        >
                            {alerta.message}
                        </Alert>
                    )}

                    <Paper sx={{ padding: 4, backgroundColor: paperBackground }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        label="ID"
                                        value={categoria.id || ''}
                                        fullWidth
                                        InputProps={{ readOnly: true, style: { color: textColor } }}
                                        InputLabelProps={{ style: { color: textColor } }}
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        label="Nome"
                                        name="nome"
                                        value={categoria.nome}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{ style: { color: textColor } }}
                                        InputLabelProps={{ style: { color: textColor } }}
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        label="Dia"
                                        name="diaServido"
                                        type="text"
                                        value={categoria.diaServido}
                                        onChange={handleChange}
                                        fullWidth
                                        InputProps={{ style: { color: textColor } }}
                                        InputLabelProps={{ style: { color: textColor } }}
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Status"
                                        value={categoria.statusCategoria || ''}
                                        fullWidth
                                        InputProps={{ readOnly: true, style: { color: textColor } }}
                                        InputLabelProps={{ style: { color: textColor } }}
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    {/* Aqui seria o id do prato, que também n sei como fazer kk*/}
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    {categoria.foto && (
                                        <img
                                            src={categoria.foto}
                                            alt="Imagem do Categoria"
                                            style={{
                                                width: '100%',
                                                maxHeight: '250px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                border: `1px solid ${textColor}`
                                            }}
                                        />
                                    )}
                                </Grid>

                                <Grid item xs={12} display="flex" justifyContent="space-between">
                                    <Button type="submit" variant="contained" color="primary">
                                        Gravar Alterações
                                    </Button>
                                    <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                                        <Button onClick={reativar}>Reativar</Button>
                                        <Button onClick={inativar}>Inativar</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </section>
            </div>
        </div>
    );
};

export default AlterarCategoria;
