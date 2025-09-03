import { baseURL } from "@/services/urlAPI";

export async function fetchBalance(token: string) {
  console.log(token);
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
    console.error(error);
    return null;
  }
}
