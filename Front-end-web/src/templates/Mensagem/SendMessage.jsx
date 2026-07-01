import MensagemService from "../../services/MensagemService";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import logo from "../../assets/images/home.png";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { ThemeContext } from "../../contexts/ThemeContext";

const SendMessage = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        emissor: "",
        email: "",
        texto: "",
        telefone: "",
    });

    const [alerta, setAlerta] = useState({
        show: false,
        message: '',
        type: '', // 'success', 'error', 'warning', 'info'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const exibirAlerta = (message, type = 'info') => {
        setAlerta({ show: true, message, type });
        setTimeout(() => {
            setAlerta({ show: false, message: '', type: '' });
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.emissor || !formData.email || !formData.telefone || !formData.texto) {

            exibirAlerta("Todos os campos são obrigatórios.", "warning");
            return; 
        }
        try {

            const response = await MensagemService.create({
                emissor: formData.emissor,
                email: formData.email,
                telefone: formData.telefone,
                texto: formData.texto
            });

            exibirAlerta("Mensagem enviada com sucesso!", "success");
            setTimeout(() => {
                navigate("/mensagem");
            }, 2000);
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao enviar mensagem";
            exibirAlerta(msg, "error");
        }
    };

    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';
    const buttonColor = theme === 'Claro' ? 'primary' : 'error';

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/mensagem'}
                    title={'Enviar mensagem'}
                    logo={logo}
                />
                <section className="m-2 mt-5 p-2">
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
                    <form className="form-fale row g-2 rounded-2" onSubmit={handleSubmit} autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Emissor"
                                    onChange={handleChange}
                                    name="emissor"
                                    value={formData.emissor || ""}
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    name="email"
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

                            <Grid item xs={12} sm={2}>
                                <TextField
                                    fullWidth
                                    label="Telefone"
                                    onChange={handleChange}
                                    name="telefone"
                                    value={formData.telefone || ""}
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
                            <Grid item xs={12}>
                                <TextareaAutosize
                                    name="texto"
                                    value={formData.texto}
                                    onChange={handleChange}
                                    minRows={4}
                                    placeholder="Digite sua mensagem..."
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        borderColor: textColor,
                                        backgroundColor: background,
                                        color: textColor
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} container justifyContent="space-around" sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color={buttonColor}
                                    type="submit"
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default SendMessage;
