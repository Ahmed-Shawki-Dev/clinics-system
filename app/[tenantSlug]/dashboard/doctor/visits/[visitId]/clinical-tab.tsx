"use client";

import { IVisit } from "@/types/visit";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Activity, CalendarIcon, FileText } from "lucide-react";
import { updateVisit } from "../../../../../../actions/visit/update-visit";
import { vitalsFields } from "../../../../../../constants/vitals-fields";
import { IDoctor, IDoctorVisitConfig } from "../../../../../../types/doctor";
import {
  ClinicalFormInput,
  clinicalSchema,
} from "../../../../../../validation/visit";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isBefore, startOfDay } from "date-fns";
import { ar } from "date-fns/locale";

interface ClinicalTabProps {
  tenantSlug: string;
  visit: IVisit;
  doctor?: IDoctor;
  isClosed?: boolean;
}

export function ClinicalTab({
  tenantSlug,
  visit,
  doctor,
  isClosed,
}: ClinicalTabProps) {
  const form = useForm<ClinicalFormInput>({
    resolver: valibotResolver(clinicalSchema),
    defaultValues: {
      complaint: visit.complaint ?? "",
      diagnosis: visit.diagnosis ?? "",
      notes: visit.notes ?? null,
      bloodPressureSystolic: visit.bloodPressureSystolic ?? null,
      bloodPressureDiastolic: visit.bloodPressureDiastolic ?? null,
      heartRate: visit.heartRate ?? null,
      temperature: visit.temperature ?? null,
      weight: visit.weight ?? null,
      height: visit.height ?? null,
      bmi: visit.bmi ?? null,
      bloodSugar: visit.bloodSugar ?? null,
      oxygenSaturation: visit.oxygenSaturation ?? null,
      respiratoryRate: visit.respiratoryRate ?? null,
    },
  });

  const onSubmit = async (data: ClinicalFormInput) => {
    if (isClosed) return;
    try {
      const loadingToast = toast.loading("جاري حفظ البيانات...");
      const response = await updateVisit(tenantSlug, visit.id, data);
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success("تم الحفظ");
        // 🔥 الحل هنا: بنحدث الفورم بالداتا اللي لسه باعتينها عشان تفضل معروضة
        form.reset(data);
      } else {
        toast.error(response.message || "فشل الحفظ");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const autoGrow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const visibleVitals = vitalsFields.filter(
    (fieldConfig) =>
      !doctor?.visitFieldConfig ||
      doctor?.visitFieldConfig[
        fieldConfig.configKey as keyof IDoctorVisitConfig
      ],
  );

  const visitDate = visit.startedAt
    ? startOfDay(new Date(visit.startedAt))
    : startOfDay(new Date());

  return (
    <Form {...form}>
      <form
        id="clinical-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* 1. العلامات الحيوية */}
        {visibleVitals.length > 0 && (
          <div className="bg-muted/30 grid grid-cols-2 gap-3 rounded-xl border border-dashed p-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {visibleVitals.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <div className="bg-background flex flex-col gap-1 rounded-lg border p-2 shadow-sm">
                    <span className="text-muted-foreground text-[10px] font-bold uppercase">
                      {fieldConfig.label}
                    </span>
                    <FormControl>
                      <input
                        type="number"
                        disabled={isClosed}
                        className="text-primary w-full bg-transparent text-sm font-black focus:outline-none"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                  </div>
                )}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 border-b pb-2">
          <Activity className="text-muted-foreground h-4 w-4" />
          <h3 className="text-foreground text-sm font-semibold">
            التشخيص الطبي
          </h3>
        </div>

        {/* 2. شريط الكشف (Responsive + Auto-grow) */}
        <div className="bg-card focus-within:ring-primary flex flex-col items-stretch overflow-hidden rounded-lg border shadow-sm transition-all duration-200 focus-within:ring-1 md:flex-row">
          <div className="text-muted-foreground/30 bg-muted/5 hidden items-center border-l px-3 md:flex">
            <FileText className="h-4 w-4" />
          </div>

          <FormField
            control={form.control}
            name="complaint"
            render={({ field }) => (
              <FormControl className="flex-1">
                <Textarea
                  placeholder="الشكوى..."
                  className="scrollbar-hide max-h-60 min-h-11.25 resize-none border-0 border-b bg-transparent px-4 py-3 text-sm leading-relaxed focus-visible:ring-0 md:min-h-10 md:border-b-0"
                  disabled={isClosed}
                  rows={1}
                  onInput={autoGrow}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            )}
          />

          <div className="bg-muted/50 hidden w-px self-stretch opacity-30 md:block" />

          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormControl className="flex-1">
                <Textarea
                  placeholder="التشخيص..."
                  className="text-primary scrollbar-hide max-h-60 min-h-11.25 resize-none border-0 border-b bg-transparent px-4 py-3 text-sm leading-relaxed font-bold focus-visible:ring-0 md:min-h-10 md:border-b-0"
                  disabled={isClosed}
                  rows={1}
                  onInput={autoGrow}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            )}
          />

          <div className="bg-muted/50 hidden w-px self-stretch opacity-30 md:block" />

          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={isClosed}
                    className={cn(
                      "hover:bg-muted h-11 w-full shrink-0 gap-2 self-center rounded-none px-4 text-xs font-normal md:h-auto md:min-h-10 md:w-auto md:border-r",
                      !field.value && "text-muted-foreground/50",
                    )}
                  >
                    <CalendarIcon className="h-3.5 w-3.5 opacity-50" />
                    {field.value && !isNaN(new Date(field.value).getTime())
                      ? format(new Date(field.value), "dd/MM/yy", {
                          locale: ar,
                        })
                      : "الاستشارة"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    disabled={(date) => isBefore(startOfDay(date), visitDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
