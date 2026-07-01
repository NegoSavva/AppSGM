import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import UsuarioService from "../../services/UsuarioService";
import { Alert, Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid, Paper, Typography, Box, ButtonGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { ThemeContext } from "../../contexts/ThemeContext";

const UsuarioEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [usuario, setUsuario] = useState({
        id: null,
        nome: "",
        email: "",
        nivelAcesso: "",
        dataCadastro: "",
        statusUsuario: ""
    });

    const [alerta, setAlerta] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        UsuarioService.findById(id)
            .then((response) => {
                setUsuario(response.data);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao buscar usuário.', type: 'error' });
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UsuarioService.update(id, usuario)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário atualizado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/usuarioslista'), 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao atualizar usuário.', type: 'error' });
            });
    };

    const inativar = () => {
        UsuarioService.inativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário inativado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/usuarioslista'), 1000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao inativar usuário.', type: 'error' });
            });
    };

    const reativar = () => {
        UsuarioService.reativar(id)
            .then(() => {
                setAlerta({ show: true, message: 'Usuário reativado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/usuarioslista'), 2000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao reativar usuário.', type: 'error' });
            });
    };

    const resetarSenha = () => {
        UsuarioService.resetarSenha(id)
            .then(() => {
                setAlerta({ show: true, message: 'Senha resetada com sucesso!', type: 'success' });
                setTimeout(() => navigate('/usuarioslista'), 2000);
            })
            .catch(() => {
                setAlerta({ show: true, message: 'Erro ao resetar Senha.', type: 'error' });
            });
    };

    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';
    const paperBackground = theme === 'Claro' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.0)'

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/usuario'}
                    title={'Editar Usuário'}
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
                                        value={usuario.id || ''}
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
                                        value={usuario.nome}
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
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={usuario.email}
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
                                        label="Data de Cadastro"
                                        value={usuario.dataCadastro || ''}
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

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Status"
                                        value={usuario.statusUsuario || ''}
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

                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="nivelAcesso-label"
                                            sx={{ color: textColor }}
                                        >
                                            Acesso
                                        </InputLabel>
                                        <Select
                                            labelId="nivelAcesso-label"
                                            name="nivelAcesso"
                                            value={usuario.nivelAcesso}
                                            onChange={handleChange}
                                            label="Acesso"
                                            sx={{
                                                backgroundColor: background,
                                                borderRadius: 1,
                                                color: textColor, // cor do texto selecionado
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: textColor,
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: textColor,
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: textColor,
                                                },
                                            }}
                                        >
                                            <MenuItem value="USER">USER</MenuItem>
                                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} display="flex" justifyContent="space-between">
                                    <Button type="submit" variant="contained" color="primary">
                                        Gravar Alterações
                                    </Button>
                                    <ButtonGroup variant="contained" color="secondary" aria-label="Basic button group">
                                        <Button onClick={reativar}>Reativar</Button>
                                        <Button onClick={resetarSenha}>Resetar senha</Button>
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

export default UsuarioEditar;
