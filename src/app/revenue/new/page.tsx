"use client";

import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ComboBox from "@/components/ui/ComboBox";
import { useRouter } from "next/navigation";
import useRevenue from "@/hooks/useRevenue"


export default function NewRevenuePage(){
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();
  const { loading, error, addRevenue } = useRevenue("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { getBalance, loading: loadingBalance} = useBalance(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addRevenue({ balance, description, amount, date });
    if (success) {
      router.push("/revenue");
    }
   };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg">
        <h1>Criar nova receita</h1>
        <form onSubmit={handleSubmit}>
          <ComboBox
            defaultLabel="Conta associada"
            options={getBalance?.filter((b) => b.account_type === "i").map((b) => 
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
          />
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
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