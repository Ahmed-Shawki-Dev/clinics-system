import { getDoctorMyOverviewReportAction } from "@/actions/reports/clinic-reports";
import { PeriodFilter } from "@/components/shared/period-filter";
import { DashboardHeader, DashboardShell } from "@/components/shell";
import { Card } from "@/components/ui/card";
import { DoctorCompensationList } from "./doctor-compensation-list";
import { OverviewStatsGrid } from "./overview-stats-grid";

interface Props {
  params: Promise<{ tenantSlug: string }>;
  searchParams: Promise<{
    from?: string;
    to?: string;
    visitType?: string;
    source?: string;
  }>;
}

export default async function DoctorReportsPage({
  params,
  searchParams,
}: Props) {
  const { tenantSlug } = await params;
  const query = await searchParams;

  const res = await getDoctorMyOverviewReportAction(tenantSlug, {
    from: query.from,
    to: query.to,
    visitType: query.visitType,
    source: query.source,
  });

  const report = res.success ? res.data : null;

  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <DashboardHeader
          heading="تقارير الأداء"
          text="تحليل شامل للزيارات، الإيرادات، والاستحقاقات المالية."
        />
        <div className="flex items-center gap-2">
          <PeriodFilter />
        </div>
      </div>

      {!report ? (
        <Card className="bg-destructive/5 border-destructive/20 p-12 text-center">
          <p className="text-destructive font-medium">
            عذراً، فشل تحميل التقرير
          </p>
          <p className="text-muted-foreground text-sm">
            {res.message || "تأكد من اتصالك بالشبكة أو صلاحياتك."}
          </p>
        </Card>
      ) : (
        <div className="mt-6 space-y-6">
          <DoctorCompensationList doctors={report.doctors ?? []} />
          <OverviewStatsGrid report={report} />
        </div>
      )}
    </DashboardShell>
  );
}
