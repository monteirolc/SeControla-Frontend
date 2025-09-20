"use client";

import { useEffect, useState } from "react";
import useExpense from "@/hooks/useExpense";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { decryptJSON } from "@/utils/decryptJSON";
import { importPrivateKey } from "@/utils/importPrivateKey";
import Expense from "@/interfaces/expense";
import { DateUpText } from "@/components/ui/Date";
import formatDate from "@/utils/formatDate"

export default function NewExpensePage(){
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState<unknown>();
  const [date, setDate] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // busca dados da URL
  const [data, setData] = useState<Expense | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { error, updateExpense } = useExpense(token);  
  const encryptedData = searchParams.get("Q"); // dado criptografado
  const privateKeyJwk = searchParams.get("K"); // chave privada exportada em JWK
  const iv = searchParams.get("iv"); // se você também mandou o IV da AES
  const encryptedAESKey = searchParams.get("e")
  let loading=true;
  useEffect(() => {
    (async () => {
      if (!encryptedData || !privateKeyJwk || !iv) return;

      try {
        // 1. Reimporta a chave privada (JWK -> CryptoKey)
        const privateKey = await importPrivateKey(JSON.parse(privateKeyJwk));


        // 2. Descriptografa
        const result = await decryptJSON(privateKey, {
          encryptedData,
          iv,
          encryptedAESKey,
        });

        setData(prev => {
          if (JSON.stringify(prev) === JSON.stringify(result)) {
            return prev; // evita loop
          }
          return result;
        });
      } catch (err) {
        if(err) throw new Error("Erro ao descriptografar:", err);
      }
    })();
  }, [encryptedAESKey, encryptedData, iv, privateKeyJwk]);

  useEffect(()=>{
    if(data){
      setId(Number(data.id));
      setBalance(data.balance);
      setAmount(Number(data.amount));
      setDescription(String(data.description));
      setDate(formatDate(String(data.date)));
    }
  }, [data]);
  loading = false

  const returnToPrincipal = () => router.push("/expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!id) return;
    const success = await updateExpense(
      { balance, 
        description, 
        amount, 
        date: String(date), 
      }, Number(id));
    if (success) returnToPrincipal();
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg">
        <h1>Create New Expense</h1>
        { !data ? 
          (
            <div>
              <Button 
                className= "y-4"
                type="button"
                label="Retornar"
                onClick={() => returnToPrincipal()}
              />
            </div>
          ):(
            <form onSubmit={handleSubmit}>
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
                <DateUpText
                  text="Dia de cobrança"
                  value={String(date)}
                  onChange={setDate}
                />
                <br></br>
                <Button
                  className= "y-4"
                  type="submit"
                  disabled={loading}
                  label={loading ? "Enviando..." : "Atualizar"}
                />
              {error && <p>Error: {error}</p>}
              </form>            
          )
        }        
      </div>
    </main>
  );
}