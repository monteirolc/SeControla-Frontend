export default interface Expense {
  id?: number;
  balance: string | unknown;
  description: string;
  amount: number;
  date: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  due_day?: undefined;
}