"use client";

import {
  getPatientQueueTicketAppAction,
  getPatientSummaryAppAction,
} from "@/actions/patient-app/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import {
  Activity,
  AlertCircle,
  CalendarDays,
  Clock,
  FileText,
  Ticket,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ProfileSwitcher } from "../../../../components/patient/profile-switcher";

export default function PatientHomePage() {
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;

  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);
  const activeProfileId = authData?.activeProfileId;

  const { data: summaryRes, isLoading: loadingSummary } = useSWR(
    activeProfileId ? ["patientSummary", tenantSlug, activeProfileId] : null,
    () => getPatientSummaryAppAction(tenantSlug, activeProfileId!),
  );

  const { data: ticketRes, isLoading: loadingTicket } = useSWR(
    activeProfileId ? ["patientTicket", tenantSlug, activeProfileId] : null,
    () => getPatientQueueTicketAppAction(tenantSlug, activeProfileId!),
    { refreshInterval: 10000 },
  );

  const summary = summaryRes?.data;
  const ticket = ticketRes?.data;

  if (!activeProfileId) return null; // أو Placeholder للملف الشخصي

  return (
    <div className="animate-in fade-in max-w-full space-y-8 overflow-x-hidden p-4 pb-24 duration-500">
      {/* هيدر محمي من السكرول */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-foreground truncate text-2xl font-bold tracking-tight">
          الرئيسية
        </h2>
        <div className="shrink-0">
          <ProfileSwitcher tenantSlug={tenantSlug} />
        </div>
      </div>

      {/* التذكرة النشطة أو الـ Placeholder */}
      <div className="space-y-3">
        <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
          <Ticket className="h-4 w-4" /> تذكرة العيادة الحالية
        </h3>

        {loadingTicket ? (
          <Skeleton className="h-48 w-full rounded-2xl" />
        ) : ticket ? (
          <Card className="border-border/50 bg-background overflow-hidden rounded-2xl shadow-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-around px-4 py-8">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-muted-foreground text-[10px] font-bold uppercase">
                    دورك
                  </span>
                  <span className="text-foreground text-5xl font-black tracking-tighter">
                    {ticket.myQueueNumber || ticket.ticketNumber}
                  </span>
                </div>
                <div className="bg-border/40 h-12 w-px" />
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-muted-foreground text-[10px] font-bold uppercase">
                    الحالي
                  </span>
                  <span className="text-primary text-5xl font-black tracking-tighter">
                    {ticket.currentServingNumber || "--"}
                  </span>
                </div>
              </div>

              <div className="bg-muted/30 border-border/40 space-y-3 border-t p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={ticket.isUrgent ? "destructive" : "secondary"}
                    className="rounded-full px-3"
                  >
                    {ticket.status === "Called"
                      ? "تفضل بالدخول"
                      : ticket.status === "Waiting"
                        ? "في الانتظار"
                        : "في الكشف"}
                  </Badge>
                  <span className="text-muted-foreground max-w-37.5 truncate text-[11px] font-bold">
                    د. {ticket.doctorName}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-background border-border/40 flex items-center gap-2 rounded-xl border p-2.5">
                    <Users className="text-primary h-3.5 w-3.5" />
                    <span className="text-xs font-bold uppercase">
                      أمامك: {ticket.patientsAheadCount || 0}
                    </span>
                  </div>
                  <div className="bg-background border-border/40 flex items-center gap-2 rounded-xl border p-2.5">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    <span className="truncate text-xs font-bold">
                      {ticket.estimatedWaitText || "..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          /* Placeholder في حالة عدم وجود تذكرة */
          <Card className="border-border/60 bg-muted/5 rounded-2xl border-dashed shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-muted/50 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <AlertCircle className="text-muted-foreground/40 h-6 w-6" />
              </div>
              <p className="text-muted-foreground/60 text-sm font-bold">
                لا توجد تذاكر حجز نشطة حالياً
              </p>
              <p className="text-muted-foreground/40 mt-1 text-[10px]">
                يمكنك الحجز من خلال زيارة العيادة
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ملخص الزيارات */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-bold">
            <Activity className="h-4 w-4" /> آخر الزيارات
          </h3>
          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-[10px] font-bold">
            {summary?.totalVisits || 0} زيارة
          </span>
        </div>

        {loadingSummary ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : summary?.recentVisits?.length ? (
          <Card className="border-border/40 overflow-hidden rounded-2xl shadow-sm">
            <div className="divide-border/40 divide-y">
              {summary.recentVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="hover:bg-muted/10 flex items-center justify-between p-4 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">د. {visit.doctorName}</p>
                    <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-medium">
                      <CalendarDays className="h-3 w-3" />
                      {new Date(visit.startedAt).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border/60 text-[10px] font-bold"
                  >
                    {visit.diagnosis ? "تم التشخيص" : "كشف"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="border-border/60 rounded-2xl border-dashed bg-transparent shadow-none">
            <CardContent className="text-muted-foreground flex flex-col items-center justify-center py-10">
              <FileText className="mb-2 h-8 w-8 opacity-20" />
              <p className="text-xs font-bold">لا توجد زيارات سابقة</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
