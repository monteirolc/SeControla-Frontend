import { baseURL } from "@/services/urlAPI";
import { Revenue } from "@/interfaces/revenue";
import errorFunction from "@/utils/errorFunction";

let url  = `${baseURL}/incomes/`;
const params = new URLSearchParams();
export async function getRevenues(token: string, startDate?: string, endDate?: string) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (startDate) params.append("datei", startDate);
    if (endDate) params.append("datef", endDate);
    if (params.toString()) url += `?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    
    if (!response.ok) {
      errorFunction(`Erro ao buscar receitas: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    errorFunction("Erro inesperado ao buscar receitas", undefined, undefined, error);
  }
}

export async function createRevenues(token: string,  revenueData?: Revenue) {
  try{
    const bearer = `Bearer ${String(token).trim()}`;

    if (revenueData) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(revenueData),
      });

      if (!response.ok) errorFunction(`Erro ao criar receita: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar receitas", undefined, undefined, error);
  }
}

export async function deleteRevenues(token: string, id?: number) {
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

      if (!response.ok) errorFunction(`Erro ao deletar receita: ${response.status}`);
      return await response.json();
    }
  } catch (error) {
    errorFunction("Erro inesperado ao buscar receitas", undefined, undefined, error);
  }
}

