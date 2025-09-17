import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { createRevenues, deleteRevenues, getRevenues, putRevenue } from "@/services/revenueService";
import Revenue from "@/interfaces/revenue";
import errorFunction from "@/utils/errorFunction";

export default function useRevenue(token: string) {
  const [revenue, setRevenues] = useState<Revenue[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultError = (error: unknown) => {
    setError(error instanceof Error? error.message : "Error desconhecido");
  }
  
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
      } catch (error) { defaultError(error);
      } finally { setLoading(false); }
    }, [authToken]);

  const fetchRevenue = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRevenues(authToken);
      if (!response) throw new Error("Erro ao criar receita");
      return true;
    } catch (error) { defaultError(error);
    } finally { setLoading(false); }
  }

  const addRevenue = async (revenueData: Revenue) =>{
    try {
      setLoading(true);
      setError(null);
      const response = await createRevenues(authToken, revenueData);
      if (!response) throw new Error("Erro ao criar receita");
      return true;
    } catch (error) { defaultError(error);
    } finally { setLoading(false); }
  }

  const removeRevenue = async (id: number) =>{
    setLoading(true);
    setError(null);
    try{
      const response = await deleteRevenues(authToken, id);
      if (!response) throw new Error("Erro ao deletar receita");
      return true;
    } catch (error) { defaultError(error);
    } finally { setLoading(false); }
  }

  const updateRevenue = async (revenueData: Revenue, id?: number) => {
    try{
      setLoading(true);
      setError(null);
      const response = await putRevenue(authToken, id, revenueData)
      if(!response) errorFunction("Erro ao atualizar gastos fixos");
      return true;
    } catch(error){ defaultError(error); 
    } finally { setLoading(false); }
  }

  useEffect(() => {
    refetchRevenue();
  }, [refetchRevenue]);

  return {revenue, loading, error, fetchRevenue, addRevenue, updateRevenue, remove: removeRevenue, refetch: refetchRevenue};
}
