import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import HealthFormDeclarationPage from "./pages/HealthFormDeclarationPage";
import HealthFormList from "./pages/HeathFormList";
import Login from "./pages/Login";

export const PUBLIC_ROUTES = [
  {
    key:'health-form-declaration',
    path: "/",
    element: <HealthFormDeclarationPage />,
  },
  {
    key:'login',
    path: "/login",
    element: <Login />,
  }
]

export const PRIVATE_ROUTES = [
  {
    key:'main',
    path: "/main",
    element: <Navigate to="/main/health-forms" />,
  },
  {
    key:'health-forms',
    path: "/main/health-forms",
    element: <HealthFormList />,
  },
]

export default function ApplicationRouter() {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <Routes>
        {PUBLIC_ROUTES.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  }
  return (
    <Routes>
      {PRIVATE_ROUTES.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))} 
    </Routes>
  );
}
