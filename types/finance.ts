import type {
  DailyRevenueDto,
  DoctorRevenueDto,
  MonthlyRevenueDto,
  ProfitReportDto,
  YearlyRevenueDto,
} from "@/types/backend-types";

export type IDoctorProfit = DoctorRevenueDto;
export type IProfitReport = ProfitReportDto;
export type IDailyFinance = DailyRevenueDto;
export type IMonthlyFinance = MonthlyRevenueDto;
export type IYearlyFinance = YearlyRevenueDto;
