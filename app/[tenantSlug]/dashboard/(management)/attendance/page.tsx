import {
  getAbsenceListAction,
  getAttendanceListAction,
  getWorkforceOptionsAction,
} from "@/actions/Attendance";
import { PeriodFilter } from "@/components/shared/period-filter";
import { DashboardHeader, DashboardShell } from "@/components/shell";
import { AttendanceManagementView } from "./attendance-management-view";
import { toIsoFromDateInput } from "./attendance-utils";

interface Props {
  params: Promise<{ tenantSlug: string }>;
  searchParams: Promise<{
    from?: string | string[];
    to?: string | string[];
  }>;
}

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function toIsoIfValidDate(value?: string, endOfDay = false) {
  if (!value) return undefined;

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  if (!isDateOnly) return undefined;

  const iso = toIsoFromDateInput(value, endOfDay);
  return iso && !Number.isNaN(new Date(iso).getTime()) ? iso : undefined;
}

export default async function AttendancePage({ params, searchParams }: Props) {
  const { tenantSlug } = await params;
  const query = await searchParams;

  const fromValue = getSingleParam(query.from);
  const toValue = getSingleParam(query.to);
  const from = toIsoIfValidDate(fromValue);
  const to = toIsoIfValidDate(toValue, true);

  const [workforceOptions, attendanceRes, absenceRes] = await Promise.all([
    getWorkforceOptionsAction(tenantSlug),
    getAttendanceListAction(tenantSlug, { from, to }),
    getAbsenceListAction(tenantSlug, { from, to }),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="الحضور والانصراف"
        text="تسجيل حضور الأطباء والموظفين، إدارة الغياب والإجازات، ومتابعة السجلات اليومية."
      >
        <PeriodFilter />
      </DashboardHeader>

      <AttendanceManagementView
        tenantSlug={tenantSlug}
        doctors={workforceOptions.doctors}
        staff={workforceOptions.staff}
        initialAttendance={attendanceRes.data ?? []}
        initialAbsence={absenceRes.data ?? []}
        activeQuery={{ from, to }}
      />
    </DashboardShell>
  );
}
