import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

export default function ApplicationRouter() {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <Routes>
        {PUBLIC_ROUTES.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {PRIVATE_ROUTES.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))} 
      <Route path="*" element={<Navigate to="/main/health-forms" />} />
    </Routes>
  );
}
