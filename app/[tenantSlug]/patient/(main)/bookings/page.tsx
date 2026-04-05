"use client";

import { getPatientBookingsAppAction } from "@/actions/patient-app/profile";
import { ProfileSwitcher } from "@/components/patient/profile-switcher";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import {
  Calendar,
  CalendarX,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Timer,
} from "lucide-react";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function PatientBookingsPage() {
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;

  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);
  const activeProfileId = authData?.activeProfileId;

  // جلب الحجوزات بـ SWR
  const { data: bookingsRes, isLoading } = useSWR(
    activeProfileId ? ["patientBookings", tenantSlug, activeProfileId] : null,
    () => getPatientBookingsAppAction(tenantSlug, activeProfileId!),
  );

  const bookings = bookingsRes?.data || [];

  if (!activeProfileId) return null;

  return (
    <div
      className="animate-in fade-in max-w-full space-y-6 overflow-x-hidden p-4 pb-24 duration-500"
      dir="rtl"
    >
      {/* الهيدر */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            حجوزاتي
          </h2>
          <p className="text-muted-foreground mt-1 text-[10px] font-medium">
            متابعة مواعيد الكشف القادمة والسابقة
          </p>
        </div>
        <div className="shrink-0">
          <ProfileSwitcher tenantSlug={tenantSlug} />
        </div>
      </div>

      {/* قائمة الحجوزات */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="border-border/40 bg-background group hover:border-primary/30 overflow-hidden rounded-2xl shadow-sm transition-all"
              >
                <CardContent className="p-0">
                  {/* الجزء العلوي: الحالة والطبيب */}
                  <div className="flex items-start justify-between p-4">
                    <div className="flex gap-3">
                      <div className="bg-primary/5 border-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                        <Calendar className="text-primary h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-foreground text-sm font-bold">
                          د. {booking.doctorName}
                        </p>
                        <p className="text-muted-foreground text-[11px] font-medium">
                          {booking.serviceName || "كشف عام"}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* الجزء السفلي: الوقت والتاريخ (Vercel Divider Style) */}
                  <div className="bg-muted/20 border-border/40 grid grid-cols-2 gap-4 border-t px-4 py-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <div className="bg-background border-border/40 rounded-md border p-1.5">
                        <Calendar className="text-primary h-3 w-3" />
                      </div>
                      <span className="text-[11px] font-bold">
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "ar-EG",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <div className="bg-background border-border/40 rounded-md border p-1.5">
                        <Clock className="h-3 w-3 text-orange-500" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider">
                        {booking.bookingTime}
                      </span>
                    </div>
                  </div>

                  {/* لو الحجز مؤكد وفيه تذكرة، نظهر لينك سريع */}
                  {booking.queueTicketId && (
                    <div className="bg-primary/5 border-primary/10 group-hover:bg-primary/10 flex items-center justify-between border-t px-4 py-2 transition-colors">
                      <span className="text-primary flex items-center gap-1 text-[10px] font-bold">
                        <Timer className="h-3 w-3" /> تم إصدار تذكرة الحجز
                      </span>
                      <ChevronLeft className="text-primary h-3 w-3" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
            <div className="bg-muted/30 flex h-20 w-20 items-center justify-center rounded-full">
              <CalendarX className="text-muted-foreground/20 h-10 w-10" />
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-bold">
                لا توجد حجوزات مسجلة
              </p>
              <p className="text-muted-foreground/60 max-w-50 text-[10px]">
                ابدأ بحجز موعد جديد من خلال التواصل مع العيادة
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Confirmed":
      return (
        <Badge
          variant="outline"
          className="rounded-full border-emerald-500/20 bg-emerald-500/5 px-2 text-[10px] font-bold text-emerald-600"
        >
          <CheckCircle2 className="ml-1 h-3 w-3" /> مؤكد
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-destructive/5 text-destructive border-destructive/20 rounded-full px-2 text-[10px] font-bold"
        >
          ملغي
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-muted text-muted-foreground border-border/50 rounded-full px-2 text-[10px] font-bold"
        >
          {status}
        </Badge>
      );
  }
}
