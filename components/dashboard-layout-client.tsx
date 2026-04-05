"use client";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <AppHeader />
        <main className="no-scrollbar flex-1 overflow-y-auto p-6">
          <div>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
