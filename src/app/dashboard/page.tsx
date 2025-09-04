"use client";

// import { useEffect, useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import { SharedAccounts } from "@/hooks/useBalance";

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

  const balanceResult = (data: typeof balance) => {
    if (!data) return 0;

    return Object.values(data).reduce((acc, item) => {
      const value = Number(item.balance);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
  }

  const accounts__ = (data: SharedAccounts) => {
    if (!data || data.length === 0) return null;
    
    return data.map(account => account.first_name_shared);
  }

  return (
    <main className="flex items-center justify-center min-h-screen dark:bg-gray-950">
      <div className="w-full max-w-2xl p-6 dark:bg-gray-700 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        {balance && balance.length > 0 ? (
        <div className="space-y-4">
          <strong className="p-1 justify-center">
            {balanceResult(balance) > 0 ? (
              <p className="text-green-500">{`Balanço: R$${(balanceResult(balance)).toFixed(2).replace(".", ",")}`}</p>
            ) : (
              <p className="text-red-500">{`Balanço: R$${balanceResult(balance).toFixed(2).replace(".", ",")}`}</p>
            )}
          </strong>
          {balance.map(item => (
            <div key={item.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Criado em: {new Date(item.created_at).toLocaleString("pt-BR")}
              </p>
              {(() => {
                switch(item.account_type){
                  case "i":
                    return (
                      <p className="text-sm text-green-500">
                        Ganhos por carteira: R${Number(item.total_incomes).toFixed(2).replace(".", ",")}
                      </p>
                    )
                  case "e":
                    return (
                      <p className="text-sm text-red-500">
                        Gastos por carteira: R${Number(item.total_expenses).toFixed(2).replace(".", ",")}
                      </p>
                    )
                  case "fe":
                    return (
                      <p className="text-sm text-red-500">
                        Gasto fixo por carteira: R${Number(item.total_fixed_expenses).toFixed(2).replace(".", ",")}
                      </p>
                    )
                  case "fi":
                    return (
                      <p className="text-sm text-blue-500">
                        Ganho fixo por carteira: R${("0,00")}
                      </p>
                    )
                }
              })()}
              <p className="text-[9px] text-gray-200">Proprietário: {item.owner}</p>
              {accounts__(item.shared_accounts) === null ? (<p></p>) : (
                <p className="text-[9px] text-gray-200">Conta compartilhada: { accounts__(item.shared_accounts) }</p>
              )}
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
