"use client";

import { useState } from "react";
import { ILabRequest, IVisit } from "@/types/visit";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createLabRequestAction } from "@/actions/labs/create-lab-request";
import { deleteLabRequestAction } from "../../../../../../actions/labs/delete-lab-request";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LabRequestFormInput, labRequestSchema } from "@/validation/labs";
import { AlertCircle, Beaker, Loader2, Plus, Trash2 } from "lucide-react";

interface LabsTabProps {
  visit: IVisit;
  tenantSlug: string;
  isClosed?: boolean;
}

// تعريف الاختيارات السريعة للتحاليل
const quickLabs = {
  testName: [
    "CBC",
    "CRP",
    "HbA1c",
    "Urine Analysis",
    "Lipid Profile",
    "X-Ray Chest",
    "Pelvic Ultrasound",
  ],
};

export function LabsTab({ visit, tenantSlug, isClosed }: LabsTabProps) {
  // تحديد الحقل النشط للاقتراحات
  const [activeField, setActiveField] = useState<keyof typeof quickLabs | null>(
    null,
  );

  const form = useForm<LabRequestFormInput>({
    resolver: valibotResolver(labRequestSchema),
    defaultValues: {
      testName: "",
      type: "Lab",
      notes: "",
      isUrgent: false,
    },
  });

  const onSubmit = async (data: LabRequestFormInput) => {
    if (isClosed) return;
    const res = await createLabRequestAction(tenantSlug, visit.id ?? "", data);
    if (res.success) {
      toast.success("تم إضافة طلب الفحص");
      form.reset({
        ...form.getValues(),
        testName: "",
        notes: "",
        isUrgent: false,
      });
      setActiveField(null);
      document.getElementById("testNameInput")?.focus();
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteLabRequestAction(tenantSlug, visit.id ?? "", id);
    if (res.success) toast.success("تم حذف طلب الفحص");
    else toast.error(res.message);
  };

  // دالة الاختيار السريع بدون any
  const setQuickChoice = (fieldName: keyof typeof quickLabs, value: string) => {
    form.setValue(fieldName as keyof LabRequestFormInput, value, {
      shouldValidate: true,
    });
  };

  return (
    <div className="mt-2 w-full space-y-2 print:hidden">
      <div className="mb-2 flex items-center gap-2 border-b pb-2">
        <Beaker className="text-muted-foreground h-4 w-4" />
        <h3 className="text-foreground text-sm font-semibold">
          الفحوصات المطلوبة
        </h3>
      </div>

      {!isClosed && (
        <div className="relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-card focus-within:ring-primary flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all focus-within:ring-1 md:flex-row">
                {/* اسم الفحص */}
                <FormField
                  control={form.control}
                  name="testName"
                  render={({ field }) => (
                    <FormItem className="flex-[1.5] space-y-0">
                      <FormControl>
                        <Input
                          id="testNameInput"
                          placeholder="اسم التحليل أو الأشعة..."
                          className="text-primary h-10 rounded-none border-0 font-bold placeholder:font-normal focus-visible:ring-0"
                          {...field}
                          onFocus={() => setActiveField("testName")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* نوع الفحص */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-0 md:w-32">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-none border-0 bg-transparent text-center text-xs shadow-none focus:ring-0 md:text-right">
                            <SelectValue placeholder="النوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Lab">معمل</SelectItem>
                          <SelectItem value="Imaging">أشعة</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="bg-border my-auto hidden h-6 w-px md:block" />

                {/* ملاحظات الفحص */}
                <FormField
                  control={form.control}
                  name="notes"
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

                {/* زرار عاجل */}
                <FormField
                  control={form.control}
                  name="isUrgent"
                  render={({ field }) => (
                    <div
                      onClick={() => field.onChange(!field.value)}
                      className={cn(
                        "flex h-10 shrink-0 cursor-pointer items-center justify-center border-r px-4 transition-colors md:border-r-0 md:border-l",
                        field.value
                          ? "bg-red-50 text-red-600"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <AlertCircle
                        className={cn(
                          "h-4 w-4",
                          field.value && "fill-red-600 text-white",
                        )}
                      />
                      <span className="mr-1 hidden text-[10px] font-bold uppercase lg:inline">
                        عاجل
                      </span>
                    </div>
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
            {activeField && quickLabs[activeField] && (
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
                    {quickLabs[activeField].map((chip) => (
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

      {/* قائمة الفحوصات */}
      <div className="bg-card mt-1 flex flex-col overflow-hidden rounded-lg border shadow-sm">
        {!visit.labRequests?.length ? (
          <div className="text-muted-foreground/30 py-4 text-center text-[10px] italic">
            لا توجد فحوصات مضافة
          </div>
        ) : (
          visit.labRequests.map((lab: ILabRequest, index: number) => (
            <div
              key={lab.id}
              className={cn(
                "group hover:bg-muted/20 flex items-center justify-between border-b px-4 py-1.5 transition-colors last:border-0",
                lab.isUrgent && "bg-red-50/20 hover:bg-red-50/30",
              )}
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground/40 font-mono text-[10px]">
                  {index + 1}.
                </span>

                <span className="text-primary text-sm font-bold">
                  {lab.testName}
                </span>

                <span className="text-muted-foreground/20">|</span>

                <span
                  className={cn(
                    "rounded border px-1.5 py-0.5 text-[9px] font-bold tracking-tighter uppercase",
                    lab.type === "Lab"
                      ? "border-blue-100 bg-blue-50 text-blue-700"
                      : "border-purple-100 bg-purple-50 text-purple-700",
                  )}
                >
                  {lab.type === "Lab" ? "معمل" : "أشعة"}
                </span>

                {lab.isUrgent && (
                  <span className="flex animate-pulse items-center gap-0.5 rounded bg-red-100 px-1.5 text-[9px] font-bold text-red-600">
                    <AlertCircle className="h-3 w-3" /> عاجل
                  </span>
                )}

                {lab.notes && (
                  <>
                    <span className="text-muted-foreground/20">|</span>
                    <span className="text-muted-foreground bg-muted ml-2 rounded px-1.5 py-0.5 text-[10px] italic">
                      {lab.notes}
                    </span>
                  </>
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
                        حذف الفحص؟
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="h-8 text-xs">
                        إلغاء
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive h-8 text-xs"
                        onClick={() => handleDelete(lab.id ?? "")}
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
