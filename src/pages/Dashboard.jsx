import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import "../styles/Dashboard.css";
import Modal from "./Modal";
import ModalEdit from "./ModalEdit";
import NoAuth from "./NoAuth";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editedBlog, setEditedBlog] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenAndStore = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:3000/api/get-token", { userId: 'usuario_id' });
        const token = response.data.token;
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Error al obtener y almacenar el token:", error);
      }
    };

    getTokenAndStore();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const token = localStorage.getItem('token');
    axios.get("http://127.0.0.1:3000/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los blogs:", error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:3000/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      })
      .catch(error => {
        console.error("Error al eliminar el blog:", error);
      });
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditedBlog({ ...blog });
    setShowEditModal(true);
  };

  const handleEditCloseModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateBlogs = () => {
    fetchBlogs(); 
    // Esto llamará a fetchBlogs y actualizará la lista de blogs en tiempo real
  };

  const handleEditSaveChanges = () => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:3000/api/posts/${selectedBlog.id}`, editedBlog, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBlogs(prevBlogs => prevBlogs.map(blog => (blog.id === selectedBlog.id ? { ...blog, ...editedBlog } : blog)));
        setShowEditModal(false);
        console.log("Cambios guardados exitosamente");
      })
      .catch(error => {
        console.error("Error al guardar los cambios:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddBlog = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    const token = localStorage.getItem('token');
    axios.post("http://127.0.0.1:3000/api/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Si la respuesta es exitosa, cerrar el modal
        handleCloseModal();
        console.log("Datos enviados correctamente al servidor");
  
        // Llamar a la función de actualización de blogs en Dashboard
        handleUpdateBlogs();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    localStorage.setItem("auth", false);
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  if (localStorage.getItem("auth") === "true") {
    return (
      <div className="dashboard-container">
        <h1>Panel de Control</h1>
        <div className="button-group">
          <center>
          <button id="add-button" className="action-button add-button" onClick={handleAddBlog}><FaPlus /> Agregar Blog</button>
          <button id="logout-button" className="action-button logout-button" onClick={handleLogout}><FaSignOutAlt /> Cerrar sesión</button>
          </center>
        </div>
        <div className="blogs-container">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-item">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p>Plataforma: {blog.plataforma}</p>
              <p>Canción: {blog.cancion}</p>
              <div className="button-container">
                <button className="action-button edit-button" onClick={() => handleEdit(blog)}><FaEdit /> Editar</button>
                <button className="action-button delete-button" onClick={() => handleDelete(blog.id)}><FaTrashAlt /> Eliminar</button>
              </div>
              <hr />
              <p>Fecha de creación: {new Date(blog.created_at).toLocaleDateString()}</p>

            </div>
          ))}
        </div>
        <Modal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleSaveChanges={handleSaveChanges}
          editedBlog={editedBlog}
          handleChange={handleChange}
          token={localStorage.getItem('token')}
          handleUpdateBlogs={handleUpdateBlogs}
        />
        <ModalEdit
          showModal={showEditModal}
          handleCloseModal={handleEditCloseModal}
          handleSaveChanges={handleEditSaveChanges}
          editedBlog={editedBlog}
          handleChange={handleChange}
        />
      </div>
    );
  } else {
    return <NoAuth />;
  }
};

export default Dashboard;
