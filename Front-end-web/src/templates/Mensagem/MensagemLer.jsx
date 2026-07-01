import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Menu/Sidebar";
import MensagemService from "../../services/MensagemService";
import logo from "../../assets/images/home.png";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { ThemeContext } from "../../contexts/ThemeContext";

const MensagemLer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);

    const [mensagem, setMensagem] = useState({
        id: null,
        dataMensagem: "",
        email: "",
        emissor: "",
        texto: "",
        telefone: "",
        statusMensagem: ""
    });

    const [alerta, setAlerta] = useState({
        show: false,
        message: '',
        type: '', // 'success', 'error', 'warning', 'info'
    });

    useEffect(() => {
        carregarMensagem();
    }, []);

    const carregarMensagem = async () => {
        try {
            const response = await MensagemService.findById(id);
            setMensagem(response.data);
        } catch (error) {
            exibirAlerta("Erro ao carregar a mensagem.", "error");
        }
    };

    const exibirAlerta = (message, type = 'info') => {
        setAlerta({ show: true, message, type });
        setTimeout(() => {
            setAlerta({ show: false, message: '', type: '' });
            navigate("/mensagem")
        }, 2000);
    };

    const inativarMensagem = async () => {
        try {
            const response = await MensagemService.inativar(id);
            exibirAlerta(response.data.message, "info");
            carregarMensagem();
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao inativar a mensagem.";
            exibirAlerta(msg, "error");
        }
    };

    const textColor = theme === 'Claro' ? '' : 'white';
    const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/mensagem'}
                    title={"Ler Mensagem"}
                    logo={logo}
                />

                <section className="m-2 p-2">
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

                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    fullWidth
                                    label="ID"
                                    value={mensagem.id || ""}
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
                                    fullWidth
                                    label="Data"
                                    value={mensagem.dataMensagem || ""}
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
                                    fullWidth
                                    label="Status"
                                    value={mensagem.statusMensagem || ""}
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Emissor"
                                    value={mensagem.emissor || ""}
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={mensagem.email || ""}
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

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mensagem"
                                    multiline
                                    rows={6}
                                    value={mensagem.texto || ""}
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

                            <Grid item xs={12} container justifyContent="space-around" sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={inativarMensagem}
                                >
                                    Marcar como Lida
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default MensagemLer;
