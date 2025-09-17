import {useExpense} from "@/hooks/useExpense";
import {useFixedExpense} from "@/hooks/useFixedExpense";
import {useRevenue} from "@/hooks/useRevenue";
import getDate from "@/utils/getDate"
import { HookType } from "@/types/hookeType";


export default function useRefetch(type: HookType, token: string, startDate?: string, endDate?: string): Promise<boolean | undefined>{
  const currentDate = getDate();
  const start = !startDate ? currentDate.firstDay : startDate;
  const end = !endDate ? currentDate.lastDay : endDate; 
  let data
  switch(type){
    case "revenue":  // eslint-disable-next-line
      data = useRevenue(token);
    case "expense":  // eslint-disable-next-line
      data = useExpense(token);
    case "fixedExpense":  // eslint-disable-next-line
      data = useFixedExpense(token);
  }
  return  data.refetch(start, end);
}