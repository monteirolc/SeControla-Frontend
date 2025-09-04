"use client";

import { useState } from "react";
import { useRevenue } from "@/hooks/useRevenue";
import Link from "next/link";

export default function RevenuePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { revenues, loading, error } = useRevenue(token, startDate, endDate);

  const dateFormated = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <main className="p-6 min-h-screen dark:bg-gray-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Receitas</h1>

        {/* Filtros */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm mb-1">De</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-lg dark:bg-gray-800"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Até</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-lg dark:bg-gray-800"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {loading && <p>Carregando receitas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lista de receitas */}
        <ul className="space-y-2">
          {revenues.map((rev) => (
            <li key={rev.id} className="flex justify-between border-b py-2">
              <span>{rev.description}</span>
              <span>{dateFormated(rev.created_at)}</span>
              <span className="font-medium">
                R$ {Number(rev.amount).toFixed(2).replace(".", ",")}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            href="/revenue/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Nova Receita
          </Link>
        </div>
      </div>
    </main>
  );
}
