import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { createExpenses, deleteExpenses, getExpenses } from "@/services/expenseService";
import { Expense } from "@/interfaces/expense";

export function useExpense(token: string) {
  const [expense, setExpenses] = useState<Expense[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  let authToken = token;
  if (!authToken) {
      authToken = String(Cookies.get("access"))?.toString(); 
    }
  const refetchExpense = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      setError(null);

        const data = await getExpenses(authToken, startDate, endDate);
        setExpenses(data);
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

  useEffect(() => {
    refetchExpense();
  }, [refetchExpense]);

  return {expense, loading, error, fetchExpense, addExpense, removeExpense, refetch: refetchExpense};
}
