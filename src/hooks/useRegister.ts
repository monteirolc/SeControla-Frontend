// src/hooks/useAuth.ts
"use client";

import { useState } from "react";
import { fetchRegister } from "@/services/fetchRegisterAPI";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(
    name: string,
    last_name: string,
    age: string,
    cpf: string,
    email: string,
    phone: string,
    username: string,
    password: string
  ) {
    try {
      setLoading(true);
      setError(null);

      await fetchRegister(
        name, last_name, age, cpf, email, phone, username, password
      );

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setError("Não foi possível cadastrar um novo usuário");
      return false;
    } finally {
      setLoading(false);
    }
  }
  
  return { register, loading, error };
}
