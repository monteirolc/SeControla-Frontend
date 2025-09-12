export default interface FixedExpense{
  id?: number | string;
  balance: unknown;
  description: string;
  amount: number;
  due_day: number;
  start_date: string;
  end_date?: string;
  created_by?: string;
  active?: boolean;
}