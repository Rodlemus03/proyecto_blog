// App.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./pages/ErrorBoundary";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plantilla from "./pages/Plantilla";
import NoAuth from "./pages/NoAuth";
import Error404 from "./pages/Error404"; // Importa el componente Error404

const App = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  const router = createBrowserRouter([
    {
      path: "/login/",

      element: <Plantilla />,
      children: [
        { index: true, element: <Login /> },
        { path: 'dashboard', element: isAuthenticated ? <Dashboard /> : <NoAuth /> },
      ]
    },
    // Ruta para cualquier otra ruta no definida
    {
      path: "*",
      element: <Error404 />
    }
  ]);

  return (
    <React.StrictMode>
      <Error404>
      <RouterProvider router={router} />
      </Error404>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);
