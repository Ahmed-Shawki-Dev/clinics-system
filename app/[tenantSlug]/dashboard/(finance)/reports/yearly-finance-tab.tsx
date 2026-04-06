import { getYearlyFinanceAction } from "@/actions/finance/reports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IMonthlyFinance, IYearlyFinance } from "../../../../../types/finance";

const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

// ============================================================================
// 1. Main Parent Component (Data Fetching & Manipulation)
// ============================================================================
export async function YearlyFinanceTab({
  tenantSlug,
  year,
}: {
  tenantSlug: string;
  year?: string;
}) {
  const targetYear = Number(year) || new Date().getFullYear();
  const response = await getYearlyFinanceAction(tenantSlug, targetYear);
  const originalReport = response?.data;

  if (!originalReport) {
    return (
      <div className="text-muted-foreground border-border/40 bg-muted/5 rounded-xl border py-20 text-center text-sm font-medium">
        لا توجد بيانات لعام {targetYear}
      </div>
    );
  }

  const months = originalReport.months ?? [];

  const report: IYearlyFinance = {
    ...originalReport,
    totalRevenue: originalReport.totalPaid ?? 0,
    totalPaid: originalReport.totalRevenue ?? 0,
    totalExpenses: originalReport.totalExpenses ?? 0,
    netProfit: originalReport.netProfit ?? 0,
    months: months.map((m: IMonthlyFinance) => ({
      ...m,
      totalRevenue: m.totalPaid ?? 0,
      totalPaid: m.totalRevenue ?? 0,
      totalExpenses: m.totalExpenses ?? 0,
      netProfit: m.netProfit ?? 0,
    })),
  };

  return (
    <div className="animate-in fade-in space-y-10 duration-500">
      <div className="border-border/40 border-b pb-4">
        <h2 className="text-foreground text-xl font-bold tracking-tight">
          التقرير السنوي - {targetYear}
        </h2>
      </div>

      <YearlyStatsCards report={report} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <YearlyHorizontalChart months={report.months ?? []} />
        <YearlyDetailsTable months={report.months ?? []} />
      </div>
    </div>
  );
}

// ============================================================================
// 2. Stats Component (Pure Typography, No Icons)
// ============================================================================
function YearlyStatsCards({ report }: { report: IYearlyFinance }) {
  const netProfit = report.netProfit ?? 0;
  const totalExpenses = report.totalExpenses ?? 0;
  const isProfit = netProfit >= 0;

  return (
    <div className="bg-border/40 border-border/40 grid grid-cols-1 gap-px overflow-hidden rounded-xl border md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-background flex flex-col gap-1.5 p-6">
        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
          إجمالي الإيرادات
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-foreground font-mono text-2xl font-bold">
            {(report.totalRevenue ?? 0).toLocaleString()}
          </span>
          <span className="text-muted-foreground text-xs font-medium">EGP</span>
        </div>
      </div>

      <div className="bg-background flex flex-col gap-1.5 p-6">
        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
          المحصل الكلي
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-foreground font-mono text-2xl font-bold">
            {(report.totalPaid ?? 0).toLocaleString()}
          </span>
          <span className="text-muted-foreground text-xs font-medium">EGP</span>
        </div>
      </div>

      <div className="bg-background flex flex-col gap-1.5 p-6">
        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
          المصروفات
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-foreground font-mono text-2xl font-bold">
            {totalExpenses.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-xs font-medium">EGP</span>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-1.5 p-6",
          isProfit ? "bg-emerald-500/5" : "bg-rose-500/5",
        )}
      >
        <span
          className={cn(
            "text-[10px] font-bold tracking-wider uppercase",
            isProfit ? "text-emerald-700" : "text-rose-700",
          )}
        >
          صافي الربح
        </span>
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "font-mono text-2xl font-bold",
              isProfit ? "text-emerald-600" : "text-rose-600",
            )}
          >
            {isProfit ? "+" : ""}
            {netProfit.toLocaleString()}
          </span>
          <span
            className={cn(
              "text-xs font-medium",
              isProfit ? "text-emerald-600/70" : "text-rose-600/70",
            )}
          >
            EGP
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. Chart Component (Horizontal - Clean & Readable)
// ============================================================================
function YearlyHorizontalChart({ months }: { months: IMonthlyFinance[] }) {
  // بنجيب أعلى قيمة عشان نظبط عرض الـ Bars بالنسبة المئوية
  const maxRevenue = Math.max(...months.map((m) => m.totalRevenue ?? 0), 1);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
        مؤشر الإيرادات الشهري
      </h3>
      <div className="bg-background border-border/40 space-y-4 rounded-xl border p-6 shadow-sm">
        {months.map((month) => {
          const monthNumber = month.month;

          if (!monthNumber) {
            return null;
          }

          const totalRevenue = month.totalRevenue ?? 0;
          const widthPercent = (totalRevenue / maxRevenue) * 100;

          return (
            <div key={monthNumber} className="group flex items-center gap-4">
              {/* اسم الشهر */}
              <div className="text-muted-foreground w-12 shrink-0 text-xs font-bold">
                {ARABIC_MONTHS[monthNumber - 1]}
              </div>

              {/* البار الأفقي */}
              <div className="bg-muted/30 h-6 flex-1 overflow-hidden rounded-sm">
                <div
                  className="bg-primary/80 group-hover:bg-primary h-full rounded-sm transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* القيمة */}
              <div className="w-24 shrink-0 text-left">
                <span className="text-foreground font-mono text-sm font-bold">
                  {totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 4. Table Component (Minimalist Auditing)
// ============================================================================
function YearlyDetailsTable({ months }: { months: IMonthlyFinance[] }) {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
        جدول المراجعة (Auditing)
      </h3>
      <div className="bg-background border-border/40 overflow-hidden rounded-xl border shadow-sm">
        <Table dir="rtl">
          <TableHeader className="bg-muted/10">
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-muted-foreground h-10 text-xs font-semibold">
                الشهر
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                الإيرادات
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                المصروفات
              </TableHead>
              <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                الصافي
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {months.map((month) => {
              const monthNumber = month.month;

              if (!monthNumber) {
                return null;
              }

              const totalRevenue = month.totalRevenue ?? 0;
              const totalExpenses = month.totalExpenses ?? 0;
              const netProfit = month.netProfit ?? 0;
              const isProfit = netProfit >= 0;

              return (
                <TableRow
                  key={monthNumber}
                  className="border-border/30 hover:bg-muted/5"
                >
                  <TableCell className="text-foreground py-3 text-xs font-bold">
                    {ARABIC_MONTHS[monthNumber - 1]}
                  </TableCell>

                  <TableCell className="text-foreground py-3 text-left font-mono text-sm">
                    {totalRevenue.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-muted-foreground py-3 text-left font-mono text-sm">
                    {totalExpenses.toLocaleString()}
                  </TableCell>

                  <TableCell className="py-3 text-left">
                    <span
                      className={cn(
                        "font-mono text-sm font-bold",
                        isProfit ? "text-emerald-600" : "text-rose-600",
                      )}
                    >
                      {isProfit ? "+" : ""}
                      {netProfit.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
