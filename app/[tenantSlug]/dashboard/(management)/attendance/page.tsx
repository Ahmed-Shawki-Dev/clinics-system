import {
  getAbsenceListAction,
  getAttendanceListAction,
  getWorkforceOptionsAction,
} from "@/actions/Attendance";
import { DashboardHeader, DashboardShell } from "@/components/shell";
import { AttendanceManagementView } from "./attendance-management-view";

interface Props {
  params: Promise<{ tenantSlug: string }>;
}

export default async function AttendancePage({ params }: Props) {
  const { tenantSlug } = await params;

  const [workforceOptions, attendanceRes, absenceRes] = await Promise.all([
    getWorkforceOptionsAction(tenantSlug),
    getAttendanceListAction(tenantSlug, {}),
    getAbsenceListAction(tenantSlug, {}),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="الحضور والانصراف"
        text="تسجيل حضور الأطباء والموظفين، إدارة الغياب والإجازات، ومتابعة السجلات اليومية."
      />

      <AttendanceManagementView
        tenantSlug={tenantSlug}
        doctors={workforceOptions.doctors}
        staff={workforceOptions.staff}
        initialAttendance={attendanceRes.data ?? []}
        initialAbsence={absenceRes.data ?? []}
      />
    </DashboardShell>
  );
}
