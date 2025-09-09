"use client";

import { useState } from "react";
import { useExpense } from "@/hooks/useExpense";
import { Expense as IExpense } from "@/interfaces/expense";
import  DateUi from "@/components/ui/Date";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Trash from "@/components/ui/Trash";
import { Search } from "lucide-react";
import Link from "next/link";

export default function ExpensePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { expense, loading, error, removeExpense, refetch} = useExpense(token);
  const dateFormated = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch(startDate, endDate); // 🔁 chama a API de novo com os filtros
  };

  return (
    <main className="p-6 min-h-screen dark:bg-gray-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Gastos / Despesas</h1>

        {/* Filtros */}
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <DateUi type="date" text="De:" value={startDate} onChange={setStartDate} disabled={false}/>
            <DateUi type="date" text="-  Até:" value={endDate} onChange={setEndDate} disabled={false}/>

              <div>
                <Button 
                  label={loading? 
                    <Loader size={20} animated={true}  />:
                    <Search size={20}  />}
                  type="submit"
                  disabled={loading}
                />
              </div>
          </div>
        </form>


        {loading && <p>Carregando receitas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lista de receitas */}
        <ul className="space-y-2">
          {!expense || expense.length === 0 ? (
            <p>Nenhuma receita encontrada.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Data</th>
                  <th className="py-2">Valor</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {[...expense] // copia para não mutar o estado original
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((rev: IExpense) => (
                  <tr key={rev.id} className="border-b">
                    <td>{rev.description}</td>
                    <td>{dateFormated(String(rev.date.split("-").join("/")))}</td>
                    <td className="font-medium">
                      R$ {Number(rev.amount).toFixed(2).replace(".", ",")}
                    </td>
                    <td className="text-right">
                      <Trash
                        size={20}
                        onClick={() => confirm(`Realmente deseja deletar a receita ${rev.id}: ${rev.description}?`) ? 
                        removeExpense(Number(rev.id)).then(() => refetch()) : 
                        null}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  
          )}
        </ul>

        <div className="mt-6">
          <Link
            href="/expense/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Nova despesa
          </Link>
        </div>
      </div>
    </main>
  );
}
