"use client";

// import { useEffect, useState } from "react";
import { useBalance } from "@/hooks/useBalance";

export default function DashboardPage() {
  // token pode vir do localStorage, context ou cookies
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { balance, loading, error } = useBalance(token);
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Carregando...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Erro: {error}</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen dark:bg-gray-950">
      <div className="w-full max-w-2xl p-6 dark:bg-gray-700 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        {balance && balance.length > 0 ? (
        <div className="space-y-4">
          {balance.map(item => (
            <div key={item.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Criado em: {new Date(item.created_at).toLocaleString("pt-BR")}
              </p>
              <p className="text-sm text-green-500 dark:text-gray-300">
                Ganhos por carteira: {(item.total_incomes)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum dado disponível</p>
      )}
      </div>
    </main>
  );
}
