import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginNewPass = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({ email: "" });
  // só senha, nova senha e confirm
  const [formData, setFormData] = useState({ senha: "", newpass: "" });
  const [msgConfirm, setMsgConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [theme, setTheme] = useState('Claro');

  useEffect(() => {
    const savedTheme = localStorage.getItem('tema') || 'Claro';
    setTheme(savedTheme);

    UsuarioService.findById(id)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch(console.error);
  }, [id]);

  const buttonColor = theme === 'Claro' ? 'primary' : 'error';
  const avatarBgColor = theme === 'Claro' ? 'primary.main' : 'error.main';
  const textColor = theme === 'Claro' ? '' : 'white';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));

    if (name === 'newpass' || name === 'senha') {
      setMsgConfirm(
        name === 'newpass' && formData.senha !== value ? 'As senhas não conferem!' : ''
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.senha !== formData.newpass) {
      setMsgConfirm('As senhas não conferem!');
      return;
    }

    // Envia { senha: "novaSenha" } como o controller espera
    UsuarioService.alterarSenha(id, { senha: formData.senha })
      .then(response => {
        setMessage(response.data.message || "Senha alterada com sucesso!");
        setSuccessful(true);
      })
      .catch(error => {
        const respMessage =
          error.response?.data?.message || error.message || error.toString();
        setMessage(respMessage);
        setSuccessful(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="caixota" sx={{ marginTop: 8 }}>
        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: avatarBgColor }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: textColor }}>
              Alterar Senha
            </Typography>
          </Box>

          {!successful && (
            <>
              <Typography sx={{ mt: 1, mb: 2, textAlign: 'center', color: theme === 'Claro' ? 'error.main' : 'warning.main' }}>
                O Usuário precisa Alterar a senha para ter acesso.
              </Typography>

              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={usuario.email || ""}
                InputProps={{ readOnly: true, style: { color: textColor } }}
                InputLabelProps={{ style: { color: textColor } }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="senha"
                name="senha"
                label="Nova Senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                InputProps={{ style: { color: textColor } }}
                InputLabelProps={{ style: { color: textColor } }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="newpass"
                name="newpass"
                label="Confirmar Senha"
                type="password"
                value={formData.newpass}
                onChange={handleChange}
                InputProps={{ style: { color: textColor } }}
                InputLabelProps={{ style: { color: textColor } }}
              />

              {msgConfirm && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {msgConfirm}
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="outlined" color="warning" onClick={() => navigate("/")}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={buttonColor}
                  disabled={!formData.senha || !formData.newpass}
                >
                  Alterar Senha
                </Button>
              </Box>
            </>
          )}

          {message && successful && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'success.main',
                  color: 'white',
                }}
              >
                {message}
              </Typography>
              <Box textAlign="center" mt={2}>
                <Link to="/home">
                  <Button variant="contained" color="warning">
                    Acessar o sistema
                  </Button>
                </Link>
              </Box>
            </Box>
          )}

          {message && !successful && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'error.main',
                  color: 'white',
                }}
              >
                {message}
              </Typography>
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default LoginNewPass;
