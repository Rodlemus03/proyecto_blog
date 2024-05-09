import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate(); // Usar useNavigate dentro del componente

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  const { username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const requestData = {
        user: username,
        passw: password
      };

      try {
        const response = await fetch("http://22461.arpanetos.lol/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          navigate('/login'); // Utilizar navigate para redirigir después del registro exitoso
        } else {
          // Si la respuesta no es exitosa, mostrar mensaje de error
          setErrorMessage("Error al registrar usuario. Por favor, inténtelo de nuevo más tarde.");
        }
      } catch (error) {
        console.error("Error de red:", error);
        // Mostrar mensaje de error en caso de error de red
        setErrorMessage("Error de red al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.");
      }
    } else {
      // Si las contraseñas no coinciden, mostrar mensaje de error
      setErrorMessage("Las contraseñas no coinciden. Por favor, verifique y vuelva a intentarlo.");
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
