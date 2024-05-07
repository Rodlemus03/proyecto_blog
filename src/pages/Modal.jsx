import { useState } from "react";
import PropTypes from 'prop-types'; // Importa PropTypes desde prop-types
import "../styles/Modal.css";
import axios from 'axios';

const Modal = ({ showModal, handleCloseModal, editedBlog, handleChange, token }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveChanges = () => {
    // Verificar si todos los campos están llenos
    if (!editedBlog.title || !editedBlog.content || !editedBlog.plataforma || !editedBlog.cancion) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    // Configurar los datos a enviar al API
    const postData = {
      title: editedBlog.title,
      content: editedBlog.content,
      plataforma: editedBlog.plataforma,
      cancion: editedBlog.cancion
    };

    // Enviar los datos al API usando axios
    axios.post("http://127.0.0.1:3000/api/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        // Si la respuesta es exitosa, cerrar el modal
        handleCloseModal();
        window.location.reload();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    handleChange(e);
    setErrorMessage(""); // Limpiar el mensaje de error al cambiar un valor en el formulario
  };

  return (
    showModal && (
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={handleCloseModal}>&times;</span>
          <h2>Agregar Blog</h2>
          <br />
          <input class="modalCrear"  type="text" name="title" placeholder="Título" value={editedBlog.title || ""} onChange={handleInputChange} />
          <textarea name="content" placeholder="Contenido" value={editedBlog.content || ""} onChange={handleInputChange}></textarea>
          <input class="modalCrear" type="text" name="plataforma" placeholder="Plataforma" value={editedBlog.plataforma || ""} onChange={handleInputChange} />
          <input class="modalCrear" type="text" name="cancion" placeholder="Canción" value={editedBlog.cancion || ""} onChange={handleInputChange} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleSaveChanges}>Guardar</button>
        </div>
      </div>
    )
  );
};

// Añade validación de PropTypes
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  editedBlog: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default Modal;
