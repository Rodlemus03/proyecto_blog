import { useNavigate } from "react-router-dom";
import errorImage from "../images/noauth.png"; // Importa la imagen

const NoAuth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <center>

      {/* Utiliza la imagen importada */}
      <img src={errorImage} alt="Error de autenticacion" style={styles.image} />
      <h1 style={styles.title}>Usuario no autenticado</h1>
      <p style={styles.message}>Por favor, inicia sesión para acceder al panel de control.</p>
      <button style={styles.button} onClick={handleLogin}>Iniciar sesión</button>
      </center>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "25%", // Ajusta el tamaño de la imagen según sea necesario
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "50%",
  },
};

export default NoAuth;
