import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import CardapioService from "../../services/CardapioService";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
    Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Alert,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const AddCardapio = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        pratoId: "",
        diaServido: "",
        statusCardapio: "ATIVO",
        fotoFile: null,
        fotoPreview: ""
    });

    const { theme } = useContext(ThemeContext);
    const [successful, setSuccessful] = useState(false);

    const [alerta, setAlerta] = useState({
        show: false,
        message: '',
        type: '', // 'success', 'error', 'warning', 'info'
    });
    const exibirAlerta = (message, type = 'info') => {
        setAlerta({ show: true, message, type });
        setTimeout(() => {
            setAlerta({ show: false, message: '', type: '' });
        }, 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                fotoFile: file,
                fotoPreview: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        if (!formData.pratoId || isNaN(formData.pratoId)) {
            setMessage("Por favor, informe um ID de prato válido.");
            return;
        }

        CardapioService.create({
            nome: formData.nome,
            pratoId: formData.pratoId,
            diaServido: formData.diaServido,
            statusCardapio: formData.statusCardapio,
            fotoFile: formData.fotoFile,
        }).then(() => {
            setSuccessful(true);
            exibirAlerta("Cardápio criado com sucesso!", "success");
            setTimeout(() => {
                navigate("/cardapio");
            }, 2000);
        }).catch((error) => {
            exibirAlerta("Cardápio não teve exito na execução!", "error");
        });
    };
    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';
    const buttonColor = theme === 'Claro' ? 'primary' : 'error'
    return (
        <Box display="flex">
            <Sidebar />
            <Box p={3} width="100%">
                <Header
                    goto={'/cardapio'}
                    title={'Novo Cardápio'}
                    logo={logo}
                />
                <Box m={1} p={1} boxShadow={3} borderRadius={2}>
                    {alerta.show && (
                        <Alert
                            icon={alerta.type === 'success' ? <CheckIcon fontSize="inherit" /> : null}
                            severity={alerta.type}
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClose={() => setAlerta({ show: false, message: '', type: '' })}
                        >
                    {alerta.message}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit} autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Prato ID"
                                        name="pratoId"
                                        value={formData.pratoId}
                                        onChange={handleChange}
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
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Dia Servido"
                                        name="diaServido"
                                        value={formData.diaServido}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: textColor } }}
                                        InputLabelProps={{ style: { color: textColor }, shrink: true }}
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            }
                                        }}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth
                                        sx={{
                                            backgroundColor: background,
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: textColor },
                                                '&:hover fieldset': { borderColor: textColor },
                                                '&.Mui-focused fieldset': { borderColor: textColor },
                                            },
                                            '& .MuiInputBase-input': {
                                                color: textColor,
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: textColor,
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: textColor,
                                            }
                                        }}>
                                        <InputLabel id="status-label">Status</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            id="inputStatus"
                                            name="statusCardapio"
                                            value={formData.statusCardapio}
                                            onChange={handleChange}
                                            label="Status"
                                        >
                                            <MenuItem value="ATIVO">ATIVO</MenuItem>
                                            <MenuItem value="INATIVO">INATIVO</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        color={buttonColor}
                                        fullWidth
                                    >
                                        Enviar Imagem
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                </Grid>

                                {formData.fotoPreview && (
                                    <Grid item xs={12} textAlign="center">
                                        <img
                                            src={formData.fotoPreview}
                                            alt="Preview"
                                            style={{ maxHeight: "200px", borderRadius: "8px", marginTop: "10px" }}
                                        />
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Gravar
                                    </Button>
                                </Grid>
                            </Grid>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default AddCardapio;
