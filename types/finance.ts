// أرباح الدكتور الواحد
export interface IDoctorProfit {
  doctorId: string
  doctorName: string
  totalRevenue: number
  totalPaid: number
  visitCount: number
}

// التقرير الشامل (Profit)
export interface IProfitReport {
  from: string
  to: string
  totalRevenue: number
  totalPaid: number
  totalExpenses: number
  netProfit: number
  invoiceCount: number
  expenseCount: number
  byDoctor: IDoctorProfit[]
}

// التقرير اليومي (Daily)
export interface IDailyFinance {
  date: string
  totalRevenue: number
  totalPaid: number
  totalUnpaid: number
  invoiceCount: number
  paymentCount: number
}

// التقرير الشهري (Monthly) - بيستخدم جوه السنوي كمان
export interface IMonthlyFinance {
  year: number
  month: number
  totalRevenue: number
  totalPaid: number
  totalExpenses: number
  netProfit: number
  invoiceCount: number
}

// التقرير السنوي (Yearly)
export interface IYearlyFinance {
  year: number
  totalRevenue: number
  totalPaid: number
  totalExpenses: number
  netProfit: number
  invoiceCount: number
  months: IMonthlyFinance[]
}
