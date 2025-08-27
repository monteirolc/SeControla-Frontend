"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      router.push("/dashboard");
      // redirecionar para dashboard, por exemplo
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Usuário" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Input
            label="Senha"
            // type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button label={loading ? "Entrando..." : "Entrar"} type="submit" disabled={loading} />
        </form>
      </div>
    </main>
  );
}
