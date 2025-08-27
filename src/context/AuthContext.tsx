"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (access: string, refresh?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Inicializa o estado com base no cookie
  useEffect(() => {
    const token = Cookies.get("access");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function login(access: string, refresh?: string) {
    Cookies.set("access", access, { secure: true, sameSite: "strict" });
    if (refresh) Cookies.set("refresh", refresh, { secure: true, sameSite: "strict" });
    localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);

    setIsAuthenticated(true); // 🔑 Aqui está a mágica!
  }

  function logout() {
    Cookies.remove("access");
    Cookies.remove("refresh");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return context;
}
