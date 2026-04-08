import { ClinicOverviewReportDto } from "../../../../../types/backend-types";
import { StatCard } from "./stat-card";

export function OverviewStatsGrid({
  report,
}: {
  report: ClinicOverviewReportDto;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="إجمالي الزيارات"
        value={report.totalVisits ?? 0}
        description={`كشف: ${report.examVisits ?? 0} | استشارة: ${report.consultationVisits ?? 0}`}
      />
      <StatCard
        title="إجمالي المفوتر"
        value={`${(report.totalInvoiced ?? 0).toLocaleString()} ج.م`}
      />
      <StatCard
        title="التحصيل الفعلي"
        value={`${(report.totalCollected ?? 0).toLocaleString()} ج.م`}
        description={`مرتجعات: ${(report.totalRefunded ?? 0).toLocaleString()} ج.م`}
      />
      <StatCard
        title="صافي التدفق"
        value={`${(report.netCashflow ?? 0).toLocaleString()} ج.م`}
        description={`المصروفات: ${(report.totalExpenses ?? 0).toLocaleString()} ج.م`}
      />
    </div>
  );
}
