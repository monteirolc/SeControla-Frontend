import { SharedAccounts } from "@/types/sharedAccounts"

export default interface GenericInterface {
  id: string | number;
  balance?: string;
  owner?: string;
  user?: string;
  name?: string;
  due_day?: string | number;
  description?: string;
  amount?: number;
  created_at?: string;
  created_by?: string;
  date?: string;
  updated_at?: string;
  total_incomes?: string;
  total_expenses?: string;
  total_fixed_expenses?: string;
  account_type?: string;
  shared_accounts?: SharedAccounts[];
  user_username?: string;
  first_name_shared?: string;
  refetch: () => void;
}