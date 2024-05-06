// ErrorBoundary.jsx
import React from "react";
import Error404 from "./pages/Error404";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el próximo renderizado muestre el Fallback UI.
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

export default ErrorBoundary;
