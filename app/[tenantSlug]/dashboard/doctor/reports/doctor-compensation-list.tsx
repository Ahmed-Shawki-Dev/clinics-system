import { Card } from "@/components/ui/card";
import { DoctorOverviewReportRowDto } from "../../../../../types/backend-types";

export function DoctorCompensationList({
  doctors,
}: {
  doctors: DoctorOverviewReportRowDto[];
}) {
  return (
    <Card className="col-span-1 w-full p-6 lg:col-span-2">
      <h3 className="text-primary mb-4 flex items-center gap-2 text-lg font-bold">
        تفاصيل الاستحقاق المالي
      </h3>
      <div className="space-y-4">
        {!doctors || doctors.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center">
            لا توجد بيانات متاحة
          </p>
        ) : (
          doctors.map((doc) => (
            <div
              key={doc.doctorId}
              className="bg-muted/20 border-border/40 flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row"
            >
              <div>
                <p className="font-bold">{doc.doctorName}</p>
                <p className="text-muted-foreground text-xs">
                  عدد الزيارات: {doc.visitsCount}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground">التحصيل</p>
                  <p className="font-semibold">
                    {doc.collectedAmount?.toLocaleString()} ج.م
                  </p>
                </div>
                <div>
                  <p className="text-primary font-medium">الاستحقاق التقديري</p>
                  <p className="text-primary font-bold">
                    {doc.estimatedCompensationAmount?.toLocaleString()} ج.م
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
