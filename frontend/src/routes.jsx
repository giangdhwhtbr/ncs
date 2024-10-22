import { Navigate } from "react-router-dom";
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
