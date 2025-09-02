"use client";

import { useEffect, useState } from "react";
import { fetchBalance } from "@/services/api";
import Cookies from "js-cookie";

interface Balance {
  id: string;
  name: string;
  created_at: string;
  total_incomes: string;
  total_expenses: string;
  total_fixed_expenses: string;
  balance: string;
  account_type: string;
  owner: string;
}

export function useBalance(token: string) {
  const [balance, setBalance] = useState<Balance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBalance() {
      try {
        setLoading(true);

        let authToken = token;
        if (!authToken) {
          authToken = String(Cookies.get("access"))?.toString(); // nome do cookie que você salvou o JWT
        }

        const data = await fetchBalance(authToken);
        console.log(data);
        setBalance(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }
    loadBalance();
  }, [token]);

  return { balance, loading, error };
}