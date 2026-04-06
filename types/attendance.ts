import type {
  AbsenceRecordDto,
  AttendanceRecordDto,
  CheckOutAttendanceRequest,
  CreateAbsenceRecordRequest,
  CreateAttendanceRecordRequest,
} from "@/types/backend-types";

export type AttendanceRecord = AttendanceRecordDto;
export type AbsenceRecord = AbsenceRecordDto;

export type CreateAttendanceInput = CreateAttendanceRecordRequest;
export type CreateAbsenceInput = CreateAbsenceRecordRequest;
export type CheckoutAttendanceInput = CheckOutAttendanceRequest;

export interface AttendanceFilters {
  from?: string;
  to?: string;
  doctorId?: string;
  employeeId?: string;
}

export type WorkforceType = "doctor" | "staff";

export interface WorkforceOption {
  id: string;
  type: WorkforceType;
  label: string;
}
