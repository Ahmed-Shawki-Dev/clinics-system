// actions/reports/clinic-reports.ts
import { fetchApi } from "@/lib/fetchApi";
import { BaseApiResponse } from "@/types/api";
import { ClinicOverviewReportDto } from "../../types/backend-types";

export async function getDoctorMyOverviewReportAction(
  tenantSlug: string,
  filters: {
    from?: string;
    to?: string;
    visitType?: string;
    source?: string;
  } = {},
): Promise<BaseApiResponse<ClinicOverviewReportDto>> {
  const query = new URLSearchParams();
  if (filters.from) query.set("from", filters.from);
  if (filters.to) query.set("to", filters.to);
  if (filters.visitType) query.set("visitType", filters.visitType);
  if (filters.source) query.set("source", filters.source);

  return await fetchApi<ClinicOverviewReportDto>(
    `/api/clinic/reports/my-overview?${query.toString()}`,
    {
      method: "GET",
      tenantSlug,
      cache: "no-store",
    },
  );
}
