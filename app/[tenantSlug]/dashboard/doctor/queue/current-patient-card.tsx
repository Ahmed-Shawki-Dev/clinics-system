"use client";

import { getPatientSummaryAction } from "@/actions/patient/get-patient-summary";
import {
  callTicketAction,
  finishTicketAction,
  skipTicketAction,
  startVisitAction,
} from "@/actions/queue/tickets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ICreateTicketResponse, IQueueTicket } from "@/types/queue";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  FastForward,
  Loader2,
  PlayCircle,
  Stethoscope,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BaseApiResponse } from "../../../../../types/api";

interface Props {
  currentTicket?: IQueueTicket | null;
  waitingTickets: IQueueTicket[];
  isPending: boolean;
  onAction: (
    actionFn: (
      tenantSlug: string,
      ticketId: string,
    ) => Promise<BaseApiResponse<IQueueTicket | ICreateTicketResponse>>,
    ticketId: string,
  ) => void;
}

export function CurrentPatientCard({
  currentTicket,
  waitingTickets,
  isPending,
  onAction,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;
  const [isReturning, setIsReturning] = useState(false);

  const handleReturnToVisit = async () => {
    if (!currentTicket) return;
    if ("visitId" in currentTicket && currentTicket.visitId) {
      router.push(
        `/${tenantSlug}/dashboard/doctor/visits/${currentTicket.visitId}`,
      );
      return;
    }
    setIsReturning(true);
    try {
      const summaryRes = await getPatientSummaryAction(
        tenantSlug,
        currentTicket.patientId,
      );
      if (summaryRes.success && summaryRes.data) {
        const activeVisit = summaryRes.data.recentVisits?.find(
          (v) =>
            v.completedAt === null && v.doctorName === currentTicket.doctorName,
        );
        if (activeVisit)
          router.push(
            `/${tenantSlug}/dashboard/doctor/visits/${activeVisit.id}`,
          );
        else toast.error("لم يتم العثور على سجل زيارة مفتوح لهذا المريض.");
      } else {
        toast.error("فشل في جلب بيانات الزيارة.");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء محاولة العودة للكشف.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Card className="border-border/60 bg-card overflow-hidden border shadow-sm">
      <CardContent className="p-5 sm:p-8">
        {currentTicket ? (
          <div className="space-y-6">
            {/* Header: Responsive Layout */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="space-y-1.5">
                <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                  {currentTicket.patientName}
                </h2>
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <span className="text-primary bg-primary/5 border-primary/10 rounded border px-2 py-0.5 font-mono font-bold">
                    #{currentTicket.ticketNumber}
                  </span>
                  <span className="hidden opacity-40 sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <Stethoscope className="h-4 w-4 opacity-70" />
                    {currentTicket.serviceName || "كشف عام"}
                  </span>
                  <span className="hidden opacity-40 sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 opacity-70" />
                    {new Date(currentTicket.calledAt!).toLocaleTimeString(
                      "ar-EG",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentTicket.isUrgent && (
                  <Badge
                    variant="destructive"
                    className="rounded-md px-2.5 py-0.5 font-bold"
                  >
                    حالة طارئة
                  </Badge>
                )}
                {currentTicket.status === "InVisit" && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 rounded-md px-2.5 py-0.5 font-bold"
                  >
                    قيد الكشف الآن
                  </Badge>
                )}
              </div>
            </div>

            {/* Notes Section: Cleaner Design */}
            {currentTicket.notes && (
              <div className="bg-muted/40 border-primary rounded-l-xl border-r-4 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ClipboardList className="text-primary h-4 w-4" />
                  <span className="text-foreground/70 text-xs font-bold tracking-wider uppercase">
                    ملاحظات الفحص المبدئي
                  </span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed font-medium">
                  {currentTicket.notes}
                </p>
              </div>
            )}

            {/* Actions: Full width on mobile, auto on desktop */}
            <div className="border-border/60 flex flex-wrap items-center gap-3 border-t pt-6">
              {currentTicket.status === "Called" && (
                <>
                  <Button
                    variant="outline"
                    className="h-12 flex-1 rounded-xl px-6 font-bold sm:flex-none"
                    disabled={isPending}
                    onClick={() => onAction(skipTicketAction, currentTicket.id)}
                  >
                    <FastForward className="ml-2 h-4 w-4 opacity-60" /> تخطي
                    المريض
                  </Button>

                  <Button
                    className="shadow-primary/20 h-12 flex-1 rounded-xl px-8 font-bold shadow-lg sm:flex-none"
                    disabled={isPending}
                    onClick={() => onAction(startVisitAction, currentTicket.id)}
                  >
                    <PlayCircle className="ml-2 h-5 w-5" /> بدء الكشف
                  </Button>
                </>
              )}

              {currentTicket.status === "InVisit" && (
                <>
                  <Button
                    variant="outline"
                    className="h-12 flex-1 rounded-xl px-6 font-bold sm:flex-none"
                    disabled={isPending || isReturning}
                    onClick={handleReturnToVisit}
                  >
                    {isReturning ? (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                    {isReturning ? "جاري التحميل..." : "العودة لصفحة الكشف"}
                  </Button>

                  <Button
                    className="shadow-primary/20 h-12 flex-1 rounded-xl px-8 font-bold shadow-lg sm:flex-none"
                    disabled={isPending || isReturning}
                    onClick={() =>
                      onAction(finishTicketAction, currentTicket.id)
                    }
                  >
                    <CheckCircle2 className="ml-2 h-5 w-5" /> إنهاء الزيارة
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Empty State: Focused & Minimal */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-foreground mb-1 text-xl font-bold">
              لا يوجد مريض حالياً
            </h3>
            <p className="text-muted-foreground mb-8 max-w-62.5 text-sm">
              غرفة الكشف فارغة، يمكنك مناداة المريض التالي من قائمة الانتظار.
            </p>
            <Button
              className="h-12 rounded-xl px-10 font-bold shadow-md"
              variant={waitingTickets.length > 0 ? "default" : "secondary"}
              disabled={waitingTickets.length === 0 || isPending}
              onClick={() => onAction(callTicketAction, waitingTickets[0]?.id)}
            >
              <PlayCircle className="ml-2 h-5 w-5" />
              {waitingTickets.length > 0
                ? "نداء المريض التالي"
                : "قائمة الانتظار فارغة"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
