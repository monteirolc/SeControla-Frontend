import { baseURL } from "@/services/urlAPI";

export async function fetchRevenues(
  token: string,
  startDate?: string,
  endDate?: string
) {
  let url  = `${baseURL}/incomes/`;
  const params = new URLSearchParams();
  const bearer = `Bearer ${String(token).trim()}`;

  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);

  if (params.toString()) url += `?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Erro ao buscar receitas: ${response.status}`);
  }

  return response.json();
}