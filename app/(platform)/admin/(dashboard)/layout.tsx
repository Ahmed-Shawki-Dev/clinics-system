import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/fetchApi";
import { UserProfile } from "@/types/auth"; // ظبط مسارك
import { AdminSidebar } from "@/components/admin-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // بنضرب على API الـ profile والسيرفر بيجيب التوكن من الكوكيز أوتوماتيك من fetchApi بتاعتك
  const res = await fetchApi<UserProfile>("/api/Auth/me", { method: "GET" });
  // لو مفيش توكن، أو التوكن منتهي، أو مش سوبر أدمن -> طرد فوراً
  if (!res.success || res.data?.role !== "SuperAdmin") {
    redirect("/admin/login");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-muted/10 flex h-screen flex-col overflow-hidden">
        <AppHeader />
        <main className="no-scrollbar flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
