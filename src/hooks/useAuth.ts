// src/hooks/useAuth.ts
"use client";

import { useState } from "react";
import { fetchLogin } from "@/services/fetchAuthAPI";
import Cookies from "js-cookie";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchLogin(username, password);

      const access = res['access'];
      const refresh = res['refresh'];

      if(access){
        localStorage.setItem("access", access);
        if(refresh) localStorage.setItem("refresh", refresh);
        
        Cookies.set("access", access, { secure: true, sameSite: "strict" });
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setError("Usuário ou senha inválidos");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    Cookies.remove("access");
    window.location.href = "/login";
  }
  

  return { login, logout, loading, error };
}
