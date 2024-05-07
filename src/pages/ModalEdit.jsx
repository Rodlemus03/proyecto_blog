import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes desde prop-types
import "../styles/Modal.css";

const ModalEdit = ({ showModal, handleCloseModal, editedBlog, handleChange, handleSaveChanges }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSave = () => {
    // Verificar si todos los campos están llenos
    if (!editedBlog.title || !editedBlog.content || !editedBlog.plataforma || !editedBlog.cancion) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    // Guardar los cambios
    handleSaveChanges();
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
          <h2>Editar Blog</h2>
          <input type="text" name="title" placeholder="Título" value={editedBlog.title || ""} onChange={handleInputChange} />
          <textarea name="content" placeholder="Contenido" value={editedBlog.content || ""} onChange={handleInputChange}></textarea>
          <input type="text" name="plataforma" placeholder="Plataforma" value={editedBlog.plataforma || ""} onChange={handleInputChange} />
          <input type="text" name="cancion" placeholder="Canción" value={editedBlog.cancion || ""} onChange={handleInputChange} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleEditSave}>Guardar Cambios</button>
        </div>
      </div>
    )
  );
};

// Añade validación de PropTypes
ModalEdit.propTypes = {
  showModal: PropTypes.bool.isRequired, // Valida que showModal sea un booleano requerido
  handleCloseModal: PropTypes.func.isRequired, // Valida que handleCloseModal sea una función requerida
  editedBlog: PropTypes.object.isRequired, // Valida que editedBlog sea un objeto requerido
  handleChange: PropTypes.func.isRequired, // Valida que handleChange sea una función requerida
  handleSaveChanges: PropTypes.func.isRequired // Valida que handleSaveChanges sea una función requerida
};

export default ModalEdit;
