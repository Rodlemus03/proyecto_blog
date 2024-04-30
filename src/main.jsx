// App.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import ErrorFallback from "./pages/ErrorFallback";
import Plantilla from "./pages/Plantilla";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/posts/",
      element: <Plantilla/>,
      children: [
        { index: true, element: <Login /> },
        { path: 'dashboard', element: <Dashboard /> }
      ]
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
