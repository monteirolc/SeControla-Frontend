import { baseURL } from "@/services/urlAPI";
import errorFunction from "@/utils/errorFunction";

export async function fetchBalance(token: string) {
  const bearer = `Bearer ${String(token).trim()}`;
  try {
    const response = await fetch(`${baseURL}/balance/`, {
      method: "GET",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json",
      },
      // credentials: "include", // caso use cookies
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar balance: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    errorFunction(error instanceof Error? String(Error): "Indetectável");
    return null;
  }
}
