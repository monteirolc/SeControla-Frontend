"use client";

import { useState } from "react";
import { useFixedExpense } from "@/hooks/useFixedExpense";
import TableData from "@/components/ui/TableData"
import Trash from "@/components/ui/Trash";

export default function ExpensePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { fixedExpense, loading, error, remove, refetch} = useFixedExpense(token);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch(startDate, endDate); // 🔁 chama a API de novo com os filtros
  };

  return(
    <>
      <TableData 
        tableHead={`Gastos/Despesas fixos`}
        loading={loading}
        error={error}
        valueStartDate={startDate}
        valueEndDate={endDate}
        // @ts-expect-error P4GS
        tableData={fixedExpense}
        hookType={"fixedExpense"}
        token={token}
        route={'/fixed_expense/edit'}
        newRoute={'/fixed_expense/new'}
        ocdStartDate={setStartDate}
        ocdEndDate={setEndDate}
        onSubmit={handleSubmit}
        icon={(rev) => (
          <Trash
            size={20}
            onClick={async () => {
              if (confirm(`Realmente deseja deletar a despesa (${rev.id}: ${rev.description})?`)) {
                await remove(Number(rev.id));   // ✅ chama o hook
                await refetch();        // ✅ atualiza a tabela
              }
            }}
          />
        )}
      />
    </>
  );
}
