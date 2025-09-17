"use client";

import { useState } from "react";
import useExpense from "@/hooks/useExpense";
import Trash from "@/components/ui/Trash";
import TableData from "@/components/ui/TableData";

export default function ExpensePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  const { expense, loading, error, remove, refetch} = useExpense(token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, dates: { startDate: string; endDate: string }) => {
    e.preventDefault();
    await refetch(dates.startDate, dates.endDate);
  };

  return (
    <>
          <TableData 
            tableHead={`Despesas`}
            loading={loading}
            error={error}
            valueStartDate={startDate}
            valueEndDate={endDate}
            // @ts-expect-error P4GS
            tableData={expense} 
            route={'/expense/edit'}
            newRoute={'expense/new'}
            ocdStartDate={setStartDate}
            ocdEndDate={setEndDate}
            onSubmit={handleSubmit}
            icon={(rev) => (
              <Trash
                size={20}
                onClick={async () => {
                  if (confirm(`Realmente deseja deletar a despesa (${rev.id}: ${rev.description})?`)) {
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
