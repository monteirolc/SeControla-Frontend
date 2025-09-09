import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { createRevenues, deleteRevenues, getRevenues } from "@/services/revenueService";
import { Revenue } from "@/interfaces/revenue";

export function useRevenue(token: string) {
  const [revenue, setRevenues] = useState<Revenue[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  let authToken = token;
  if (!authToken) {
      authToken = String(Cookies.get("access"))?.toString(); 
    }
  const refetchRevenue = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      setError(null);

        const data = await getRevenues(authToken, startDate, endDate);
        setRevenues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }, [authToken]);

  const fetchRevenue = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRevenues(authToken);
      if (!response) throw new Error("Erro ao criar receita");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const addRevenue = async (revenueData: Revenue) =>{
    try {
      setLoading(true);
      setError(null);
      const response = await createRevenues(authToken, revenueData);
      if (!response) throw new Error("Erro ao criar receita");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const removeRevenue = async (id: number) =>{
    setLoading(true);
    setError(null);
    try{
      const response = await deleteRevenues(authToken, id);
      if (!response) throw new Error("Erro ao deletar receita");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetchRevenue();
  }, [refetchRevenue]);

  return {revenue, loading, error, fetchRevenue, addRevenue, removeRevenue, refetch: refetchRevenue};
}
