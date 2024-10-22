import { createContext, useContext, useEffect, useState } from "react";
import { PUBLIC_ROUTES } from "../routes";
import { Spin } from "antd";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.some(
      (route) => route.path === window.location.pathname
    );
    try {
      const _user = JSON.parse(localStorage.getItem("user"));
      setUser(_user);
      if (_user && isPublicRoute) {
        window.location.href = "/main";
      } else if (!_user && !isPublicRoute) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setReady(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleSignIn = (token, refreshToken, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/main";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignIn,
        handleSignOut,
      }}
    >
      {!ready ? (
        <div className="absolute h-full w-full flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
