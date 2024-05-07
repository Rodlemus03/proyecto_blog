import PropTypes from "prop-types"; // Importa PropTypes desde prop-types
import React from "react";
import Error404 from "./pages/Error404";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el próximo renderizado muestre el Fallback UI.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de logging
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI fallback
      return <Error404 />;
    }

    return this.props.children;
  }
}

// Añade validación de PropTypes
ErrorBoundary.propTypes = {
  children: PropTypes.node, // Valida que children sea un nodo React
  error: PropTypes.object, // Valida que error sea un objeto
  resetErrorBoundary: PropTypes.func // Valida que resetErrorBoundary sea una función
};

export default ErrorBoundary;
