"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "نظرة عامة" },
  { id: "doctors", label: "حسابات ونسب الأطباء" },
  { id: "monthly", label: "التقارير السنوية" }, // عدلت الاسم عشان يتوافق مع Yearly
];

export function FinanceTabsNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const createQueryString = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    params.delete("page"); // تصفير الباجينيشن
    return params.toString();
  };

  return (
    <div className="border-border/50 no-scrollbar flex gap-6 overflow-x-auto border-b pb-0">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={`${pathname}?${createQueryString(tab.id)}`}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm whitespace-nowrap transition-all", // الـ -mb-[1px] دي صياعة عشان الخط يركب على خط الـ border-b الأساسي
              isActive
                ? "border-primary text-primary font-bold"
                : "text-muted-foreground hover:text-foreground hover:border-border/80 border-transparent",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
