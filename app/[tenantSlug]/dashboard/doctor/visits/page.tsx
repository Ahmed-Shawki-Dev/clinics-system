import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ArrowLeft, CalendarX2, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

import { getMyVisitsAction } from "@/actions/doctor/get-my-today-visits";
import { PeriodFilter } from "@/components/shared/period-filter";
import { DashboardHeader, DashboardShell } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenericPagination } from "../../../../../components/shared/pagination";

interface Props {
  params: Promise<{ tenantSlug: string }>;
  searchParams: Promise<{
    from?: string;
    to?: string;
    range?: string;
    visitType?: string;
    source?: string;
    page?: string;
  }>;
}

export default async function DoctorVisitsPage({
  params,
  searchParams,
}: Props) {
  const { tenantSlug } = await params;
  const query = await searchParams;

  const currentPage = Number(query.page) || 1;

  // جلب البيانات بالـ Pagination والفلترة
  const res = await getMyVisitsAction(tenantSlug, {
    fromDate: query.from,
    toDate: query.to,
    visitType: query.visitType,
    source: query.source,
    pageNumber: currentPage,
    pageSize: 10,
  });

  const visitsData = res.success && res.data ? res.data : null;
  const visits = visitsData?.items ?? [];

  console.log(visits);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <DashboardHeader
          heading="سجل الزيارات"
          text="متابعة الحالات، الإيرادات، وتفاصيل الكشوفات السابقة."
        />
        <div className="flex items-center gap-2">
          <PeriodFilter />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border shadow-sm">
        {!visitsData || visits.length === 0 ? (
          <EmptyState tenantSlug={tenantSlug} />
        ) : (
          <>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-right">المريض</TableHead>
                  <TableHead className="text-right">الوقت</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-left">الإجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visits.map((visit) => (
                  <TableRow
                    key={visit.id}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="text-foreground font-bold">
                      {visit.patientName ?? "-"}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-xs">
                      {visit.startedAt ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {format(new Date(visit.startedAt), "hh:mm a", {
                            locale: ar,
                          })}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {/* رندرنا الـ Badge هنا مباشرة بدل فايل منفصل عشان طلبك */}
                      {visit.effectiveStatus === "Cancelled" ? (
                        <Badge variant="destructive">ملغية</Badge>
                      ) : visit.status === "Completed" ? (
                        <Badge variant="outline">
                          <CheckCircle2 className="ml-1 h-3 w-3" /> مكتملة
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <Clock className="ml-1 h-3 w-3" /> قيد الكشف
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Link
                          href={`/${tenantSlug}/dashboard/doctor/visits/${visit.id}`}
                        >
                          التفاصيل <ArrowLeft className="mr-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
      {visitsData && visitsData.totalPages > 1 && (
        <GenericPagination
          currentPage={visitsData.pageNumber}
          totalPages={visitsData.totalPages}
          hasNextPage={visitsData.hasNextPage}
          hasPreviousPage={visitsData.hasPreviousPage}
        />
      )}
    </DashboardShell>
  );
}

function EmptyState({ tenantSlug }: { tenantSlug: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <CalendarX2 className="text-muted-foreground/50 h-10 w-10" />
      </div>
      <h3 className="text-foreground mb-2 text-xl font-bold">لا توجد زيارات</h3>
      <p className="text-muted-foreground max-w-sm text-sm">
        لم يتم العثور على أي زيارات في الفترة المحددة. جرب تغيير الفلتر أو ابدأ
        باستقبال مرضى جدد.
      </p>
      <Button asChild className="mt-6" variant="outline">
        <Link href={`/${tenantSlug}/dashboard/doctor/queue`}>
          الذهاب لطابور الكشف
        </Link>
      </Button>
    </div>
  );
}
