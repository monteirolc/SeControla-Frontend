"use client";

import { useEffect, useState } from "react";
import { fetchBalance } from "@/services/balanceService";
import Cookies from "js-cookie";
import { Balance } from "@/interfaces/balance";

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