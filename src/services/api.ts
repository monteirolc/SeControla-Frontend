
const baseURL = "http://localhost:8000/api";

export async function fetchLogin(username: string, password: string) {
  try {
    const res = await fetch(`${baseURL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await res.json()
    console.log(response)
    if(!response) {
      throw new Error("Login failed");
    }
    return response;

  }
  catch (error: unknown) {
    console.error(error);
    return null
  }
}


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
