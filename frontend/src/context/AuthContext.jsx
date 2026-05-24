import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem("issuehub_user")) || null;
  const [user, setUser] = useState(savedUser);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("issuehub_user", JSON.stringify(userData));
    toast.success("Login successful");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("issuehub_user");
    toast.success("Logged out");
  }

  const value = {
    user,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
