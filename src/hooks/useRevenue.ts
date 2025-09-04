import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchRevenues } from "@/services/fetchRevenueAPI";

export interface Revenue {
  id: number;
  balance: string;
  description: string;
  amount: number;
  date: string;
  created_by: string;
  created_at: string;
}

export function useRevenue(token: string, startDate?: string, endDate?: string) {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        
        let authToken = token;
        if (!authToken) {
          authToken = String(Cookies.get("access"))?.toString(); 
        }

        const data = await fetchRevenues(authToken, startDate, endDate);
        setRevenues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, startDate, endDate]);

  return { revenues, loading, error };
}
