"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IPrescription, IVisit } from "@/types/visit";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Pill, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { createPrescriptionAction } from "../../../../../../actions/prescription/create-prescription";
import { deletePrescriptionAction } from "../../../../../../actions/prescription/delete-prescription";
import {
  PrescriptionFormInput,
  prescriptionSchema,
} from "../../../../../../validation/prescription";

interface PrescriptionTabProps {
  visit: IVisit;
  tenantSlug: string;
  isClosed?: boolean;
}

// تعريف الاختيارات السريعة
const quickChips = {
  dosage: ["قرص", "نصف قرص", "ملعقة", "بخة", "دهان"],
  frequency: ["مرة يومياً", "كل 12 ساعة", "كل 8 ساعات", "عند اللزوم"],
  duration: ["أسبوع", "5 أيام", "10 أيام", "شهر"],
};

export function PrescriptionTab({
  visit,
  tenantSlug,
  isClosed,
}: PrescriptionTabProps) {
  // تحديد الحقول اللي مسموح ليها تظهر اقتراحات
  const [activeField, setActiveField] = useState<
    keyof typeof quickChips | null
  >(null);

  const form = useForm<PrescriptionFormInput>({
    resolver: valibotResolver(prescriptionSchema),
    defaultValues: {
      medicationName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  });

  const onSubmit = async (data: PrescriptionFormInput) => {
    if (isClosed) return;
    const res = await createPrescriptionAction(tenantSlug, visit.id, data);
    if (res.success) {
      toast.success("تم إضافة الدواء");
      form.reset();
      setActiveField(null);
      document.getElementById("medicationNameInput")?.focus();
    } else {
      toast.error("حدث خطأ", { description: res.message });
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deletePrescriptionAction(tenantSlug, visit.id, id);
    if (res.success) toast.success("تم حذف الدواء");
    else toast.error(res.message);
  };

  // 🔥 الدالة دي دلوقتي Typed صح 100% ومفيش any
  const setQuickChoice = (
    fieldName: keyof typeof quickChips,
    value: string,
  ) => {
    form.setValue(fieldName, value, { shouldValidate: true });
  };

  return (
    <div className="mt-2 w-full space-y-2 print:hidden">
      <div className="mb-2 flex items-center gap-2 border-b pb-2">
        <Pill className="text-muted-foreground h-4 w-4" />
        <h3 className="text-foreground text-sm font-semibold">الروشتة</h3>
      </div>

      {!isClosed && (
        <div className="relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-card focus-within:ring-primary flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all focus-within:ring-1 md:flex-row">
                {/* اسم الدواء */}
                <FormField
                  control={form.control}
                  name="medicationName"
                  render={({ field }) => (
                    <FormItem className="flex-[1.5] space-y-0">
                      <FormControl>
                        <Input
                          id="medicationNameInput"
                          placeholder="اسم الدواء..."
                          className="text-primary h-10 rounded-none border-0 font-bold placeholder:font-normal focus-visible:ring-0"
                          {...field}
                          value={field.value ?? ""}
                          onFocus={() => setActiveField(null)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* الجرعة */}
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0 md:w-24">
                      <FormControl>
                        <Input
                          placeholder="الجرعة"
                          className="h-10 rounded-none border-0 text-center text-sm focus-visible:ring-0 md:text-right"
                          {...field}
                          value={field.value ?? ""}
                          onFocus={() => setActiveField("dosage")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* التكرار */}
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0 md:w-32">
                      <FormControl>
                        <Input
                          placeholder="التكرار"
                          className="h-10 rounded-none border-0 text-center text-sm focus-visible:ring-0 md:text-right"
                          {...field}
                          value={field.value ?? ""}
                          onFocus={() => setActiveField("frequency")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* المدة */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0 md:w-24">
                      <FormControl>
                        <Input
                          placeholder="المدة"
                          className="h-10 rounded-none border-0 text-center text-sm focus-visible:ring-0 md:text-right"
                          {...field}
                          value={field.value ?? ""}
                          onFocus={() => setActiveField("duration")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* ملاحظات */}
                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0">
                      <FormControl>
                        <Input
                          placeholder="ملاحظات..."
                          className="h-10 rounded-none border-0 text-sm focus-visible:ring-0"
                          {...field}
                          value={field.value ?? ""}
                          onFocus={() => setActiveField(null)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-primary/10 hover:bg-primary text-primary h-10 w-full shrink-0 rounded-none hover:text-white md:w-12"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* الاقتراحات - تظهر وتختفي وتزق اللي تحتها بنعومة */}
          <AnimatePresence>
            {activeField && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-muted/30 flex items-center gap-3 rounded-b-lg border-x border-b px-3 py-2">
                  <span className="text-muted-foreground text-[10px] font-bold tracking-tight uppercase">
                    اقتراحات:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickChips[activeField].map((chip) => (
                      <Badge
                        key={chip}
                        variant="secondary"
                        className="hover:bg-primary hover:border-primary cursor-pointer border-transparent px-2 py-0.5 text-[11px] font-normal shadow-none transition-all hover:text-white"
                        onClick={() => setQuickChoice(activeField, chip)}
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* قائمة الأدوية */}
      <div className="bg-card mt-1 flex flex-col overflow-hidden rounded-lg border shadow-sm">
        {!visit.prescriptions?.length ? (
          <div className="text-muted-foreground/30 py-4 text-center text-[10px] italic">
            لا توجد أدوية مضافة
          </div>
        ) : (
          visit.prescriptions.map((p: IPrescription, index: number) => (
            <div
              key={p.id}
              className="group hover:bg-muted/20 flex items-center justify-between border-b px-4 py-1.5 transition-colors last:border-0"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground/40 font-mono text-[10px]">
                  {index + 1}.
                </span>
                <span className="text-primary text-sm font-bold">
                  {p.medicationName}
                </span>
                <span className="text-muted-foreground/20">|</span>
                <span className="text-foreground/70 text-xs">
                  {p.dosage} {p.frequency && `• ${p.frequency}`}{" "}
                  {p.duration && `• ${p.duration}`}
                </span>
                {p.instructions && (
                  <span className="text-muted-foreground bg-muted ml-2 rounded px-1.5 py-0.5 text-[10px]">
                    {p.instructions}
                  </span>
                )}
              </div>

              {!isClosed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 className="text-muted-foreground/40 hover:text-destructive h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-sm">
                        حذف الدواء؟
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="h-8 text-xs">
                        إلغاء
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive h-8 text-xs"
                        onClick={() => handleDelete(p.id)}
                      >
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
