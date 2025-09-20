import { baseURL } from "./urlAPI";
import Expense from "@/interfaces/expense";
import errorFunction from "@/utils/errorFunction";

const url  = new URL(`${baseURL}/expenses/`);
export async function getExpenses(token: string, startDate?: string, endDate?: string) {
  
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (startDate) url.searchParams.set("datei", startDate);
    if (endDate) url.searchParams.set("datef", endDate);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    
    if (!response.ok) {
      errorFunction(`Erro ao buscar gastos/despesas: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    errorFunction("Erro inesperado ao buscar gastos/despesas", undefined, undefined, error);
  }
}

export async function createExpenses(token: string,  expenseData?: Expense) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (expenseData) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) errorFunction(`Erro ao criar gastos/despesas: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar gastos/despesas", undefined, undefined, error);
  }
}

export async function deleteExpenses(token: string, id?: number) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (id) {
      const response = await fetch(`${baseURL}/expenses/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });

      if (!response.ok) errorFunction(`Erro ao deletar gastos/despesas: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar gastos/despesas", undefined, undefined, error);
  }
}

export async function putExpense(token: string, id?: number, expenseData?: Expense){
  try{
    const bearer = `Bearer ${String(token).trim()}`;
    if(id && expenseData){
      const response = await fetch(`${baseURL}/expenses/${id}/`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(expenseData),
      });

      if(!response.ok) errorFunction(`Erro ao atualizar dados: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao atualizar", undefined, undefined, error);
  }
}
