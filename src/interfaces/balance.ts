import { SharedAccount } from "./sharedAccount";

export interface Balance {
  owner: string;
  id: string;
  name: string;
  created_at: string;
  total_incomes: string;
  total_expenses: string;
  total_fixed_expenses: string;
  balance: string;
  account_type: string;
  shared_accounts: SharedAccount[];
}