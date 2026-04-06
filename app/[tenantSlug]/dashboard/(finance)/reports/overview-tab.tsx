import { getProfitReportAction } from "@/actions/finance/reports";
import { PeriodFilter } from "@/components/shared/period-filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export async function OverviewTab({
  tenantSlug,
  from,
  to,
}: {
  tenantSlug: string;
  from?: string;
  to?: string;
}) {
  const today = new Date();
  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate(),
  );
  const actualFrom = from || lastYear.toISOString().split("T")[0];
  const actualTo = to || today.toISOString().split("T")[0];

  const response = await getProfitReportAction(
    tenantSlug,
    actualFrom,
    actualTo,
  );
  const report = response?.data;

  if (!report) {
    return (
      <div className="text-muted-foreground bg-muted/10 flex flex-col items-center justify-center rounded-xl border border-dashed py-20">
        <p className="text-sm font-medium">
          لا توجد بيانات مالية لهذه الفترة المحددة.
        </p>
      </div>
    );
  }

  const totalPaid = report.totalPaid ?? 0;
  const totalRevenue = report.totalRevenue ?? 0;
  const totalExpenses = report.totalExpenses ?? 0;
  const invoiceCount = report.invoiceCount ?? 0;
  const expenseCount = report.expenseCount ?? 0;
  const byDoctor = report.byDoctor ?? [];
  const netProfit = report.netProfit ?? 0;
  const isProfit = netProfit >= 0;

  return (
    <div className="animate-in fade-in space-y-10 duration-500">
      {/* Header Area */}
      <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-black tracking-tight">
            نظرة عامة على الأداء
          </h3>
        </div>
        <PeriodFilter />
      </div>

      {/* 1. Metric Blocks (Stripe-like Minimalist Grid) */}
      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <div className="divide-border/60 grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0 md:divide-x-reverse lg:grid-cols-4">
          {/* Revenue */}
          <div className="flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              إجمالي الإيرادات
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-2xl font-black tracking-tight">
                {totalPaid.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-xs font-semibold">
                ج.م
              </span>
            </div>
            <span className="text-muted-foreground mt-1 text-xs">
              تشمل المديونيات غير المحصلة
            </span>
          </div>

          {/* Cash Collected */}
          <div className="flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              المحصل الفعلي
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-2xl font-black tracking-tight">
                {totalRevenue.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-xs font-semibold">
                ج.م
              </span>
            </div>
            <span className="text-muted-foreground mt-1 text-xs">
              من إجمالي{" "}
              <span className="text-foreground font-bold">
                {invoiceCount}
              </span>{" "}
              فاتورة
            </span>
          </div>

          {/* Expenses */}
          <div className="flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              المصروفات التشغيلية
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-2xl font-black tracking-tight">
                {totalExpenses.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-xs font-semibold">
                ج.م
              </span>
            </div>
            <span className="text-muted-foreground mt-1 text-xs">
              موزعة على{" "}
              <span className="text-foreground font-bold">
                {expenseCount}
              </span>{" "}
              عملية صرف
            </span>
          </div>

          {/* Net Profit (Dynamic Color Accent) */}
          <div
            className={cn(
              "relative flex flex-col gap-2 overflow-hidden p-6",
              isProfit ? "bg-emerald-500/5" : "bg-rose-500/5",
            )}
          >
            {/* Accent Line */}
            <div
              className={cn(
                "absolute top-0 right-0 bottom-0 w-1",
                isProfit ? "bg-emerald-500" : "bg-rose-500",
              )}
            />

            <span
              className={cn(
                "text-[10px] font-bold tracking-wider uppercase",
                isProfit
                  ? "text-emerald-700 dark:text-emerald-500"
                  : "text-rose-700 dark:text-rose-500",
              )}
            >
              صافي الربح
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={cn(
                  "font-mono text-3xl font-black tracking-tight",
                  isProfit
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400",
                )}
              >
                {isProfit ? "+" : ""}
                {netProfit.toLocaleString()}
              </span>
              <span
                className={cn(
                  "text-xs font-bold",
                  isProfit ? "text-emerald-600/70" : "text-rose-600/70",
                )}
              >
                ج.م
              </span>
            </div>
            <span className="text-muted-foreground mt-1 text-xs font-medium">
              بعد خصم المصروفات من المحصل
            </span>
          </div>
        </div>
      </div>

      {/* 2. Doctor Performance Table (Clean UI) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
            أداء الأطباء
          </h3>
        </div>

        <div className="overflow-hidden rounded-xl border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-muted-foreground h-10 text-xs font-semibold">
                  اسم الطبيب
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-center text-xs font-semibold">
                  الكشوفات
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                  الإيراد الكلي
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                  المحصل الفعلي
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {byDoctor.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground h-24 text-center text-xs font-medium"
                  >
                    لا توجد بيانات مسجلة للأطباء في هذه الفترة
                  </TableCell>
                </TableRow>
              ) : (
                byDoctor.map((doc) => (
                  <TableRow
                    key={doc.doctorId}
                    className="hover:bg-muted/10 border-border/30 transition-colors"
                  >
                    <TableCell className="text-foreground py-3 text-sm font-semibold">
                      د. {doc.doctorName}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="bg-muted inline-flex items-center justify-center rounded-md px-2 py-1 font-mono text-xs font-bold">
                        {doc.visitCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-3 text-left font-mono text-sm font-medium">
                      {(doc.totalPaid ?? 0).toLocaleString()} ج.م
                    </TableCell>
                    <TableCell className="text-foreground py-3 text-left font-mono text-sm font-bold">
                      {(doc.totalRevenue ?? 0).toLocaleString()} ج.م
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
