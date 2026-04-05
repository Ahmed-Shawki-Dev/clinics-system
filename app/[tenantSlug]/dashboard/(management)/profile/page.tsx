import { getMeAction } from "../../../../../actions/Profiles/staff-profile";
import { ROLE_CONFIG } from "../../../../../config/roles";

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  const { tenantSlug } = await params;

  const response = await getMeAction(tenantSlug);
  const user = response?.data;

  if (!user) {
    return (
      <div className="text-muted-foreground border-border/40 bg-muted/5 rounded-xl border py-20 text-center text-sm font-medium">
        تعذر تحميل بيانات الملف الشخصي.
      </div>
    );
  }

  const initial = user.displayName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="animate-in fade-in mx-auto max-w-3xl pt-8 duration-500">
      <div className="bg-card border-border/50 relative flex flex-col overflow-hidden rounded-3xl border shadow-sm">
        <div className="from-muted/50 via-muted/30 to-background border-border/40 h-32 border-b bg-linear-to-r sm:h-40" />

        {/* Floating Avatar */}
        <div className="bg-background border-background absolute top-16 right-8 flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm sm:top-24 sm:h-32 sm:w-32">
          <div className="bg-primary/10 flex h-full w-full items-center justify-center rounded-full">
            <span className="text-primary text-4xl font-black sm:text-6xl">
              {initial}
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pt-12 pb-10 sm:pt-20">
          <div className="flex flex-col gap-1">
            <h1 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
              {user.displayName}
            </h1>
            <p className="text-muted-foreground text-lg font-bold">
              {ROLE_CONFIG[user.role].label}
            </p>
          </div>

          <hr className="border-border/50 my-8" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                اسم المستخدم للولوج (Username)
              </span>
              <span className="text-foreground font-mono text-xl font-medium">
                {user.username}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                حالة الحساب
              </span>
              <div>
                <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                  نشط ومصرح له بالدخول
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                مستوى الوصول
              </span>
              <span className="text-foreground text-base font-bold">
                تصريح كامل للنظام
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
