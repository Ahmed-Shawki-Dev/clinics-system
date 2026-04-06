"use client";

import { Typography } from "@/components/ui/typography";
import {
  formatEgyptPhoneForDisplay,
  normalizeSocialUrl,
  toTelLink,
  toWhatsAppLink,
} from "@/lib/utils";
import {
  Facebook,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { IPublicClinic } from "../../types/public";
import { ClinicImage } from "../shared/clinic-image"; // 👈 استيراد المكون الموحد
import { publicRoutes } from "./navbar";

interface FooterProps {
  clinic: IPublicClinic;
  tenantSlug: string;
}

export default function Footer({ clinic, tenantSlug }: FooterProps) {
  const displayAddress = [clinic.city, clinic.address]
    .filter(Boolean)
    .join("، ");
  const socialLinks = clinic.socialLinks || {};
  const socialItems = [
    {
      key: "website",
      href: normalizeSocialUrl(socialLinks.website),
      label: "Website",
      Icon: Globe,
    },
    {
      key: "instagram",
      href: normalizeSocialUrl(socialLinks.instagram),
      label: "Instagram",
      Icon: Instagram,
    },
    {
      key: "facebook",
      href: normalizeSocialUrl(socialLinks.facebook),
      label: "Facebook",
      Icon: Facebook,
    },
    {
      key: "x",
      href: normalizeSocialUrl(socialLinks.x),
      label: "X",
      Icon: Twitter,
    },
    {
      key: "youtube",
      href: normalizeSocialUrl(socialLinks.youtube),
      label: "YouTube",
      Icon: Youtube,
    },
    {
      key: "tiktok",
      href: normalizeSocialUrl(socialLinks.tiktok),
      label: "TikTok",
      Icon: Music2,
    },
  ].filter((item) => item.href);

  return (
    <footer
      className="border-border/50 bg-background/80 mt-20 w-full border-t backdrop-blur-md"
      dir="rtl"
    >
      <div className="container mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* العمود الأول: البراند والنبذة */}
          <div className="space-y-6">
            <Link
              href={`/${tenantSlug}`}
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              {clinic.logoUrl ? (
                /* 👈 استخدام المكون الموحد لضمان ظهور اللوجو */
                <div className="bg-background border-border relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border">
                  <ClinicImage
                    src={clinic.logoUrl}
                    alt={clinic.clinicName ?? ""}
                    fill
                    fallbackType="logo"
                    className="object-contain p-1"
                  />
                </div>
              ) : null}
              <Typography
                variant="h4"
                className="text-foreground font-black tracking-tight"
              >
                {clinic.clinicName}
              </Typography>
            </Link>
            <Typography
              variant="muted"
              className="max-w-xs text-sm leading-relaxed"
            >
              تجربة طبية متكاملة تبدأ من حجز الموعد وتنتهي برعاية دقيقة واهتمام
              بكل التفاصيل.
            </Typography>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="space-y-6">
            <Typography
              variant="h4"
              className="text-foreground text-lg font-bold"
            >
              الوصول السريع
            </Typography>
            <nav className="flex flex-col gap-3">
              {publicRoutes.map((route) => (
                <Link
                  key={route.label}
                  href={`/${tenantSlug}${route.href}`}
                  className="group w-fit"
                >
                  <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors">
                    {route.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* العمود الثالث: تواصل معنا */}
          <div className="space-y-6">
            <Typography
              variant="h4"
              className="text-foreground text-lg font-bold"
            >
              بيانات التواصل
            </Typography>
            <div className="flex flex-col gap-4">
              {displayAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-muted-foreground text-sm leading-snug">
                    {displayAddress}
                  </span>
                </div>
              )}
              {clinic.phone && (
                <a
                  href={toTelLink(clinic.phone)}
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <Phone className="text-primary h-5 w-5 shrink-0" />
                  <span className="text-muted-foreground text-sm" dir="ltr">
                    {formatEgyptPhoneForDisplay(clinic.phone)}
                  </span>
                </a>
              )}
              {clinic.supportWhatsAppNumber && (
                <a
                  href={toWhatsAppLink(clinic.supportWhatsAppNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" />
                  <span
                    className="text-muted-foreground text-sm transition-colors group-hover:text-[#25D366]"
                    dir="ltr"
                  >
                    {formatEgyptPhoneForDisplay(clinic.supportWhatsAppNumber)}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* العمود الرابع */}
          <div className="space-y-6">
            <Typography
              variant="h4"
              className="text-foreground text-lg font-bold"
            >
              قنواتنا الرسمية
            </Typography>

            {socialItems.length > 0 ? (
              <div className="grid grid-cols-3 gap-2.5">
                {socialItems.slice(0, 6).map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="border-border/60 bg-card hover:bg-accent flex h-10 items-center justify-center rounded-xl border transition-colors"
                  >
                    <item.Icon className="text-primary h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}

            <div className="from-primary/10 border-primary/20 space-y-3 rounded-2xl border bg-linear-to-br to-cyan-500/10 p-5">
              <Typography
                variant="small"
                className="text-primary block font-bold"
              >
                حالات الطوارئ
              </Typography>
              <Typography variant="muted" className="text-xs leading-relaxed">
                في حالات الطوارئ القصوى خارج أوقات العمل الرسمية، يرجى التوجه
                لأقرب مستشفى أو الاتصال على أرقام الطوارئ المحلية.
              </Typography>
            </div>
          </div>
        </div>

        <div className="border-border/50 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <Typography
            variant="muted"
            className="text-center text-xs font-medium md:text-start"
          >
            &copy; {new Date().getFullYear()} {clinic.clinicName}. جميع الحقوق
            محفوظة.
          </Typography>

          <Typography
            variant="muted"
            className="text-center text-[10px] tracking-widest uppercase opacity-70 md:text-end"
          >
            Powered by <span className="text-foreground font-bold">Medora</span>
          </Typography>
        </div>
      </div>
    </footer>
  );
}
