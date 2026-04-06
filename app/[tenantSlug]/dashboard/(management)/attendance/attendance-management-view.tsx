"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbsenceRecord, AttendanceRecord } from "@/types/attendance";
import { IDoctor } from "@/types/doctor";
import { IStaff } from "@/types/staff";
import { FormEvent } from "react";
import { AbsenceMainTab } from "./absence-main-tab";
import { AttendanceFilterBar } from "./attendance-filter-bar";
import { AttendanceMainTab } from "./attendance-main-tab";
import { useAttendanceManagement } from "./use-attendance-management";

interface Props {
  tenantSlug: string;
  doctors: IDoctor[];
  staff: IStaff[];
  initialAttendance: AttendanceRecord[];
  initialAbsence: AbsenceRecord[];
}

export function AttendanceManagementView({
  tenantSlug,
  doctors,
  staff,
  initialAttendance,
  initialAbsence,
}: Props) {
  const model = useAttendanceManagement({
    tenantSlug,
    doctors,
    staff,
    initialAttendance,
    initialAbsence,
  });

  return (
    <div className="space-y-4">
      <AttendanceFilterBar
        filters={model.filters}
        personOptions={model.filterPersonOptions}
        isRefreshing={model.isRefreshing}
        onChange={model.updateFilters}
        onReset={() =>
          model.updateFilters({
            from: model.filters.from,
            to: model.filters.to,
            personType: "all",
            personId: "all",
          })
        }
      />

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="attendance">الحضور والانصراف</TabsTrigger>
          <TabsTrigger value="absence">الإجازات</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="mt-4">
          <AttendanceMainTab
            attendanceType={model.attendanceType}
            attendanceWorkerId={model.attendanceWorkerId}
            lateMinutes={model.lateMinutes}
            workforceOptions={model.workforceOptions}
            attendanceRows={model.attendanceRows}
            isSubmittingAttendance={model.isSubmittingAttendance}
            checkoutLoadingId={model.checkoutLoadingId}
            onAttendanceTypeChange={(value) => {
              model.setAttendanceType(value);
              model.setAttendanceWorkerId("");
            }}
            onAttendanceWorkerIdChange={model.setAttendanceWorkerId}
            onLateMinutesChange={model.setLateMinutes}
            onSubmitAttendance={(e: FormEvent) => {
              e.preventDefault();
              void model.submitAttendance();
            }}
            onCheckout={(id) => {
              void model.submitCheckout(id);
            }}
          />
        </TabsContent>

        <TabsContent value="absence" className="mt-4">
          <AbsenceMainTab
            absenceType={model.absenceType}
            absenceWorkerId={model.absenceWorkerId}
            absenceFromDate={model.absenceFromDate}
            absenceToDate={model.absenceToDate}
            absenceReason={model.absenceReason}
            absenceIsPaid={model.absenceIsPaid}
            workforceOptions={model.workforceOptions}
            absenceRows={model.absenceRows}
            isSubmittingAbsence={model.isSubmittingAbsence}
            onAbsenceTypeChange={(value) => {
              model.setAbsenceType(value);
              model.setAbsenceWorkerId("");
            }}
            onAbsenceWorkerIdChange={model.setAbsenceWorkerId}
            onAbsenceFromDateChange={model.setAbsenceFromDate}
            onAbsenceToDateChange={model.setAbsenceToDate}
            onAbsenceReasonChange={model.setAbsenceReason}
            onAbsenceIsPaidChange={model.setAbsenceIsPaid}
            onSubmitAbsence={(e: FormEvent) => {
              e.preventDefault();
              void model.submitAbsence();
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
