import { BaseApiResponse, IPaginatedData } from "@/types/api";
import { IVisit } from "@/types/visit";
import { fetchApi } from "../../lib/fetchApi";

export async function getMyVisitsAction(
  tenantSlug: string,
  params: {
    pageNumber?: number;
    pageSize?: number;
    fromDate?: string;
    toDate?: string;
    visitType?: string;
    source?: string;
  },
): Promise<BaseApiResponse<IPaginatedData<IVisit>>> {
  const query = new URLSearchParams();
  query.set("pageNumber", String(params.pageNumber || 1));
  query.set("pageSize", String(params.pageSize || 10));

  if (params.fromDate) query.set("fromDate", params.fromDate);
  if (params.toDate) query.set("toDate", params.toDate);
  if (params.visitType && params.visitType !== "all")
    query.set("visitType", params.visitType);
  if (params.source && params.source !== "all")
    query.set("source", params.source);

  return await fetchApi<IPaginatedData<IVisit>>(
    `/api/clinic/visits/my?${query.toString()}`,
    {
      method: "GET",
      tenantSlug,
      cache: "no-store",
    },
  );
}
