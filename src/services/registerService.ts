import { baseURL } from "@/services/urlAPI";

export async function fetchRegister(
    name: string,
    last_name: string,
    age: string,
    cpf: string,
    email: string,
    phone: string,
    username: string,
    password: string) {
  try {
    const res = await fetch(`${baseURL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, last_name, age, cpf, email, phone, username, password }),
    });
    const response = await res.json()
    if(!response) {
      throw new Error("Register failed");
    }
    return response;

  }
  catch (error: unknown) {
    console.error(error);
    return null
  }
}