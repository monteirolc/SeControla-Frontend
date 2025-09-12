"use client";

import { useState } from "react";
import { useFixedExpense } from "@/hooks/useFixedExpense";
import FixedExpense from "@/interfaces/fixedExpense";
import  DateUi from "@/components/ui/Date";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Trash from "@/components/ui/Trash";
import SquarePen from "@/components/ui/SquarePen";
import { Search } from "lucide-react";
import Link from "next/link";
import { generateRSAKeys } from "@/utils/generateRASKey";
import { encryptJSON } from "@/utils/encryptJSON";
import { useRouter } from "next/navigation"

export default function ExpensePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { fixedExpense, loading, error, removeFixedExpense, refetch} = useFixedExpense(token);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch(startDate, endDate); // 🔁 chama a API de novo com os filtros
  };

  const editRoute = async (value: number) =>{
    
    if(!fixedExpense) return '';

    // 🔑 Gerar chave RSA
    const { publicKey, privateKey } = await generateRSAKeys();
    // 🔒 Criptografar
    const encrypted = await encryptJSON(publicKey, fixedExpense[value]);
    
    const params = new URLSearchParams({"Q": encrypted.encryptedData,
      "K": JSON.stringify(await window.crypto.subtle.exportKey("jwk", privateKey)),
      "iv": encrypted.iv,
      "e": encrypted.encryptedAESKey,});
    router.push(`/fixed_expense/edit?${params.toString()}`);
  }

  return (
    <main className="p-6 min-h-screen dark:bg-gray-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-2xl shadow">
        <div className="flex flex-content center-item">
          <h1 className="text-2xl font-bold mb-4">Gastos / Despesas fixas</h1>
          <Link href="/fixed_expense/new"
            className="ml-6 px-1 bg-blue-600 text-aling-center text-white rounded-sm hover:bg-blue-700">
            Lançar despesa fixa
          </Link>
        </div>
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


        {loading && <p>Carregando despesas fixas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lista de receitas */}
        <ul className="space-y-2">
          {!fixedExpense || fixedExpense.length === 0 ? (
            <p>Nenhuma receita encontrada.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Descrição</th>
                  <th className="py-2">Dia cobrança</th>
                  <th className="py-2">Valor</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {fixedExpense.map((rev: FixedExpense, index: number) => (
                  <tr key={rev.id} className="border-b">
                    <td>{rev.description}</td>
                    <td>{(String(rev.due_day))}</td>
                    <td className="font-medium">
                      R$ {Number(rev.amount).toFixed(2).replace(".", ",")}
                    </td>
                    <td className="text-right">
                      <SquarePen 
                        size={20}
                        onClick={() => editRoute(index)}
                      />
                      <Trash
                        size={20}
                        onClick={() => confirm(`Realmente deseja deletar a despesa (${rev.id}: ${rev.description})?`) ? 
                        removeFixedExpense(Number(rev.id)).then(() => refetch()) : 
                        null}
                      />
                      <p>{rev.id}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>  
          )}
        </ul>


      </div>
    </main>
  );
}
