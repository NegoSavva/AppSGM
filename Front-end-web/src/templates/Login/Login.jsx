import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UsuarioService from "../../services/UsuarioService";
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const [theme, setTheme] = useState('Claro');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tema') || 'Claro';
    setTheme(savedTheme);
  }, []);

  const buttonColor = theme === 'Claro' ? 'primary' : 'error';
  const avatarBgColor = theme === 'Claro' ? 'primary.main' : 'error.main';
  const textColor = theme === 'Claro' ? '' : 'white';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    UsuarioService.signin(formData.email, formData.senha).then(
      (user) => {
        if (!user) {
          setErrorMessage("Usuário ou senha inválidos");
          setSubmitting(false);
          return;
        }

        setCurrentUser(user);

        if (user.statusUsuario === 'ATIVO') {
          navigate("/home");
        } else if (user.statusUsuario === 'TROCAR_SENHA') {
          navigate(`/newpass/${user.id}`);
        } else {
          setErrorMessage("Usuário com status inválido.");
        }

        setSubmitting(false);
      },
      (error) => {
        const respMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(respMessage);
        setSubmitting(false);
      }
    );
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
              Login
            </Typography>
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ style: { color: textColor } }}
            InputLabelProps={{ style: { color: textColor } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: textColor },
                '&:hover fieldset': { borderColor: textColor },
                '&.Mui-focused fieldset': { borderColor: textColor },
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="senha"
            name="senha"
            label="Senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            InputProps={{ style: { color: textColor } }}
            InputLabelProps={{ style: { color: textColor } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: textColor },
                '&:hover fieldset': { borderColor: textColor },
                '&.Mui-focused fieldset': { borderColor: textColor },
              },
            }}
          />

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color={buttonColor}
            disabled={submitting}
          >
            Entrar
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/forgotpass" className="link-color" style={{ textDecoration: 'none' }}>
              Esqueceu a senha?
            </Link>
            <Link to="/" className="link-color" style={{ textDecoration: 'none' }}>
              Voltar
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
