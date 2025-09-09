import { baseURL } from "./urlAPI";

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