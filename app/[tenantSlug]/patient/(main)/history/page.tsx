"use client";

import { getPatientVisitsAppAction } from "@/actions/patient-app/profile";
import { ProfileSwitcher } from "@/components/patient/profile-switcher";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { Calendar, Pill, SearchX, Stethoscope, TestTube } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function PatientHistoryPage() {
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;
  const [page, setPage] = useState(1);

  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);
  const activeProfileId = authData?.activeProfileId;

  // جلب سجل الزيارات
  const { data: historyRes, isLoading } = useSWR(
    activeProfileId
      ? ["patientHistory", tenantSlug, activeProfileId, page]
      : null,
    () => getPatientVisitsAppAction(tenantSlug, activeProfileId!, page, 10),
  );

  const visits = historyRes?.data?.items || [];

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
            السجل الطبي
          </h2>
          <p className="text-muted-foreground mt-1 text-[10px] font-medium">
            تاريخ الكشوفات، الروشتات، والتحاليل
          </p>
        </div>
        <div className="shrink-0">
          <ProfileSwitcher tenantSlug={tenantSlug} />
        </div>
      </div>

      {/* قائمة الزيارات */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : visits.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {visits.map((visit) => (
              <AccordionItem
                key={visit.id}
                value={visit.id ?? ""}
                className="border-border/40 bg-background overflow-hidden rounded-2xl border px-4 shadow-sm"
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex w-full items-center gap-4 text-right">
                    <div className="bg-muted/50 border-border/50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                      <Stethoscope className="text-primary h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-foreground text-sm font-bold">
                        د. {visit.doctorName}
                      </p>
                      <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-medium">
                        <Calendar className="h-3 w-3" />
                        {new Date(visit.startedAt ?? "").toLocaleDateString(
                          "ar-EG",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                        <Badge
                          variant="outline"
                          className="h-4 py-0 text-[9px] leading-none font-bold"
                        >
                          {visit.visitType === "Exam" ? "كشف" : "استشارة"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="border-border/40 space-y-4 border-t pt-2 pb-4">
                  {/* التشخيص */}
                  {visit.diagnosis && (
                    <div className="bg-primary/5 border-primary/10 rounded-xl border p-3">
                      <p className="text-primary mb-1 text-[10px] font-bold tracking-wider uppercase">
                        التشخيص
                      </p>
                      <p className="text-foreground text-sm leading-relaxed font-semibold">
                        {visit.diagnosis}
                      </p>
                    </div>
                  )}

                  {/* الروشتة (الأدوية) */}
                  {visit.prescriptions && visit.prescriptions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-muted-foreground flex items-center gap-2 px-1 text-[10px] font-bold tracking-wider uppercase">
                        <Pill className="h-3 w-3" /> الأدوية الموصوفة
                      </div>
                      <div className="grid gap-2">
                        {visit.prescriptions.map((p) => (
                          <div
                            key={p.id}
                            className="bg-muted/20 border-border/40 flex flex-col gap-0.5 rounded-lg border p-2.5"
                          >
                            <p className="text-foreground text-xs font-bold">
                              {p.medicationName}
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              {p.dosage} • {p.frequency} • {p.duration}
                            </p>
                            {p.instructions && (
                              <p className="text-primary/70 mt-1 text-[10px] font-medium italic">
                                {p.instructions}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* التحاليل والأشعة */}
                  {visit.labRequests && visit.labRequests.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-muted-foreground flex items-center gap-2 px-1 text-[10px] font-bold tracking-wider uppercase">
                        <TestTube className="h-3 w-3" /> الفحوصات المطلوبة
                      </div>
                      <div className="grid gap-2">
                        {visit.labRequests.map((lab) => (
                          <div
                            key={lab.id}
                            className="bg-muted/20 border-border/40 flex items-center justify-between rounded-lg border p-2.5"
                          >
                            <div className="flex flex-col gap-0.5">
                              <p className="text-foreground text-xs font-bold">
                                {lab.testName}
                              </p>
                              <p className="text-muted-foreground text-[10px]">
                                {lab.type === "Lab"
                                  ? "تحليل دم/معمل"
                                  : "أشعة/تصوير"}
                              </p>
                            </div>
                            {lab.isUrgent && (
                              <Badge
                                variant="destructive"
                                className="h-4 text-[8px]"
                              >
                                عاجل
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ملاحظات الطبيب */}
                  {visit.notes && (
                    <div className="space-y-1">
                      <p className="text-muted-foreground px-1 text-[10px] font-bold">
                        ملاحظات إضافية
                      </p>
                      <p className="text-muted-foreground px-1 text-xs leading-relaxed italic">
                        {visit.notes}
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
            <div className="bg-muted/30 flex h-20 w-20 items-center justify-center rounded-full">
              <SearchX className="text-muted-foreground/20 h-10 w-10" />
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-bold">
                لا يوجد سجل طبي حالياً
              </p>
              <p className="text-muted-foreground/60 text-[10px]">
                تظهر هنا نتائج كشوفاتك السابقة فور اعتمادها
              </p>
            </div>
          </div>
        )}
      </div>

      {/* زرار "عرض المزيد" بسيط جداً */}
      {historyRes?.data?.hasNextPage && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="text-primary bg-primary/5 border-primary/10 hover:bg-primary/10 w-full rounded-2xl border py-3 text-xs font-bold transition-colors"
        >
          عرض المزيد من الزيارات
        </button>
      )}
    </div>
  );
}
