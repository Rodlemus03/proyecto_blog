// ErrorFallback.jsx
import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h1>¡Error inesperado en la aplicación!</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
    </div>
  );
};

export default ErrorFallback;
