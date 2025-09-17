"use client";

import { useState } from "react";
import useRevenue from "@/hooks/useRevenue";
import TableData from "@/components/ui/TableData";
import Trash from "@/components/ui/Trash";

export default function RevenuePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { revenue, loading, error, remove, refetch} = useRevenue(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch(startDate, endDate); // 🔁 chama a API de novo com os filtros
  };

  return (
    <>
      <TableData 
        tableHead={`Receitas`}
        loading={loading}
        error={error}
        valueStartDate={startDate}
        valueEndDate={endDate}
        // @ts-expect-error P4GS
        tableData={revenue} 
        route={'/revenue/edit'}
        newRoute={'/revenue/new'}
        ocdStartDate={setStartDate}
        ocdEndDate={setEndDate}
        onSubmit={handleSubmit}
        icon={(rev) => (
          <Trash
            size={20}
            onClick={async () => {
              if (confirm(`Realmente deseja deletar a receita (${rev.id}: ${rev.description})?`)) {
                await remove(Number(rev.id));
                await refetch();
              }
            }}
          />
        )}
      />
    </>
  );
}
