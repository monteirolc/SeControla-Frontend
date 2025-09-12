import { baseURL } from "./urlAPI";
import FixedExpense from "@/interfaces/fixedExpense";
import errorFunction from "@/utils/errorFunction";

let url = `${baseURL}/fixed-expenses/`
const params = new URLSearchParams();
export async function getFixedExpenses(token: string, id?: number, startDate?: string, endDate?:string){
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if(startDate) params.append("datei", startDate);
    if(endDate) params.append("datef", endDate);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
  
    if (!response.ok) {
      errorFunction(`Erro ao buscar gastos/despesas fixas: ${response.status}`);
    }
    return await response.json();
    } catch (error) {
      errorFunction("Erro inesperado ao buscar gastos/despesas fixas", undefined, undefined, error);
    }
}

export async function createFixedExpenses(token: string,  fixedExData?: FixedExpense) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (fixedExData) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(fixedExData),
      });

      if (!response.ok) errorFunction(`Erro ao criar gastos/despesas fixas: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar gastos/despesas fixas", undefined, undefined, error);
  }
}

export async function deleteFixedExpenses(token: string, id?: number) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (id) {
      const response = await fetch(`${url}${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });

      if (!response.ok) errorFunction(`Erro ao deletar gastos/despesas fixas: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar gastos/despesas fixas", undefined, undefined, error);
  }
}

export async function putFixedExpenses(token: string, id?: number, fixedExData?: FixedExpense){
  try{
    const bearer = `Bearer ${String(token).trim()}`;
    console.log(`${url}${id}/`);
    if(id && fixedExData){
      const response = await fetch(`${url}${id}/`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(fixedExData),
      });

      if(!response.ok) errorFunction(`Erro ao atualizar dados: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao atualizar", undefined, undefined, error);
  }
}