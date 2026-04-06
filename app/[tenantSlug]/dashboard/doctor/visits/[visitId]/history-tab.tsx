"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Eye, Stethoscope, Clock } from "lucide-react";
import Link from "next/link";
import { IPatientSummary } from "../../../../../../types/patient-app";

interface HistoryTabProps {
  summary: IPatientSummary | null;
  tenantSlug: string;
  currentVisitId: string;
}

export function HistoryTab({
  summary,
  tenantSlug,
  currentVisitId,
}: HistoryTabProps) {
  if (!summary) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center p-8 text-sm">
        <p>تعذر تحميل السجل الطبي للمريض.</p>
      </div>
    );
  }

  // فلترة الزيارة الحالية
  const previousVisits =
    summary.recentVisits?.filter((v) => v.id !== currentVisitId) || [];

  return (
    <div className="space-y-6">
      {previousVisits.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-10 opacity-60">
          <Clock className="mb-3 h-8 w-8" />
          <p className="text-sm">هذه هي الزيارة الأولى للمريض.</p>
        </div>
      ) : (
        /* 🔥 ستايل التايم لاين الجديد: خط رفيع وبادينج مظبوط */
        <div className="border-muted-foreground/20 mr-2 space-y-6 border-r pr-5 pb-4">
          {previousVisits.map((v) => (
            <div key={v.id} className="relative">
              {/* نقطة التايم لاين */}
              <div className="bg-primary/80 ring-background absolute top-1.5 -right-6.25 h-2.5 w-2.5 rounded-full ring-4" />

              {/* كارت الزيارة: بدون خلفية مزعجة، مجرد بوردر خفيف */}
              <div className="border-muted-foreground/15 hover:border-primary/30 hover:bg-muted/10 group rounded-xl border bg-transparent p-4 transition-all duration-200">
                {/* دكتور الزيارة والتاريخ */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="text-foreground/90 flex items-center gap-1.5 text-sm font-bold">
                    <Stethoscope className="text-primary h-3.5 w-3.5" />
                    د. {v.doctorName}
                  </div>
                  <span className="text-muted-foreground text-[10px]">
                    {format(new Date(v.startedAt ?? ""), "dd MMM yyyy", {
                      locale: ar,
                    })}
                  </span>
                </div>

                {/* الشكوى والتشخيص */}
                <div className="space-y-2.5 text-sm">
                  {v.complaint && (
                    <div>
                      <span className="text-muted-foreground mb-0.5 block text-[10px]">
                        الشكوى:
                      </span>
                      <p className="text-foreground/80 text-xs leading-relaxed font-medium">
                        {v.complaint}
                      </p>
                    </div>
                  )}
                  {v.diagnosis && (
                    <div>
                      <span className="text-muted-foreground mb-0.5 block text-[10px]">
                        التشخيص:
                      </span>
                      <p className="text-primary text-xs leading-relaxed font-bold">
                        {v.diagnosis}
                      </p>
                    </div>
                  )}
                  {!v.complaint && !v.diagnosis && (
                    <p className="text-muted-foreground text-xs italic">
                      لم يتم تسجيل تفاصيل سريرية.
                    </p>
                  )}
                </div>

                {/* زرار الروشتة: Ghost عشان ميزحمش الدنيا وبيظهر حلاوته في الهوفر */}
                <div className="border-muted-foreground/10 mt-3 border-t pt-3">
                  <Link
                    href={`/${tenantSlug}/dashboard/doctor/visits/${v.id}?tab=prescription`}
                    target="_blank"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/5 h-8 w-full gap-1.5 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      عرض الروشتة والتفاصيل
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
