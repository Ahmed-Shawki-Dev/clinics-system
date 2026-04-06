import type {
  DoctorVisitFieldConfigDto,
  EncounterFinancialState,
  EncounterLifecycleState,
  InvoiceDto,
  InvoiceLineItemDto,
  LabRequestDto,
  LabRequestType,
  PatientChronicProfileDto,
  PaymentDto,
  PrescriptionDto,
  StaleOpenVisitDto,
  VisitDto,
  VisitStatus,
  VisitType,
} from "@/types/backend-types";

export type { LabRequestType, VisitStatus, VisitType };
export type LifecycleState = EncounterLifecycleState;
export type FinancialState = EncounterFinancialState;
export type IPrescription = PrescriptionDto;
export type ILabRequest = LabRequestDto;
export type IPayment = PaymentDto;
export type IInvoiceLineItem = InvoiceLineItemDto;
export type IInvoice = InvoiceDto;
export type IChronicProfile = PatientChronicProfileDto;
export type IVisit = VisitDto;
export type DoctorVisitFieldConfig = DoctorVisitFieldConfigDto;
export type IStaleVisit = StaleOpenVisitDto;
