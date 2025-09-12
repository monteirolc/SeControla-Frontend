import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { 
  createFixedExpenses as createFE,
  deleteFixedExpenses as deleteFE,
  getFixedExpenses as getFE,
  putFixedExpenses as putFE
 } from "@/services/fixedExpenseService";
 import FixedExpense from "@/interfaces/fixedExpense";
import errorFunction from "@/utils/errorFunction";

 
 export function useFixedExpense(token: string){
  const [fixedExpense, setFixedExpenses] = useState<FixedExpense[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let authToken = token;
  if (!authToken) {
      authToken = String(Cookies.get("access"))?.toString(); 
    }
  
  const initFunction = (state=true) => {
    if(state){
      setLoading(true);
      setError(null);
    }
  }
    
  const defaultError = (error: unknown) => {
    setError(error instanceof Error? error.message : "Error desconhecido");
  }
  
  const refetchFixedExpense = useCallback(async (startDate?: string, endDate?: string) => {
    try{
      initFunction();
      const data = await getFE(authToken, undefined, startDate, endDate);
      setFixedExpenses(data);
      return true;
    }catch (error){ defaultError(error);
    }finally { setLoading(false); }
  }, [authToken]);

  const fetchFixedExpense = async (id?: number) => {
    try{
      initFunction();
      const data = await getFE(authToken, id);
      setFixedExpenses(data);
      return true;
    }catch(error){ defaultError(error);
    } finally { setLoading(false); }
  }

  const addFixedExpense = async (FixedExData: FixedExpense) => {
    try{
      initFunction();
      const response = await createFE(authToken, FixedExData);
      if(!response) errorFunction("Erro ao criar gastos fixos")
      return true;
    } catch(error){ defaultError(error); 
    } finally { setLoading(false); }
  } 

  const removeFixedExpense = async (key: number) => {
    try{
      initFunction();
      const response = await deleteFE(authToken, key);
      if(!response) errorFunction("Erro ao remover gastos fixos");
      return true;
    } catch(error){ defaultError(error); 
    } finally { setLoading(false); }
  }

  const updateFixedExpenses = async (fixedExData: FixedExpense, id?: number) => {
    try{
      initFunction();
      const response = await putFE(authToken, id, fixedExData)
      if(!response) errorFunction("Erro ao atualizar gastos fixos");
      return true;
    } catch(error){ defaultError(error); 
    } finally { setLoading(false); }
  }

  useEffect(() => {
    refetchFixedExpense();
  }, [refetchFixedExpense]);

  return {fixedExpense, loading, error, fetchFixedExpense, refetch: refetchFixedExpense, addFixedExpense, 
    removeFixedExpense, updateFixedExpenses}
 }