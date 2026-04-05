"use client";

import { Badge } from "@/components/ui/badge";
import { IVisit } from "@/types/visit";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Activity,
  ChevronDown,
  FileText,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

interface VisitsTimelineProps {
  visits: IVisit[];
  tenantSlug: string;
}

function TimelineItem({
  visit,
  tenantSlug,
}: {
  visit: IVisit;
  tenantSlug: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = visit.status === "Completed";

  return (
    <div className="group relative py-3 pr-6 pl-0 md:pr-8">
      {/* الخط الزمني والنقطة */}
      <div
        className={`ring-background absolute top-5 right-0 z-10 h-3 w-3 rounded-full ring-4 transition-colors md:-right-1.25 ${
          isCompleted ? "bg-primary" : "bg-muted-foreground"
        }`}
      />

      <div
        className={`border-border/50 bg-card overflow-hidden rounded-xl border transition-all duration-200 ${expanded ? "ring-primary/20 shadow-md ring-1" : "hover:border-primary/30"}`}
      >
        {/* الهيدر المصغر (بيظهر دايماً ومناسب جداً للموبايل) */}
        <div
          className="flex cursor-pointer flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex-1">
            <div className="mb-1.5 flex items-center gap-2">
              <h3 className="text-foreground flex items-center gap-1.5 text-sm font-bold">
                <Stethoscope className="text-primary h-4 w-4" />
                د. {visit.doctorName}
              </h3>
              <Badge
                variant={isCompleted ? "default" : "secondary"}
                className="h-5 px-1.5 text-[10px] shadow-none"
              >
                {isCompleted ? "مكتملة" : visit.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              {format(new Date(visit.startedAt), "d MMM yyyy • p", {
                locale: ar,
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div
              className={`bg-muted/50 rounded-md p-1.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <ChevronDown className="text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>

        {/* التفاصيل اللي بتفتح (Accordion Content) */}
        {expanded && (
          <div className="border-border/30 bg-muted/5 animate-in slide-in-from-top-2 border-t px-4 pt-1 pb-4 duration-200">
            {/* الشكوى والتشخيص */}
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="bg-background border-border/50 rounded-lg border p-3">
                <span className="text-muted-foreground mb-1 block text-[10px] font-bold">
                  الشكوى
                </span>
                <p className="text-foreground text-sm">
                  {visit.complaint || "لم تُسجل"}
                </p>
              </div>
              <div className="bg-background border-border/50 rounded-lg border p-3">
                <span className="text-muted-foreground mb-1 block text-[10px] font-bold">
                  التشخيص المبدئي
                </span>
                <p className="text-foreground text-sm">
                  {visit.diagnosis || "لم يُسجل"}
                </p>
              </div>
            </div>

            {/* العلامات الحيوية (مدمجة جداً) */}
            {(visit.bloodPressureSystolic ||
              visit.heartRate ||
              visit.temperature ||
              visit.weight) && (
              <div className="mt-4">
                <span className="text-foreground mb-2 flex items-center gap-1.5 text-xs font-bold">
                  <HeartPulse className="h-3.5 w-3.5 text-rose-500" /> العلامات
                  الحيوية
                </span>
                <div className="flex flex-wrap gap-2">
                  {visit.bloodPressureSystolic && (
                    <Badge
                      variant="outline"
                      className="bg-background text-xs font-normal"
                    >
                      الضغط: {visit.bloodPressureSystolic}/
                      {visit.bloodPressureDiastolic}
                    </Badge>
                  )}
                  {visit.heartRate && (
                    <Badge
                      variant="outline"
                      className="bg-background text-xs font-normal"
                    >
                      النبض: {visit.heartRate}
                    </Badge>
                  )}
                  {visit.temperature && (
                    <Badge
                      variant="outline"
                      className="bg-background text-xs font-normal"
                    >
                      الحرارة: {visit.temperature}°
                    </Badge>
                  )}
                  {visit.weight && (
                    <Badge
                      variant="outline"
                      className="bg-background text-xs font-normal"
                    >
                      الوزن: {visit.weight}kg
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* الأدوية الموصوفة */}
            {visit.prescriptions && visit.prescriptions.length > 0 && (
              <div className="mt-4">
                <span className="text-foreground mb-2 flex items-center gap-1.5 text-xs font-bold">
                  <FileText className="h-3.5 w-3.5 text-blue-500" /> الروشتة
                  الطبية
                </span>
                <div className="flex flex-col gap-1.5">
                  {visit.prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="bg-background border-border/50 flex items-center justify-between rounded-lg border p-2.5"
                    >
                      <span className="text-sm font-bold">
                        {rx.medicationName}
                      </span>
                      <span className="text-muted-foreground bg-muted rounded-md px-2 py-1 text-[10px]">
                        {rx.dosage} • {rx.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function VisitsTimeline({ visits, tenantSlug }: VisitsTimelineProps) {
  if (!visits || visits.length === 0) {
    return (
      <div className="text-muted-foreground border-border bg-card/50 flex flex-col items-center justify-center rounded-xl border border-dashed py-12">
        <Activity className="mb-3 h-10 w-10 opacity-20" />
        <p className="text-sm font-medium">لم يقم المريض بأي زيارة حتى الآن.</p>
      </div>
    );
  }

  return (
    <div className="border-border/40 relative mt-2 mr-2 space-y-1 border-r md:mr-4">
      {visits.map((visit) => (
        <TimelineItem key={visit.id} visit={visit} tenantSlug={tenantSlug} />
      ))}
    </div>
  );
}
