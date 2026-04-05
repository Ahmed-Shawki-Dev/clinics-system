import { getPatientProfileAction } from "@/actions/patient/get-patient-profile";
import { GenericPagination } from "@/components/shared/pagination";
import { DashboardHeader, DashboardShell } from "@/components/shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../../../../../../components/ui/button";
import { PatientInfoCard } from "./patient-info-card";
import { SubProfilesList } from "./sub-profiles-list";
import { VisitsTimeline } from "./visits-timeline";

interface PageProps {
  params: Promise<{ tenantSlug: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PatientProfilePage({
  params,
  searchParams,
}: PageProps) {
  const { tenantSlug, id } = await params;
  const queryParams = await searchParams;
  const currentPage = Number(queryParams.page) || 1;

  const { success, patient, visits, pagination } =
    await getPatientProfileAction(id, tenantSlug, currentPage, 5);

  if (!success || !patient) notFound();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="الملف الطبي"
        text="إدارة السجل الطبي الشامل للمريض"
      >
        <Button variant={"ghost"}>
          <Link
            href={`/${tenantSlug}/dashboard/patients`}
            className="flex items-center space-x-2"
          >
            صفحة المرضى
            <ChevronLeft />
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-4">
            <PatientInfoCard patient={patient} />
          </div>
        </div>

        {/* العمود الأيسر (التبويبات) */}
        <div className="lg:col-span-8 xl:col-span-9">
          <Tabs defaultValue="visits" className="w-full">
            {/* Tabs List - Scrollable on Mobile, Clean Underlines */}
            <div className="border-border/50 border-b">
              <TabsList className="no-scrollbar h-auto w-full flex-nowrap justify-start gap-4 overflow-x-auto bg-transparent p-0 md:gap-6">
                <TabsTrigger
                  value="visits"
                  className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground px-1 pt-2 pb-3 text-sm font-semibold whitespace-nowrap transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Activity className="ml-2 h-4 w-4 shrink-0" /> السجل والزيارات
                </TabsTrigger>
                <TabsTrigger
                  value="subProfiles"
                  className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground px-1 pt-2 pb-3 text-sm font-semibold whitespace-nowrap transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <User className="ml-2 h-4 w-4 shrink-0" /> العائلة
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tabs Content */}
            <div className="mt-6">
              <TabsContent value="visits" className="m-0 outline-none">
                <VisitsTimeline visits={visits || []} tenantSlug={tenantSlug} />

                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-6 flex justify-center pt-4 md:justify-end">
                    <GenericPagination
                      currentPage={pagination.pageNumber}
                      totalPages={pagination.totalPages}
                      hasNextPage={pagination.hasNextPage}
                      hasPreviousPage={pagination.hasPreviousPage}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="subProfiles" className="m-0 outline-none">
                <SubProfilesList subProfiles={patient.subProfiles || []} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  );
}
