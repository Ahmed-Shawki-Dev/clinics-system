"use client";

import {
  checkoutAttendanceAction,
  createAbsenceAction,
  createAttendanceAction,
  getAbsenceListAction,
  getAttendanceListAction,
} from "@/actions/Attendance";
import { AbsenceRecord, AttendanceRecord } from "@/types/attendance";
import { IDoctor } from "@/types/doctor";
import { IStaff } from "@/types/staff";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { AttendanceFiltersState, WorkforceType } from "./attendance-types";
import { toDateInputValue, toIsoFromDateInput } from "./attendance-utils";

interface UseAttendanceManagementParams {
  tenantSlug: string;
  doctors: IDoctor[];
  staff: IStaff[];
  initialAttendance: AttendanceRecord[];
  initialAbsence: AbsenceRecord[];
}

export function useAttendanceManagement({
  tenantSlug,
  doctors,
  staff,
  initialAttendance,
  initialAbsence,
}: UseAttendanceManagementParams) {
  const [attendanceRows, setAttendanceRows] =
    useState<AttendanceRecord[]>(initialAttendance);
  const [absenceRows, setAbsenceRows] =
    useState<AbsenceRecord[]>(initialAbsence);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const [isSubmittingAbsence, setIsSubmittingAbsence] = useState(false);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<string | null>(
    null,
  );

  const [filters, setFilters] = useState<AttendanceFiltersState>({
    from: toDateInputValue(new Date()),
    to: toDateInputValue(new Date()),
    personType: "all",
    personId: "all",
  });

  const [attendanceType, setAttendanceType] = useState<WorkforceType>("doctor");
  const [attendanceWorkerId, setAttendanceWorkerId] = useState("");
  const [lateMinutes, setLateMinutes] = useState("0");

  const [absenceType, setAbsenceType] = useState<WorkforceType>("doctor");
  const [absenceWorkerId, setAbsenceWorkerId] = useState("");
  const [absenceFromDate, setAbsenceFromDate] = useState(
    toDateInputValue(new Date()),
  );
  const [absenceToDate, setAbsenceToDate] = useState(
    toDateInputValue(new Date()),
  );
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceIsPaid, setAbsenceIsPaid] = useState(false);

  const workforceOptions = useMemo(
    () => ({
      doctor: doctors.map((d) => ({ id: d.id, label: d.name })),
      staff: staff.map((s) => ({ id: s.id, label: s.name })),
    }),
    [doctors, staff],
  );

  const filterPersonOptions =
    filters.personType === "doctor"
      ? workforceOptions.doctor
      : filters.personType === "staff"
        ? workforceOptions.staff
        : [];

  const getQueryParamsFromFilters = useCallback(
    (sourceFilters: AttendanceFiltersState) => {
      return {
        from:
          sourceFilters.from && sourceFilters.from !== ""
            ? toIsoFromDateInput(sourceFilters.from)
            : undefined,
        to:
          sourceFilters.to && sourceFilters.to !== ""
            ? toIsoFromDateInput(sourceFilters.to, true)
            : undefined,
        doctorId:
          sourceFilters.personType === "doctor" &&
          sourceFilters.personId &&
          sourceFilters.personId !== "all"
            ? sourceFilters.personId
            : undefined,
        employeeId:
          sourceFilters.personType === "staff" &&
          sourceFilters.personId &&
          sourceFilters.personId !== "all"
            ? sourceFilters.personId
            : undefined,
      };
    },
    [],
  );

  const refreshLists = useCallback(
    async (nextFilters?: AttendanceFiltersState) => {
      const sourceFilters = nextFilters ?? filters;
      const params = getQueryParamsFromFilters(sourceFilters);

      setIsRefreshing(true);
      const [attendanceRes, absenceRes] = await Promise.all([
        getAttendanceListAction(tenantSlug, params),
        getAbsenceListAction(tenantSlug, params),
      ]);
      setIsRefreshing(false);

      if (!attendanceRes.success) {
        toast.error(attendanceRes.message || "فشل تحميل سجلات الحضور");
      }
      if (!absenceRes.success) {
        toast.error(absenceRes.message || "فشل تحميل سجلات الإجازات");
      }

      setAttendanceRows(attendanceRes.data ?? []);
      setAbsenceRows(absenceRes.data ?? []);
    },
    [filters, getQueryParamsFromFilters, tenantSlug],
  );

  const updateFilters = useCallback(
    async (nextFilters: AttendanceFiltersState) => {
      setFilters(nextFilters);
      await refreshLists(nextFilters);
    },
    [refreshLists],
  );

  const submitAttendance = useCallback(async () => {
    if (!attendanceWorkerId) {
      toast.error("اختر طبيب أو موظف أولا");
      return;
    }

    const payload = {
      doctorId: attendanceType === "doctor" ? attendanceWorkerId : undefined,
      employeeId: attendanceType === "staff" ? attendanceWorkerId : undefined,
      checkInAt: new Date().toISOString(),
      lateMinutes: Number(lateMinutes) || 0,
      isAbsent: false,
    };

    setIsSubmittingAttendance(true);
    const response = await createAttendanceAction(tenantSlug, payload);
    setIsSubmittingAttendance(false);

    if (!response.success) {
      toast.error(response.message || "فشل تسجيل الحضور");
      return;
    }

    toast.success(response.message || "تم تسجيل الحضور بنجاح");
    setLateMinutes("0");
    await refreshLists();
  }, [
    attendanceType,
    attendanceWorkerId,
    lateMinutes,
    refreshLists,
    tenantSlug,
  ]);

  const submitAbsence = useCallback(async () => {
    if (!absenceWorkerId) {
      toast.error("اختر طبيب أو موظف أولا");
      return;
    }

    if (!absenceReason.trim()) {
      toast.error("سبب الإجازة أو الغياب مطلوب");
      return;
    }

    const payload = {
      doctorId: absenceType === "doctor" ? absenceWorkerId : undefined,
      employeeId: absenceType === "staff" ? absenceWorkerId : undefined,
      fromDate: toIsoFromDateInput(absenceFromDate),
      toDate: toIsoFromDateInput(absenceToDate, true),
      reason: absenceReason,
      isPaid: absenceIsPaid,
    };

    setIsSubmittingAbsence(true);
    const response = await createAbsenceAction(tenantSlug, payload);
    setIsSubmittingAbsence(false);

    if (!response.success) {
      toast.error(response.message || "فشل تسجيل الإجازة");
      return;
    }

    toast.success(response.message || "تم تسجيل الإجازة/الغياب بنجاح");
    setAbsenceReason("");
    await refreshLists();
  }, [
    absenceFromDate,
    absenceIsPaid,
    absenceReason,
    absenceToDate,
    absenceType,
    absenceWorkerId,
    refreshLists,
    tenantSlug,
  ]);

  const submitCheckout = useCallback(
    async (attendanceId?: string) => {
      if (!attendanceId) return;

      setCheckoutLoadingId(attendanceId);
      const response = await checkoutAttendanceAction(
        tenantSlug,
        attendanceId,
        {
          checkOutAt: new Date().toISOString(),
          overtimeMinutes: 0,
        },
      );
      setCheckoutLoadingId(null);

      if (!response.success) {
        toast.error(response.message || "فشل تسجيل الانصراف");
        return;
      }

      toast.success(response.message || "تم تسجيل الانصراف");
      await refreshLists();
    },
    [refreshLists, tenantSlug],
  );

  return {
    attendanceRows,
    absenceRows,
    filters,
    isRefreshing,
    updateFilters,
    refreshLists,
    filterPersonOptions,
    workforceOptions,

    attendanceType,
    attendanceWorkerId,
    lateMinutes,
    setAttendanceType,
    setAttendanceWorkerId,
    setLateMinutes,
    isSubmittingAttendance,
    submitAttendance,

    absenceType,
    absenceWorkerId,
    absenceFromDate,
    absenceToDate,
    absenceReason,
    absenceIsPaid,
    setAbsenceType,
    setAbsenceWorkerId,
    setAbsenceFromDate,
    setAbsenceToDate,
    setAbsenceReason,
    setAbsenceIsPaid,
    isSubmittingAbsence,
    submitAbsence,

    checkoutLoadingId,
    submitCheckout,
  };
}
