"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";

export function Navbar() {
  const routes = [
    { href: "#features", label: "المميزات" },
    { href: "#faq", label: "الأسئلة الشائعة" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    // 1. شيلنا الـ wrapper الطاير. الهيدر نفسه بقى واخد العرض كله ولازق فوق
    <header className="border-border/50 bg-background/70 sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300">
      {/* 2. المحتوى الداخلي هو اللي محكوم بـ container عشان يفضل متوازي مع باقي الصفحة */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* اليمين: اللوجو */}
        <Link href="/">
          <div className="relative h-8 w-8 overflow-hidden md:h-9 md:w-9">
            <Image
              src="/logo.png"
              alt="ميدورا"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* المنتصف: الروابط (ديسكتوب) */}
        <nav className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* اليسار: الثيم والموبايل */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {/* قائمة الموبايل (Top Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="border-b-border/50 rounded-b-3xl px-6 pt-14 pb-8"
            >
              <SheetTitle className="sr-only">قائمة ميدورا</SheetTitle>

              <div className="flex flex-col gap-8">
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative h-8 w-8 overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="ميدورا"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    ميدورا
                  </span>
                </Link>

                <nav className="flex flex-col gap-5">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="text-foreground hover:text-primary text-base font-medium transition-colors"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-border/50 flex items-center justify-between border-t pt-6">
                  <span className="text-muted-foreground text-sm font-medium">
                    مظهر النظام
                  </span>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
