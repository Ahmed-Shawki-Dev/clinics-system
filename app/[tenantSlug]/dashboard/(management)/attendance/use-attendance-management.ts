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
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { WorkforceType } from "./attendance-types";
import { toDateInputValue, toIsoFromDateInput } from "./attendance-utils";

interface UseAttendanceManagementParams {
  tenantSlug: string;
  doctors: IDoctor[];
  staff: IStaff[];
  initialAttendance: AttendanceRecord[];
  initialAbsence: AbsenceRecord[];
  activeQuery: {
    from?: string;
    to?: string;
  };
}

export function useAttendanceManagement({
  tenantSlug,
  doctors,
  staff,
  initialAttendance,
  initialAbsence,
  activeQuery,
}: UseAttendanceManagementParams) {
  const [attendanceRows, setAttendanceRows] =
    useState<AttendanceRecord[]>(initialAttendance);
  const [absenceRows, setAbsenceRows] =
    useState<AbsenceRecord[]>(initialAbsence);

  const [isSubmittingAttendance, setIsSubmittingAttendance] = useState(false);
  const [isSubmittingAbsence, setIsSubmittingAbsence] = useState(false);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState<string | null>(
    null,
  );

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAttendanceRows(initialAttendance);
    setAbsenceRows(initialAbsence);
  }, [initialAttendance, initialAbsence]);

  const refreshLists = useCallback(async () => {
    const params = {
      from: activeQuery.from,
      to: activeQuery.to,
    };

    const [attendanceRes, absenceRes] = await Promise.all([
      getAttendanceListAction(tenantSlug, params),
      getAbsenceListAction(tenantSlug, params),
    ]);

    if (!attendanceRes.success) {
      toast.error(attendanceRes.message || "فشل تحميل سجلات الحضور");
    }
    if (!absenceRes.success) {
      toast.error(absenceRes.message || "فشل تحميل سجلات الإجازات");
    }

    setAttendanceRows(attendanceRes.data ?? []);
    setAbsenceRows(absenceRes.data ?? []);
  }, [activeQuery.from, activeQuery.to, tenantSlug]);

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
    refreshLists,
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
