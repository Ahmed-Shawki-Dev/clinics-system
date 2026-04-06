"use server";

import { getDoctorsAction } from "@/actions/doctor/get-doctors";
import { getAllStaffAction } from "@/actions/staff/get-staff";
import { fetchApi } from "@/lib/fetchApi";
import {
  AbsenceRecordDto,
  AttendanceRecordDto,
  CheckOutAttendanceRequest,
  CreateAbsenceRecordRequest,
  CreateAttendanceRecordRequest,
} from "@/types/backend-types";
import { IDoctor } from "@/types/doctor";
import { IStaff } from "@/types/staff";

export interface IWorkforceQueryParams {
  from?: string;
  to?: string;
  doctorId?: string;
  employeeId?: string;
}

export interface IWorkforceOptionsResult {
  doctors: IDoctor[];
  staff: IStaff[];
}

export async function getWorkforceOptionsAction(
  tenantSlug: string,
): Promise<IWorkforceOptionsResult> {
  const [doctorsResponse, staff] = await Promise.all([
    getDoctorsAction(tenantSlug),
    getAllStaffAction(tenantSlug),
  ]);

  return {
    doctors: doctorsResponse.doctors,
    staff,
  };
}

export async function createAttendanceAction(
  tenantSlug: string,
  data: CreateAttendanceRecordRequest,
) {
  return await fetchApi<AttendanceRecordDto>(
    "/api/clinic/workforce/attendance",
    {
      method: "POST",
      body: JSON.stringify(data),
      tenantSlug,
      authType: "staff",
    },
  );
}

// 2. جلب الحضور (List Attendance)
export async function getAttendanceListAction(
  tenantSlug: string,
  params: IWorkforceQueryParams,
) {
  const searchParams = new URLSearchParams();
  if (params.from) searchParams.append("from", params.from);
  if (params.to) searchParams.append("to", params.to);
  if (params.doctorId) searchParams.append("doctorId", params.doctorId);
  if (params.employeeId) searchParams.append("employeeId", params.employeeId);

  return await fetchApi<AttendanceRecordDto[]>(
    `/api/clinic/workforce/attendance?${searchParams.toString()}`,
    {
      method: "GET",
      tenantSlug,
      authType: "staff",
      cache: "no-store",
    },
  );
}

// 3. تسجيل إجازة/غياب (Create Absence)
export async function createAbsenceAction(
  tenantSlug: string,
  data: CreateAbsenceRecordRequest,
) {
  return await fetchApi<AbsenceRecordDto>("/api/clinic/workforce/absence", {
    method: "POST",
    body: JSON.stringify(data),
    tenantSlug,
    authType: "staff",
  });
}

// 4. جلب الإجازات (List Absence)
export async function getAbsenceListAction(
  tenantSlug: string,
  params: IWorkforceQueryParams,
) {
  const searchParams = new URLSearchParams();
  if (params.from) searchParams.append("from", params.from);
  if (params.to) searchParams.append("to", params.to);
  if (params.doctorId) searchParams.append("doctorId", params.doctorId);
  if (params.employeeId) searchParams.append("employeeId", params.employeeId);

  return await fetchApi<AbsenceRecordDto[]>(
    `/api/clinic/workforce/absence?${searchParams.toString()}`,
    {
      method: "GET",
      tenantSlug,
      authType: "staff",
      cache: "no-store",
    },
  );
}

// 5. تسجيل انصراف (Check-Out)
export async function checkoutAttendanceAction(
  tenantSlug: string,
  attendanceId: string,
  data: CheckOutAttendanceRequest,
) {
  return await fetchApi<AttendanceRecordDto>(
    `/api/clinic/workforce/attendance/${attendanceId}/checkout`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      tenantSlug,
      authType: "staff",
    },
  );
}
