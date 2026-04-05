"use client";

import { ChevronDown, Menu, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toWhatsAppLink } from "@/lib/utils";
import { IPublicClinic } from "../../types/public";
import { ModeToggle } from "../ModeToggle";
import { ClinicImage } from "../shared/clinic-image";

export const publicRoutes = [
  { href: "#about", label: "عن العيادة" },
  { href: "#doctors", label: "طاقم العمل" },
  { href: "#contact", label: "تواصل معنا" },
];

interface NavbarProps {
  clinic: IPublicClinic;
  tenantSlug: string;
}

export function Navbar({ clinic, tenantSlug }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const mainContact = clinic.supportWhatsAppNumber || clinic.phone;

  const closeMenu = () => setOpen(false);

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo & Brand */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href={`/${tenantSlug}`}
            className="border-border/60 bg-card/80 hover:bg-accent flex items-center gap-3 rounded-full border px-3 py-1.5 transition-colors"
          >
            <div className="relative h-8 w-8 shrink-0">
              <ClinicImage
                src={clinic.logoUrl}
                alt={clinic.clinicName}
                fill
                fallbackType="logo"
                className="object-contain"
              />
            </div>
            <span className="line-clamp-1 max-w-40 text-sm font-black tracking-tight md:max-w-none md:text-base">
              {clinic.clinicName}
            </span>
          </Link>

          <nav className="border-border/60 bg-card/70 hidden items-center gap-2 rounded-full border px-2 py-1 md:flex">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <ModeToggle />
            {mainContact && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 w-9 rounded-full border-emerald-500/25 p-0 hover:bg-emerald-500/10"
              >
                <a
                  href={toWhatsAppLink(mainContact)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-emerald-500"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 rounded-full px-4"
                >
                  دخول <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${tenantSlug}/patient/login`}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <User className="h-4 w-4" /> <span>بوابة المرضى</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/${tenantSlug}/login`}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Stethoscope className="h-4 w-4" />{" "}
                    <span>الطاقم الطبي</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="border-b-primary/10 flex h-fit max-h-[95vh] flex-col overflow-y-auto rounded-b-3xl px-0 pb-10"
              >
                <div className="container mx-auto flex flex-col">
                  <SheetHeader className="border-border/50 border-b py-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative h-20 w-20">
                        <ClinicImage
                          src={clinic.logoUrl}
                          alt={clinic.clinicName}
                          fill
                          fallbackType="logo"
                          className="object-contain"
                        />
                      </div>
                      {/* الـ Title بقى نص بس عشان الـ SEO */}
                      <SheetTitle className="text-primary text-2xl font-black">
                        {clinic.clinicName}
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <nav className="flex flex-col gap-1 p-6">
                    {publicRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={closeMenu}
                        className="hover:bg-primary/5 rounded-2xl py-4 text-center text-lg font-bold transition-all active:scale-95"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="space-y-4 px-6">
                    {/* اللينكات بدأت بـ / عشان نضمن إنها Absolute */}
                    <Button
                      variant="default"
                      asChild
                      className="shadow-primary/10 h-14 w-full rounded-2xl text-lg shadow-lg"
                      onClick={closeMenu}
                    >
                      <Link
                        href={`/${tenantSlug}/patient/login`}
                        className="gap-3"
                      >
                        <User className="h-5 w-5" /> دخول المرضى
                      </Link>
                    </Button>
                    <Button
                      variant="secondary"
                      asChild
                      className="h-14 w-full rounded-2xl text-lg"
                      onClick={closeMenu}
                    >
                      <Link href={`/${tenantSlug}/login`} className="gap-3">
                        <Stethoscope className="h-5 w-5" /> دخول الأطباء
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
