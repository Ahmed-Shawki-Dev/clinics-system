"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getMyTicketAction } from "../../actions/patient-app/get-my-ticket";

export function LiveQueueStatus({ tenantSlug }: { tenantSlug: string }) {
  const { data: response, isLoading } = useSWR(
    ["live-patient-ticket", tenantSlug],
    () => getMyTicketAction(tenantSlug),
    { refreshInterval: 10000, refreshWhenHidden: false },
  );

  // 1. Minimal Skeleton (No big blobs, just structural lines)
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="bg-muted h-4 w-20 rounded" />
        <div className="bg-card h-48 rounded-xl border" />
      </div>
    );
  }

  const ticket = response?.data;

  // TODO: هنستبدل دول لما الباك إند يبعتهم في الـ API زي ما اتفقنا
  const mockedCurrentServing = ticket
    ? Math.max(1, ticket.ticketNumber - 2)
    : 0;
  const mockedPeopleAhead = ticket
    ? Math.max(0, ticket.ticketNumber - mockedCurrentServing - 1)
    : 0;

  // 2. Empty State (Vercel Style: Dashed border, completely muted)
  if (!response?.success || !ticket) {
    return (
      <div className="bg-muted/10 flex flex-col items-center justify-center space-y-3 rounded-xl border border-dashed p-8 text-center">
        <div className="bg-muted rounded-full p-3">
          <Calendar className="text-muted-foreground h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-foreground text-sm font-medium">لا يوجد دور نشط</p>
          <p className="text-muted-foreground text-xs">
            ليس لديك تذاكر في طابور الانتظار اليوم.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-2 text-xs">
          <Link href={`/${tenantSlug}/patient/book`}>حجز موعد جديد</Link>
        </Button>
      </div>
    );
  }

  // 3. Active Ticket State (Ultra Minimal)
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-muted-foreground text-sm font-medium">
          دورك الحالي
        </h2>
        {ticket.status === "Waiting" && (
          <span className="flex items-center gap-2 text-[10px] font-medium tracking-wider text-emerald-600 uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            تحديث مباشر
          </span>
        )}
      </div>

      {/* Main Ticket Container (Clean borders, divide-y, no shadows) */}
      <div className="bg-background flex flex-col overflow-hidden rounded-xl border">
        {/* Top Section: Ticket Number */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
              رقم التذكرة
            </p>
            <p className="text-foreground font-mono text-5xl font-semibold tracking-tighter">
              {ticket.ticketNumber}
            </p>
          </div>
          <div className="text-left">
            <Badge
              variant="secondary"
              className={`rounded-md px-2.5 py-0.5 text-xs font-normal ${
                ticket.status === "Called"
                  ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"
                  : ticket.status === "InVisit"
                    ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/10"
                    : ""
              }`}
            >
              {ticket.status === "Waiting"
                ? "في الانتظار"
                : ticket.status === "Called"
                  ? "تفضل بالدخول"
                  : ticket.status === "InVisit"
                    ? "داخل العيادة"
                    : ticket.status}
            </Badge>
          </div>
        </div>

        {/* Middle Section: The Context (Grid with dividers) */}
        <div className="bg-muted/20 grid grid-cols-2 divide-x border-b divide-x-reverse">
          <div className="flex flex-col items-center justify-center space-y-1 p-4">
            <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
              يكشف الآن
            </span>
            <span className="text-foreground font-mono text-xl font-medium">
              {mockedCurrentServing > 0 ? `#${mockedCurrentServing}` : "--"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1 p-4">
            <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
              أمامك
            </span>
            <span className="text-foreground font-mono text-xl font-medium">
              {mockedPeopleAhead > 0 ? `${mockedPeopleAhead}` : "0"}
            </span>
          </div>
        </div>

        {/* Bottom Section: Doctor & Service Info */}
        <div className="bg-muted/5 flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full border">
              <User className="text-muted-foreground h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm font-medium">
                {ticket.doctorName}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {ticket.serviceName || "كشف عام"}
              </span>
            </div>
          </div>

          {/* Subtle CTA if needed, e.g., view details */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
