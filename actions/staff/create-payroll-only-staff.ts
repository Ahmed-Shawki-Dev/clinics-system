"use server";

import { fetchApi } from "@/lib/fetchApi";
import { BaseApiResponse } from "@/types/api";
import { IStaff } from "@/types/staff";
import { revalidatePath } from "next/cache";
import { CreatePayrollOnlyStaffInput } from "../../validation/staff";

export async function createPayrollOnlyStaffAction(
  data: CreatePayrollOnlyStaffInput,
  tenantSlug: string,
): Promise<BaseApiResponse<IStaff>> {
  const res = await fetchApi<IStaff>("/api/clinic/staff/payroll-only", {
    method: "POST",
    body: JSON.stringify(data),
    tenantSlug,
  });

  if (res.success) {
    revalidatePath(`/${tenantSlug}/dashboard/staff`);
  }

  return res;
}
