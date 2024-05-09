// LoginForm.jsx
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://22461.arpanetos.lol/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, passw })
      });

      if (!response.ok) {
        localStorage.setItem("auth",false);
        throw new Error('Credenciales incorrectas');
      }else{
        localStorage.setItem("auth",true);
        navigate('/login/dashboard');
      }

      // Si la respuesta es exitosa, puedes redirigir a la página principal o realizar otras acciones
      console.log('Usuario autenticado correctamente');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
        localStorage.setItem("auth",true);
        navigate('/login/register');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {error && <Typography color="error" variant="body1">{error}</Typography>}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={user}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passw}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
