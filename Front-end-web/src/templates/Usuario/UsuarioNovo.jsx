import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import UsuarioService from "../../services/UsuarioService";
import { Box, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material';
import { ThemeContext } from "../../contexts/ThemeContext";

const UsuarioNovo = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    UsuarioService.create(formData).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const message = error.response?.data?.message || "Erro ao salvar usuário";
        setMessage(message);
      }
    );
  };
  const textColor = theme === 'Claro' ? '' : 'white';
  const background = theme === 'Claro' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.733)';

  return (
    <Box display="flex">
      <Sidebar />
      <Box p={3} width="100%">
        <Header
          goto={'/usuario'}
          title={'Novo Usuário'}
          logo={logo}
        />
        <Box m={2} p={2} boxShadow={3} borderRadius={2}>
          <form onSubmit={handleSubmit} autoComplete="off">
            {!successful && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formData.nome || ""}
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
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email || ""}
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
                <Grid item xs={12} md={2}>
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
                    }}
                  >
                    <InputLabel id="acesso-label">Acesso</InputLabel>
                    <Select
                      labelId="acesso-label"
                      id="inputAcesso"
                      name="nivelAcesso"
                      value={formData.nivelAcesso || ""}
                      onChange={handleChange}
                      label="Acesso"
                    >
                      <MenuItem value="" disabled>
                        Nível de Acesso...
                      </MenuItem>
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Gravar
                  </Button>
                </Grid>
              </Grid>
            )}
            {message && (
              <Box mt={2}>
                <Alert severity={successful ? "success" : "error"}>
                  {message}
                </Alert>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UsuarioNovo;
