import { ClinicImage } from "@/components/shared/clinic-image";
import { fetchApi } from "@/lib/fetchApi";
import { IPublicClinic } from "../../../types/public";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  const { tenantSlug } = await params;

  let clinic: IPublicClinic | null = null;
  try {
    const response = await fetchApi<IPublicClinic>(
      `/api/public/${tenantSlug}/clinic`,
      {
        cache: "no-store",
      },
    );
    clinic = response?.data || null;
  } catch {}

  console.log(clinic);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="bg-background relative flex flex-col justify-center p-6 sm:p-12">
        <div className="mx-auto w-full max-w-100">
          <LoginForm
            tenantSlug={tenantSlug}
            clinicName={clinic?.clinicName ?? ""}
            logoUrl={clinic?.logoUrl as string}
          />
        </div>
      </div>

      <div className="bg-muted/30 border-border/50 relative hidden flex-col justify-between overflow-hidden border-r p-12 lg:flex">
        <div className="absolute inset-0 opacity-20">
          {clinic?.imgUrl ? (
            <ClinicImage
              src={clinic.imgUrl}
              alt="Cover"
              fill
              className="object-cover"
              fallbackType="general"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at top left, var(--primary) 0%, transparent 40%)",
              }}
            />
          )}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {clinic?.logoUrl ? (
            <ClinicImage
              src={clinic.logoUrl}
              alt="Clinic Logo"
              width={40}
              height={40}
              className="rounded-md bg-white object-contain p-1 shadow-sm"
              fallbackType="logo"
            />
          ) : (
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-md text-xl font-bold">
              {clinic?.clinicName?.charAt(0) ||
                tenantSlug.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-xl font-bold tracking-tight">
            {clinic?.clinicName || "العيادة"}
          </span>
        </div>

        <div className="relative z-10 max-w-sm space-y-4">
          <h1 className="text-foreground text-4xl font-black tracking-tight">
            نظام إدارة العيادات الذكي.
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            قم بتسجيل الدخول للوصول إلى سجلات المرضى، الحجوزات، والتقارير
            المالية الخاصة بك.
          </p>
        </div>
      </div>
    </div>
  );
}
