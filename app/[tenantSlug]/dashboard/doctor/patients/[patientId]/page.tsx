import { DashboardHeader, DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { getMyPatientHistoryAction } from "../../../../../../actions/doctor/get-patient-history";
import { VisitCard } from "./visit-card";
import { GenericPagination } from "../../../../../../components/shared/pagination";

interface Props {
  params: Promise<{ tenantSlug: string; patientId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PatientHistoryPage({
  params,
  searchParams,
}: Props) {
  const { tenantSlug, patientId } = await params;
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;

  // جلب داتا السجل الطبي
  const res = await getMyPatientHistoryAction(tenantSlug, patientId, page, 5);
  const paginatedData = res.data;
  const visits = paginatedData?.items || [];

  // هنجيب اسم المريض من أول زيارة لو موجودة عشان نعرضه في الهيدر
  const patientName = visits.length > 0 ? visits[0].patientName : "المريض";

  return (
    <DashboardShell>
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading={`السجل الطبي: ${patientName}`}
          text="تاريخ الزيارات السابقة والتشخيصات والأدوية"
        />
        {/* زرار الرجوع للستة المرضى */}
        <Button variant="outline" asChild>
          <Link href={`/${tenantSlug}/dashboard/doctor/patients`}>
            <ArrowRight className="ml-2 h-4 w-4" />
            عودة للقائمة
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        {visits.length === 0 ? (
          <div className="bg-muted/10 flex flex-col items-center justify-center rounded-lg border py-24 text-center">
            <History className="text-muted-foreground/50 mb-4 h-12 w-12" />
            <h3 className="text-foreground text-lg font-bold">
              لا يوجد سجل طبي
            </h3>
            <p className="text-muted-foreground mt-1">
              لم يتم تسجيل أي زيارات سابقة لهذا المريض.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* رص كروت الزيارات */}
            {visits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} />
            ))}
          </div>
        )}

        {/* الباجينيشن */}
        {paginatedData && paginatedData.totalPages > 1 && (
          <div className="pt-4">
            <GenericPagination
              currentPage={paginatedData.pageNumber}
              totalPages={paginatedData.totalPages}
              hasNextPage={paginatedData.hasNextPage}
              hasPreviousPage={paginatedData.hasPreviousPage}
            />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
