export interface IExpense {
  id: string;
  category: string;
  amount: number;
  notes: string | null;
  expenseDate: string;
  recordedByUserId: string; // 👈 اتضافت
  recordedByName: string; // 👈 اتضافت
  createdAt: string;
}
