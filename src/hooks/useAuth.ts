// src/hooks/useAuth.ts
"use client";

import { useState } from "react";
import api from "@/services/api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/", { username, password });
      console.log("Resposta do backend:", res.data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      return true;
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
  }

  return { login, logout, loading, error };
}
