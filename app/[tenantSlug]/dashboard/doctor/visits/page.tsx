import { getMyTodayVisitsAction } from "@/actions/doctor/get-my-today-visits";
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
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ArrowLeft, CalendarX2, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ tenantSlug: string }>;
}

export default async function DoctorVisitsPage({ params }: Props) {
  const { tenantSlug } = await params;

  // جلب الزيارات باستخدام الأكشن الجديد
  const res = await getMyTodayVisitsAction(tenantSlug);
  const visits = res.success && res.data ? res.data : [];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="زيارات اليوم"
        text={`قائمة الحالات التي قمت بالكشف عليها اليوم - ${format(
          new Date(),
          "dd MMMM yyyy",
          {
            locale: ar,
          },
        )}`}
      />

      <div className="overflow-hidden rounded-2xl border">
        {visits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
              <CalendarX2 className="text-muted-foreground/50 h-10 w-10" />
            </div>
            <h3 className="text-foreground mb-2 text-xl font-bold">
              لا توجد زيارات بعد
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              لم تقم ببدء أي كشف حتى الآن في جلسة اليوم. ابدأ باستدعاء المرضى من
              الطابور.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href={`/${tenantSlug}/dashboard/doctor/queue`}>
                الذهاب لطابور الكشف
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="text-right">المريض</TableHead>
                <TableHead className="text-right">وقت البدء</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="w-37.5 text-left">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.map((visit) => (
                <TableRow
                  key={visit.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="text-foreground font-bold">
                    {visit.patientName}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {format(new Date(visit.startedAt), "hh:mm a", {
                        locale: ar,
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    {visit.status === "Completed" || visit.completedAt ? (
                      <Badge variant="outline">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        مكتملة
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 gap-1 px-2 py-0.5">
                        <Clock className="h-3.5 w-3.5" />
                        قيد الكشف
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-left">
                    <Button
                      variant={
                        visit.status === "Completed" ? "ghost" : "default"
                      }
                      size="sm"
                      asChild
                      className="w-full justify-between"
                    >
                      <Link
                        href={`/${tenantSlug}/dashboard/doctor/visits/${visit.id}`}
                      >
                        {visit.status === "Completed"
                          ? "عرض الروشتة"
                          : "متابعة الكشف"}
                        <ArrowLeft className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardShell>
  );
}
