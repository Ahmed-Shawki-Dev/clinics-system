import type {
  CreatePatientResponse,
  PatientDto,
  PatientSubProfileDto,
  UpsertPatientChronicProfileRequest,
} from "@/types/backend-types";

export type ISubProfile = PatientSubProfileDto;
export type IPatient = PatientDto;
export type ICreatePatientResponse = CreatePatientResponse;
export type IChronicConditions = UpsertPatientChronicProfileRequest;
