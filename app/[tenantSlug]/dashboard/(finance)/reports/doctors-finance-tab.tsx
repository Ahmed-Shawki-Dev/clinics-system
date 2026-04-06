import { getFinanceByDoctorAction } from "@/actions/finance/reports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Stethoscope } from "lucide-react";
import { DoctorDateFilter } from "./doctor-date-filter";

export async function DoctorsFinanceTab({
  tenantSlug,
  date,
}: {
  tenantSlug: string;
  date?: string;
}) {
  const targetDate = date || new Date().toISOString().split("T")[0];
  const response = await getFinanceByDoctorAction(tenantSlug, targetDate);
  const doctors = response?.data || [];

  return (
    <div className="animate-in fade-in space-y-8 duration-500">
      {/* Header Area */}
      <div className="border-border/40 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <h3 className="text-lg font-black tracking-tight">
          أرباح الأطباء ليوم محدد
        </h3>

        <DoctorDateFilter currentDate={targetDate} />
      </div>

      {/* Table Container */}
      <div className="border-border/50 overflow-hidden rounded-2xl border shadow-sm">
        <Table dir="rtl">
          <TableHeader className="bg-muted/20">
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-muted-foreground h-11 text-xs font-semibold">
                اسم الطبيب
              </TableHead>
              <TableHead className="text-muted-foreground h-11 text-center text-xs font-semibold">
                الكشوفات
              </TableHead>
              <TableHead className="text-muted-foreground h-11 text-left text-xs font-semibold">
                الإيراد الكلي
              </TableHead>
              <TableHead className="text-muted-foreground h-11 text-left text-xs font-semibold">
                المحصل الفعلي
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 opacity-60">
                    <Stethoscope className="size-8" />
                    <span className="text-sm font-medium">
                      لا توجد كشوفات مسجلة للأطباء في هذا اليوم
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doc) => (
                <TableRow
                  key={doc.doctorId}
                  className="hover:bg-muted/5 border-border/30 transition-colors"
                >
                  <TableCell className="text-foreground py-4 text-sm font-bold">
                    د. {doc.doctorName}
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <span className="bg-muted/50 border-border/50 inline-flex items-center justify-center rounded-lg border px-2.5 py-1 font-mono text-xs font-bold">
                      {doc.visitCount}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 text-left">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-muted-foreground font-mono text-sm font-medium">
                        {doc.totalPaid?.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground/50 text-[10px] font-bold">
                        ج.م
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-4 text-left">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-foreground font-mono text-sm font-bold">
                        {doc.totalRevenue?.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground/70 text-[10px] font-bold">
                        ج.م
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
