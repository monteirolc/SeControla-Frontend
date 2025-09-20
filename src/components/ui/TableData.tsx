'use client';

import { ReactNode } from "react";
import { Search, FilePlus2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SquarePen from "@/components/ui/SquarePen";
import { DateUi } from "@/components/ui/Date";
import Loader from "@/components/ui/Loader";
import GenericInterface from "@/interfaces/genericInterface";
import { generateRSAKeys } from "@/utils/generateRASKey";
import { encryptJSON } from "@/utils/encryptJSON";
import dateFormated from "@/utils/formatDate";
import stringDate from "@/utils/stringDate";

type rowData = {
  id: number | string | undefined;
  description?: string;
};

type filterDates = {
  startDate: string;
  endDate: string;
}

type TableDataProps = {
  tableHead: string;
  loading: boolean;
  error: string | null;
  errorButton: string;
  valueStartDate?: string | undefined;
  valueEndDate?: string | undefined;
  tableData: GenericInterface[];
  route: string;
  newRoute: string;
  ocdStartDate: (value: string) => void;
  ocdEndDate: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, dates: filterDates) => void | Promise<void>;
  icon: (row: rowData) => ReactNode;
}

export default function TableData({
  tableHead, loading, error, valueStartDate, ocdStartDate, newRoute,
  valueEndDate, tableData, route, icon, ocdEndDate, onSubmit}: TableDataProps){
  
  const generic: (GenericInterface[] | GenericInterface) = Array.isArray(tableData) ? [...tableData] : [];
  const router = useRouter();

  const editRoute = async (value: number) =>{
    
    if(!generic) return '';

    // 🔑 Gerar chave RSA
    const { publicKey, privateKey } = await generateRSAKeys();
    // 🔒 Criptografar
    const encrypted = await encryptJSON(publicKey, generic[value]);
    
    const params = new URLSearchParams({"Q": encrypted.encryptedData,
      "K": JSON.stringify(await window.crypto.subtle.exportKey("jwk", privateKey)),
      "iv": encrypted.iv,
      "e": encrypted.encryptedAESKey,});
    router.push(`${route}?${params.toString()}`);
  }
  
  return(
    <main className="p-6 min-h-screen dark:bg-gray-950">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-2xl shadow">
        <div className="flex flex-content center-item">
          <h1 className="text-2xl font-bold mb-4">{tableHead}</h1>
          <Link href={newRoute}
            className="ml-10 mb-2 px-4 py-2 bg-blue-600 text-aling-center text-white rounded-md hover:bg-blue-700">
            <FilePlus2Icon size={20}/>
          </Link>
        </div>
        {/* Filtros */}
        <form onSubmit={(e) =>
          onSubmit?.(e, {
            startDate: String(valueStartDate),
            endDate: String(valueEndDate),
            })
          } 
        >
          <div className="flex space-x-4 mb-4">
            <DateUi text="De:" value={valueStartDate || "01/01/2025"} onChange={ocdStartDate} disabled={false}/>
            <DateUi text="-  Até:" value={valueEndDate || "31/12/2025"} onChange={ocdEndDate} disabled={false}/>

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
          {!generic || generic.length === 0 ? (
            <p>Nenhuma receita encontrada.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  {generic.some(item => 'description' in item) && <th className="py-2">Descrição</th>}
                  {generic.some(item => 'due_day' in item) && <th className="py-2">Dia cobrança</th>}
                  {generic.some(item => 'date' in item) && <th className="py-2">Data</th>}
                  {generic.some(item => 'amount' in item) && <th className="py-2">Valor</th>}
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {generic.map((rev: GenericInterface, index: number) => (
                  <tr key={rev.id} className="border-b">
                    {rev.description ? <td>{rev.description}</td> : null}
                    {rev.due_day ? <td> {dateFormated(String(rev.due_day))} </td>: null }
                    {rev.date ? <td> {dateFormated(stringDate(rev.date))} </td>: null }
                    {rev.amount ? <td className="font-medium"> R$ {Number(rev.amount).toFixed(2).replace(".", ",")} </td> : null }
                    <td className="text-right">
                      <SquarePen 
                        size={20}
                        onClick={() => editRoute(index)}
                      />
                      {icon && icon(rev)}{}
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