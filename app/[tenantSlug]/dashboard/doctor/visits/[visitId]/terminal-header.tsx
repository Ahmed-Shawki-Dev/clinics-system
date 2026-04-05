"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IVisit } from "@/types/visit";
import { AlertTriangle, CalendarDays, History, Printer } from "lucide-react";
import { toast } from "sonner";
import { useTenantStore } from "../../../../../../store/useTenantStore";

import { IPatientSummary } from "../../../../../../types/patient-app";
import { HistoryTab } from "./history-tab";

// ============================================================================
// واجهة الهيدر الداخلي (بدون Gender)
// ============================================================================
interface TerminalHeaderProps {
  visit: IVisit;
  isClosed: boolean;
  patientAge: string | number;
  chronicDiseases: string[];
  tenantSlug: string;
  summary: IPatientSummary | null;
  isCompleting: boolean;
  onComplete: () => void;
}

export function TerminalHeader({
  visit,
  isClosed,
  patientAge,
  chronicDiseases,
  tenantSlug,
  summary,
  isCompleting,
  onComplete,
}: TerminalHeaderProps) {
  const tenantConfig = useTenantStore((state) => state.config);

  const handlePrint = async () => {
    if (!tenantConfig?.logoUrl) {
      window.print();
      return;
    }

    const toastId = toast.loading("جاري تجهيز الروشتة للطباعة...");
    try {
      await new Promise((resolve) => {
        const img = new Image();
        img.src = tenantConfig.logoUrl || "";
        img.onload = resolve;
        img.onerror = resolve;
      });
    } catch (error) {
      console.error("Failed to preload logo");
    } finally {
      toast.dismiss(toastId);
      window.print();
    }
  };

  return (
    <div className="bg-card relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl border p-4 shadow-sm md:gap-5 md:p-5 lg:flex-row">
      {/* منطقة بيانات المريض (ريسبونسف) */}
      <div className="z-10 flex flex-col gap-2 pl-0 md:gap-3 md:pl-2">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <h2 className="text-foreground text-xl leading-none font-black sm:text-2xl">
            {visit.patientName}
          </h2>

          <span className="text-muted-foreground bg-muted/50 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium sm:text-sm">
            <CalendarDays className="h-3.5 w-3.5 md:h-4 md:w-4" /> {patientAge}{" "}
            سنة
          </span>

          {isClosed && (
            <Badge variant="secondary" className="whitespace-nowrap">
              زيارة مكتملة
            </Badge>
          )}
        </div>

        {chronicDiseases.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5 md:gap-2">
            <span className="text-destructive flex shrink-0 items-center gap-1 text-[11px] font-bold md:text-xs">
              <AlertTriangle className="h-3.5 w-3.5" /> تحذير طبي:
            </span>
            {chronicDiseases.map((disease: string, idx: number) => (
              <Badge
                key={idx}
                variant="destructive"
                className="h-5 px-2 text-[9px] font-bold whitespace-nowrap shadow-none md:text-[10px]"
              >
                {disease}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* منطقة الأزرار (ريسبونسف) */}
      <div className="flex shrink-0 flex-wrap items-center justify-start gap-2 pt-2 lg:justify-end lg:pt-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="bg-muted/50 hover:bg-muted text-foreground h-9 w-full flex-1 border shadow-sm sm:w-auto sm:flex-none"
            >
              <History className="ml-1 h-4 w-4 sm:ml-2" />
              <span>التاريخ المرضي</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full overflow-y-auto px-5 pt-10 sm:max-w-md"
          >
            <SheetHeader className="mb-6">
              <SheetTitle className="text-primary flex items-center gap-2 border-b pb-4">
                التاريخ المرضي: {visit.patientName}
              </SheetTitle>
            </SheetHeader>
            <HistoryTab
              summary={summary}
              tenantSlug={tenantSlug}
              currentVisitId={visit.id}
            />
          </SheetContent>
        </Sheet>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="h-9 w-full flex-1 shadow-sm sm:w-auto sm:flex-none"
        >
          <Printer className="ml-1 h-4 w-4 sm:ml-2" />
          <span>طباعة الروشتة</span>
        </Button>

        {!isClosed && (
          <Button
            onClick={onComplete}
            disabled={isCompleting}
            size="sm"
            className="mt-2 h-9 w-full shadow-sm sm:mt-0 sm:w-auto"
          >
            {isCompleting ? "جاري..." : "حفظ وإنهاء الزيارة"}
          </Button>
        )}
      </div>
    </div>
  );
}
