export type WorkforceType = "doctor" | "staff";

export interface AttendanceFiltersState {
  from?: string;
  to?: string;
  personType?: "all" | WorkforceType;
  personId?: string;
}

export interface WorkerOption {
  id: string;
  label: string;
}

export interface WorkforceOptionsMap {
  doctor: WorkerOption[];
  staff: WorkerOption[];
}