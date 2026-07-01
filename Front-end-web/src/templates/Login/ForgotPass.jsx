import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
      .string('Digite seu email')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Digite um email válido'
      )
      .required('Email necessário'),
    password: yup
      .string('Digite sua senha')
      .min(8, 'A senha deve ter um tamanho minímo de 8 letras')
      .required('Senha necessária'),
  });
  
  

const Login = () => {
    const navigate = useNavigate();

    const [theme, setTheme] = useState('Claro'); 

    useEffect(() => {
      const savedTheme = localStorage.getItem('tema') || 'Claro';
      setTheme(savedTheme); 
    }, []);
  
    const buttonColor = theme === 'Claro' ? 'primary' : 'error';
    const avatarBgColor = theme === 'Claro' ? 'primary.main' : 'error.main';
    const textColor = theme === 'Claro' ? '' : 'white';

    const formik = useFormik({
        initialValues: {
            email: 'Exemplo@Gmail.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            navigate("/home");
        },
    });

    const backto = () => {
        navigate("/");
    }

    return (
        <div className="">
          <Container component="main" maxWidth="xs">
            <Box className="caixota" sx={{ marginTop: 8 }}>
            <form onSubmit={formik.handleSubmit} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: avatarBgColor }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: textColor }}>
                Recuperar Senha
              </Typography>
              </Box>
                <div className="mb-2">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{style: { color: textColor },}}InputLabelProps={{style: { color: textColor },}}
                  sx={{'& .MuiOutlinedInput-root': {'& fieldset': {borderColor: textColor,},
                  '&:hover fieldset': {borderColor: textColor,},
                  '&.Mui-focused fieldset': {borderColor: textColor,},
                    },
                  }}
                />
                </div>
                    <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  color={buttonColor}
                >
                  Enviar E-mail
                </Button>
              
                <Box item xs>
                  <Link to="/login" variant="body2" className="link-color">
                    Voltar
                  </Link>
                </Box>
            </form>
            </Box>
        </Container>
        </div>
    );
}

export default Login;
