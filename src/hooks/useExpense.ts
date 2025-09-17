import { useEffect, useState, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { createExpenses, deleteExpenses, getExpenses, putExpense } from "@/services/expenseService";
import Expense from "@/interfaces/expense";
import errorFunction from "@/utils/errorFunction";

export default function useExpense(token: string) {
  const [expense, setExpenses] = useState<Expense[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastParamsRef = useRef<{ startDate?: string; endDate?: string } | null>(null);

  const defaultError = (error: unknown) => {
    setError(error instanceof Error? error.message : "Error desconhecido");
  }
  
  let authToken = token;
  if (!authToken) {
      authToken = String(Cookies.get("access"))?.toString(); 
    }
  const refetchExpense = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      // evita refetch se params iguais (opcional)
      if (
        lastParamsRef.current &&
        lastParamsRef.current.startDate === startDate &&
        lastParamsRef.current.endDate === endDate
      ) {
        return;
      }

      setLoading(true);
      setError(null);

      const data = await getExpenses(authToken, startDate, endDate);
      while(!data) {}
      setExpenses(Array.isArray(data)? data : []);
      lastParamsRef.current = { startDate, endDate };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const fetchExpense = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExpenses(authToken);
      if (!response) throw new Error("Erro ao criar gastos/despesas");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const addExpense = async (ExpenseData: Expense) =>{
    try {
      setLoading(true);
      setError(null);
      const response = await createExpenses(authToken, ExpenseData);
      if (!response) throw new Error("Erro ao criar gastos/despesas");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const removeExpense = async (id: number) =>{
    setLoading(true);
    setError(null);
    try{
      const response = await deleteExpenses(authToken, id);
      if (!response) throw new Error("Erro ao deletar gastos/despesas");
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const updateExpense = async (expenseData: Expense, id?: number) => {
    try{
      setLoading(true);
      setError(null);
      const response = await putExpense(authToken, id, expenseData)
      if(!response) errorFunction("Erro ao atualizar gastos fixos");
      return true;
    } catch(error){ defaultError(error); 
    } finally { setLoading(false); }
  }

  useEffect(() => {
    refetchExpense();
  }, [refetchExpense]);

  return {expense, loading, error, fetchExpense, addExpense, updateExpense, remove: removeExpense, refetch: refetchExpense};
}
