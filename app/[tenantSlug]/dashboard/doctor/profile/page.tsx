import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getDoctorMeAction } from "../../../../../actions/Profiles/doctor-profile";
import { VISIT_CONFIG_LABELS } from "../../../../../constants/visit-fields";
import { ClinicImage } from "../../../../../components/shared/clinic-image";
import { DoctorVisitFieldConfig } from "../../../../../types/visit";

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  const { tenantSlug } = await params;

  const response = await getDoctorMeAction(tenantSlug);
  const doctor = response?.data;
  const services = doctor?.services ?? [];

  if (!doctor) {
    return (
      <div className="text-muted-foreground border-border/40 bg-muted/5 rounded-xl border py-20 text-center text-sm font-medium">
        تعذر تحميل بيانات الطبيب.
      </div>
    );
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-4xl space-y-12 pt-8 pb-16 duration-500">
      {/* =====================================================================
          1. Hero Section (Profile Card)
          ===================================================================== */}
      <div className="bg-card border-border/50 relative flex flex-col overflow-hidden rounded-3xl border shadow-sm">
        <div className="from-primary/10 via-muted/30 to-background border-border/40 h-32 border-b bg-linear-to-r sm:h-40" />

        <div className="bg-background border-background absolute top-16 right-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 shadow-sm sm:top-24 sm:h-32 sm:w-32">
          <ClinicImage
            src={doctor.photoUrl}
            alt="Doctor Image"
            fill
            fallbackType="doctor"
          />
        </div>

        <div className="flex flex-col gap-6 px-8 pt-12 pb-10 sm:pt-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
              د. {doctor.name}
            </h1>
            <p className="text-muted-foreground text-lg font-bold">
              {doctor.specialty}
            </p>
            {doctor.bio && (
              <p className="text-muted-foreground/80 mt-2 max-w-xl text-sm leading-relaxed font-medium">
                {doctor.bio}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 text-right">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              رقم التواصل
            </span>
            <span className="text-foreground font-mono text-lg font-bold">
              {doctor.phone || "غير مسجل"}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. Queue & Urgent Configurations
          ===================================================================== */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          إعدادات الكشف والطابور
        </h3>

        <div className="bg-border/40 border-border/40 grid grid-cols-1 gap-px overflow-hidden rounded-xl border shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-background flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              متوسط وقت الكشف
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-2xl font-bold">
                {doctor.avgVisitDurationMinutes}
              </span>
              <span className="text-muted-foreground text-xs font-bold">
                دقيقة
              </span>
            </div>
          </div>

          <div className="bg-background flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              دعم الحالات المستعجلة
            </span>
            <div>
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-bold",
                  doctor.supportsUrgent
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {doctor.supportsUrgent ? "مفعل" : "غير مفعل"}
              </span>
            </div>
          </div>

          <div className="bg-background flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              نظام إدخال المستعجل
            </span>
            <span className="text-foreground text-sm font-bold">
              {doctor.urgentCaseMode}
            </span>
          </div>

          <div className="bg-background flex flex-col gap-2 p-6">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              تخطي أدوار المستعجل
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-xl font-bold">
                {doctor.urgentInsertAfterCount}
              </span>
              <span className="text-muted-foreground text-xs font-bold">
                مرضى
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. Vital Signs Configurations (Badges Map)
          ===================================================================== */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          العلامات الحيوية المفعلة للقياس
        </h3>
        <div className="bg-background border-border/40 rounded-xl border p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {Object.entries(doctor.visitFieldConfig as DoctorVisitFieldConfig).map(([key, isEnabled]) => {
              const configKey = key as keyof typeof VISIT_CONFIG_LABELS;

              return (
                <span
                  key={key}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-bold transition-colors",
                    isEnabled
                      ? "bg-primary/10 text-primary border-primary/20 border"
                      : "bg-muted/30 text-muted-foreground/50 border-border/40 decoration-muted-foreground/30 border line-through",
                  )}
                >
                  {VISIT_CONFIG_LABELS[configKey] || key}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. Services & Pricing Table
          ===================================================================== */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          الخدمات والتسعير
        </h3>
        <div className="bg-background border-border/40 overflow-hidden rounded-xl border shadow-sm">
          <Table dir="rtl">
            <TableHeader className="bg-muted/10">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-muted-foreground h-10 text-xs font-semibold">
                  اسم الخدمة
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-center text-xs font-semibold">
                  المدة المقدرة
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-left text-xs font-semibold">
                  التسعيرة
                </TableHead>
                <TableHead className="text-muted-foreground h-10 text-center text-xs font-semibold">
                  الحالة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-muted-foreground py-8 text-center text-xs font-medium"
                  >
                    لا توجد خدمات مسجلة لهذا الطبيب.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow
                    key={service.id}
                    className="border-border/30 hover:bg-muted/5"
                  >
                    <TableCell className="text-foreground py-3 text-sm font-bold">
                      {service.serviceName}
                    </TableCell>

                    <TableCell className="py-3 text-center">
                      <span className="text-muted-foreground font-mono text-xs font-medium">
                        {service.durationMinutes} دقيقة
                      </span>
                    </TableCell>

                    <TableCell className="py-3 text-left">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-foreground font-mono text-sm font-bold">
                          {service.price?.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-[10px] font-bold">
                          EGP
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-3 text-center">
                      <span
                        className={cn(
                          "rounded-sm px-2 py-1 text-[10px] font-bold tracking-wider uppercase",
                          service.isActive
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-rose-500/10 text-rose-600",
                        )}
                      >
                        {service.isActive ? "متاحة" : "موقوفة"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
