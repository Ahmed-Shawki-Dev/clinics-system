"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import {
  getPatientProfileAppAction,
  getPatientCreditBalanceAction,
} from "@/actions/patient-app/profile";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Wallet,
  ShieldCheck,
  Info,
  LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileSwitcher } from "@/components/patient/profile-switcher";
import { PatientLogoutButton } from "@/components/auth/PatientLogoutButton";

export default function PatientProfilePage() {
  const params = useParams();
  const tenantSlug = params.tenantSlug as string;

  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);
  const activeProfileId = authData?.activeProfileId;

  // 1. جلب بيانات البروفايل (الأساسية فقط)
  const { data: profileRes, isLoading: loadingProfile } = useSWR(
    activeProfileId
      ? ["patientFullProfile", tenantSlug, activeProfileId]
      : null,
    () => getPatientProfileAppAction(tenantSlug, activeProfileId!),
  );

  // 2. جلب رصيد المحفظة
  const { data: balanceRes, isLoading: loadingBalance } = useSWR(
    activeProfileId ? ["patientBalance", tenantSlug, activeProfileId] : null,
    () => getPatientCreditBalanceAction(tenantSlug, activeProfileId!),
  );

  const profile = profileRes?.data;
  const balance = balanceRes?.data?.balance || 0;

  if (!activeProfileId) return null;

  return (
    <div
      className="animate-in fade-in max-w-full space-y-8 overflow-x-hidden p-4 pb-24 duration-500"
      dir="rtl"
    >
      {/* الهيدر */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          حسابي
        </h2>
        <div className="shrink-0">
          <ProfileSwitcher tenantSlug={tenantSlug} />
        </div>
      </div>

      {/* كارت المحفظة (Vercel Black Style) */}
      <div className="space-y-3">
        <h3 className="text-muted-foreground flex items-center gap-2 px-1 text-[10px] font-bold tracking-[0.2em] uppercase">
          <Wallet className="h-3 w-3" /> رصيد المحفظة
        </h3>
        {loadingBalance ? (
          <Skeleton className="h-36 w-full rounded-3xl" />
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] p-6 text-white shadow-2xl">
            {/* Ambient Light Effect */}
            <div className="bg-primary/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-widest uppercase opacity-50">
                  الرصيد المتاح
                </span>
                <ShieldCheck className="h-5 w-5 text-emerald-500 opacity-80" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tighter italic">
                  {balance.toLocaleString()}
                </span>
                <span className="text-sm font-medium opacity-40">ج.م</span>
              </div>

              <div className="text-[10px] font-medium opacity-30">
                • يتم تحديث الرصيد تلقائياً بعد كل عملية تسوية
              </div>
            </div>
          </div>
        )}
      </div>

      {/* المعلومات الشخصية */}
      <div className="space-y-3">
        <h3 className="text-muted-foreground flex items-center gap-2 px-1 text-[10px] font-bold tracking-[0.2em] uppercase">
          <Info className="h-3 w-3" /> البيانات الشخصية
        </h3>
        <Card className="border-border/40 bg-background overflow-hidden rounded-2xl shadow-sm">
          <div className="divide-border/40 divide-y">
            <InfoItem
              icon={User}
              label="الاسم"
              value={profile?.name}
              loading={loadingProfile}
            />
            <InfoItem
              icon={Phone}
              label="الهاتف"
              value={profile?.phone}
              loading={loadingProfile}
            />
            <InfoItem
              icon={Calendar}
              label="تاريخ الميلاد"
              value={
                profile?.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString("ar-EG")
                  : "---"
              }
              loading={loadingProfile}
            />
            <InfoItem
              icon={MapPin}
              label="العنوان"
              value={profile?.address || "غير مسجل"}
              loading={loadingProfile}
            />
          </div>
        </Card>
      </div>

      {/* ملاحظات الحساب (لو موجودة) */}
      {profile?.notes && (
        <div className="bg-muted/30 border-border/60 rounded-2xl border border-dashed p-4">
          <p className="text-muted-foreground mb-2 text-[10px] font-bold uppercase">
            ملاحظات إضافية
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed italic">
            {profile.notes}
          </p>
        </div>
      )}

      {/* تسجيل الخروج */}
      <div className="pt-4">
        <PatientLogoutButton />
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | null;
  loading: boolean;
}) {
  return (
    <div className="hover:bg-muted/5 flex items-center justify-between p-4 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-muted/40 border-border/20 rounded-xl border p-2">
          <Icon className="text-muted-foreground h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground/60 text-[9px] font-bold tracking-tighter uppercase">
            {label}
          </span>
          {loading ? (
            <Skeleton className="mt-1 h-4 w-28" />
          ) : (
            <span className="text-foreground text-sm font-bold">
              {value || "---"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
