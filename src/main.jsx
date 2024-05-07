// App.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Plantilla from "./pages/Plantilla";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login/",
      element: <Plantilla/>,
      errorElement:<Error404/>,
      children: [
        { index: true, element: <Login /> },
        { path: 'dashboard', element: <Dashboard /> },
        {path:'register',element:<Register/>}
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
