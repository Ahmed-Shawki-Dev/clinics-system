"use client";

import { ClinicImage } from "@/components/shared/clinic-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { usePatientAuthStore } from "../../store/usePatientAuthStore";
import { useTenantStore } from "../../store/useTenantStore";
import { PatientLogoutButton } from "../auth/PatientLogoutButton";
import { getFullImageUrl } from "@/lib/utils"; // 👈 استدعاء الدالة السحرية بتاعتنا

export function PatientHeader() {
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;

  const { config } = useTenantStore();

  // 🔴 التعديل الجذري: بنقرأ الداتا من سجل العيادة الحالية
  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);

  // استخراج الداتا بـ Optional Chaining عشان لو مفيش تسجيل دخول ميضربش
  const user = authData?.user;
  const activeProfileId = authData?.activeProfileId;

  const activeProfile = user?.profiles?.find((p) => p.id === activeProfileId);
  const displayName =
    activeProfile?.name || user?.displayName || user?.username || "مريض";

  return (
    <header className="bg-background/80 sticky top-0 z-50 flex h-14 items-center justify-between border-b px-4 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="bg-background relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border">
          <ClinicImage
            src={getFullImageUrl(config?.logoUrl)} // 👈 تأمين مسار الصورة
            alt={config?.name || "Clinic Logo"}
            fill
            fallbackType="logo"
            className="object-cover"
          />
        </div>
        <h1 className="text-foreground max-w-37.5 truncate text-lg font-bold tracking-wider">
          {config?.name || tenantSlug}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border-primary/20 hover:ring-primary/50 h-8 w-8 cursor-pointer border transition-all hover:ring-2">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="truncate text-sm leading-none font-medium">
                  {displayName}
                </p>
                <p className="text-muted-foreground mt-1 truncate text-xs leading-none">
                  {user?.username}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/${tenantSlug}/patient/profile`)}
            >
              <User className="text-muted-foreground mr-2 ml-2 h-4 w-4" />
              الملف الشخصي
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <PatientLogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
