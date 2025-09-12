"use client";

import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ComboBox from "@/components/ui/ComboBox";
import { useRouter } from "next/navigation";
import {useFixedExpense} from "@/hooks/useFixedExpense"


export default function NewExpensePage(){
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState("");
  const [dueday, setDueDay] = useState(0);
  const [startdate, setStartDate] = useState("")
  const router = useRouter();
  const { loading, error, addFixedExpense } = useFixedExpense("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { getBalance, loading: loadingBalance} = useBalance(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addFixedExpense({ balance, description, amount, due_day: dueday, start_date: startdate });
    if (success) {
      router.push("/fixed_expense");
    }
   };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg">
        <h1>Create New Expense</h1>
        <form onSubmit={handleSubmit}>
          <ComboBox
            defaultLabel="Conta associada"
            options={getBalance?.filter((b) => b.account_type === "fe").map((b) => 
              ({ id: b.id, label: b.name })) ?? [{ id: "", label: "" }]}
            value={balance}
            onChange={setBalance}
            disabled={loadingBalance}
          />
          <Input
            label="Valor em R$"
            value={String(amount)}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            min={0}
            step={0.01}
          />
          <Input
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Dia de cobrança"
            value={String(dueday)}
            onChange={(e) => setDueDay(Number(e.target.value))}
            type="number" min={0} max={28}
          />
          <Input
            label="Inicio da cobrança"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          />
          <br></br>
          <Button
            className= "y-4"
            type="submit"
            disabled={loading}
            label={loading ? "Enviando..." : "Criar"}
          />
        {error && <p>Error: {error}</p>}
        </form>
      </div>
    </main>
  );
}