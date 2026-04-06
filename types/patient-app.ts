import type {
  PatientCreditBalanceDto,
  PatientCreditTransactionDto,
  PatientSummaryDto,
} from "@/types/backend-types";

export type IPatientSummary = PatientSummaryDto;
export type ICreditBalance = PatientCreditBalanceDto;
export type ICreditHistoryItem = PatientCreditTransactionDto;
