"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { AlertCircle, CalendarIcon, Loader2, User, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { createBookingAction } from "@/actions/booking/create-booking";
import { PatientSearch } from "@/components/patient-search";
import { IDoctor } from "@/types/doctor";
import { IPatient } from "@/types/patient";
import { CreateBookingInput, createBookingSchema } from "@/validation/booking";

interface Props {
  doctors: IDoctor[];
}

export function BookingModal({ doctors = [] }: Props) {
  const [open, setOpen] = useState(false);
  const params = useParams<{ tenantSlug?: string | string[] }>();
  const tenantSlug =
    typeof params?.tenantSlug === "string"
      ? params.tenantSlug
      : params?.tenantSlug?.[0];

  if (!tenantSlug) return null;

  const safeDoctors = (doctors ?? []).filter((doctor) => !!doctor?.isEnabled);
  const doctorOptions = safeDoctors.filter(
    (doc): doc is IDoctor & { id: string } =>
      typeof doc?.id === "string" && doc.id.trim().length > 0,
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  // 🔥 ستيت حفظ الأكونت لعرض أفراد العائلة
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedAccount, setSelectedAccount] = useState<IPatient | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<CreateBookingInput>({
    resolver: valibotResolver(createBookingSchema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      doctorServiceId: "",
      notes: "",
      bookingTime: "09:00",
      bookingDate: new Date(),
    },
  });

  const activeDoctor = doctorOptions.find((d) => d.id === selectedDoctorId);
  const activeDoctorServices = (activeDoctor?.services ?? []).filter(
    (svc): svc is NonNullable<IDoctor["services"]>[number] & { id: string } =>
      typeof svc?.id === "string" && svc.id.trim().length > 0,
  );
  const hasServices = activeDoctorServices.length > 0;

  const onSubmit = async (values: CreateBookingInput) => {
    if (!hasServices) {
      toast.error("لا يمكن الحجز لدكتور ليس لديه خدمات معرفة");
      return;
    }

    try {
      const result = await createBookingAction(values, tenantSlug);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        form.reset();
        setSelectedDoctorId(null);
        setSelectedAccount(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error("حدث خطأ أثناء الاتصال بالسيرفر");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset();
          setSelectedAccount(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>حجز موعد جديد</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
        <DialogHeader>
          <DialogTitle>حجز موعد جديد</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 1. المريض واختيار أفراد العائلة */}
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <div className="space-y-3">
                  <FormItem className="flex flex-col">
                    <FormLabel>المريض (أو ولي الأمر)</FormLabel>
                    <FormControl>
                      <PatientSearch
                        tenantSlug={tenantSlug}
                        selectedPatientId={selectedAccount?.id}
                        onSelect={(patient) => {
                          setSelectedAccount(patient);
                          field.onChange(patient?.id ?? "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  {/* بلوك أفراد العائلة */}
                  {selectedAccount &&
                    (selectedAccount.subProfiles?.length ?? 0) > 0 && (
                      <div className="bg-muted/10 animate-in fade-in slide-in-from-top-2 space-y-3 rounded-lg border p-4">
                        <h4 className="flex items-center gap-2 text-sm font-bold">
                          <Users className="text-primary h-4 w-4" />
                          الحجز لمن بالظبط؟
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {/* كارت الأب */}
                          <div
                            onClick={() =>
                              field.onChange(selectedAccount.id ?? "")
                            }
                            className={cn(
                              "flex cursor-pointer flex-col rounded-md border p-3 transition-all",
                              field.value === (selectedAccount.id ?? "")
                                ? "border-primary bg-primary/5 ring-primary ring-1"
                                : "hover:border-primary/50 hover:bg-muted/50 bg-background",
                            )}
                          >
                            <span className="flex items-center gap-2 truncate text-sm font-bold">
                              <User className="h-4 w-4 shrink-0" />{" "}
                              {selectedAccount.name ?? "غير متوفر"}
                            </span>
                            <Badge
                              variant="secondary"
                              className="mt-2 w-fit text-[10px]"
                            >
                              صاحب الحساب
                            </Badge>
                          </div>

                          {/* كروت التابعين */}
                          {(selectedAccount.subProfiles ?? []).map((sub) => (
                            <div
                              key={sub.id ?? `${sub.name ?? "sub"}-fallback`}
                              onClick={() => field.onChange(sub.id ?? "")}
                              className={cn(
                                "flex cursor-pointer flex-col rounded-md border p-3 transition-all",
                                field.value === (sub.id ?? "")
                                  ? "border-primary bg-primary/5 ring-primary ring-1"
                                  : "hover:border-primary/50 hover:bg-muted/50 bg-background",
                              )}
                            >
                              <span className="flex items-center gap-2 truncate text-sm font-bold">
                                <User className="h-4 w-4 shrink-0" />{" "}
                                {sub.name ?? "غير متوفر"}
                              </span>
                              <Badge
                                variant="outline"
                                className="mt-2 w-fit text-[10px]"
                              >
                                {sub.gender === "Male"
                                  ? "ذكر"
                                  : sub.gender === "Female"
                                    ? "أنثى"
                                    : "غير متوفر"}{" "}
                                • تابع
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            />

            {/* 2. اختيار الطبيب (بدون تغيير) */}
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الطبيب المعالج</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedDoctorId(val);
                      form.setValue("doctorServiceId", "");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 text-right">
                        <SelectValue placeholder="اختر الطبيب" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctorOptions.map((doc) => (
                        <SelectItem
                          key={doc.id}
                          value={doc.id}
                          className="text-right"
                        >
                          {doc.name ?? "غير متوفر"} -{" "}
                          {doc.specialty ?? "تخصص عام"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. الخدمة (بدون تغيير) */}
            {selectedDoctorId && (
              <FormField
                control={form.control}
                name="doctorServiceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخدمة المطلوبة</FormLabel>
                    {hasServices ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 text-right">
                            <SelectValue placeholder="اختر نوع الخدمة/الكشف" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeDoctorServices.map((svc) => (
                            <SelectItem
                              key={svc.id}
                              value={svc.id}
                              className="text-right"
                            >
                              {svc.serviceName ?? "غير متوفر"} ({svc.price ?? 0}{" "}
                              ج.م)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-2 rounded-md border p-3 text-xs">
                        <AlertCircle className="h-4 w-4" />
                        عذراً، هذا الطبيب ليس لديه خدمات متاحة حالياً.
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* 4. التاريخ والوقت (بدون تغيير) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>التاريخ</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-11 w-full pl-3 text-right font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ar })
                            ) : (
                              <span>اختر يوم</span>
                            )}
                            <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                          locale={ar}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الساعة</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="h-11 cursor-pointer text-right"
                        onClick={(e) => e.currentTarget.showPicker?.()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 5. ملاحظات */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أي تفاصيل إضافية..."
                      {...field}
                      className="resize-none text-right"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full text-lg font-bold"
              disabled={
                form.formState.isSubmitting ||
                (selectedDoctorId !== null && !hasServices)
              }
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "تأكيد الحجز"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
