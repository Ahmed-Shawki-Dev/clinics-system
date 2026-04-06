"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AbsenceRecord } from "@/types/attendance";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { WorkforceOptionsMap, WorkforceType } from "./attendance-types";
import { formatDateTime } from "./attendance-utils";

interface AbsenceMainTabProps {
  absenceType: WorkforceType;
  absenceWorkerId: string;
  absenceFromDate: string;
  absenceToDate: string;
  absenceReason: string;
  absenceIsPaid: boolean;
  workforceOptions: WorkforceOptionsMap;
  absenceRows: AbsenceRecord[];
  isSubmittingAbsence: boolean;
  onAbsenceTypeChange: (value: WorkforceType) => void;
  onAbsenceWorkerIdChange: (value: string) => void;
  onAbsenceFromDateChange: (value: string) => void;
  onAbsenceToDateChange: (value: string) => void;
  onAbsenceReasonChange: (value: string) => void;
  onAbsenceIsPaidChange: (value: boolean) => void;
  onSubmitAbsence: (e: FormEvent) => void;
}

export function AbsenceMainTab({
  absenceType,
  absenceWorkerId,
  absenceFromDate,
  absenceToDate,
  absenceReason,
  absenceIsPaid,
  workforceOptions,
  absenceRows,
  isSubmittingAbsence,
  onAbsenceTypeChange,
  onAbsenceWorkerIdChange,
  onAbsenceFromDateChange,
  onAbsenceToDateChange,
  onAbsenceReasonChange,
  onAbsenceIsPaidChange,
  onSubmitAbsence,
}: AbsenceMainTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">تسجيل إجازة</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmitAbsence}
            className="grid gap-3 md:grid-cols-[120px_1fr_140px_140px_1fr_auto] md:items-end"
          >
            <div className="space-y-1">
              <Label className="text-xs">النوع</Label>
              <Select
                value={absenceType}
                onValueChange={(value) =>
                  onAbsenceTypeChange(value as WorkforceType)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">الاسم</Label>
              <Select
                value={absenceWorkerId || "none"}
                onValueChange={(value) =>
                  onAbsenceWorkerIdChange(value === "none" ? "" : value)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">اختر</SelectItem>
                  {workforceOptions[absenceType].map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="absence-from" className="text-xs">
                من
              </Label>
              <Input
                id="absence-from"
                type="date"
                value={absenceFromDate}
                onChange={(e) => onAbsenceFromDateChange(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="absence-to" className="text-xs">
                إلى
              </Label>
              <Input
                id="absence-to"
                type="date"
                value={absenceToDate}
                onChange={(e) => onAbsenceToDateChange(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="absence-reason" className="text-xs">
                السبب
              </Label>
              <Input
                id="absence-reason"
                value={absenceReason}
                onChange={(e) => onAbsenceReasonChange(e.target.value)}
                className="h-9"
              />
            </div>

            <div className="flex items-center gap-3 md:pb-1">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={absenceIsPaid}
                  onChange={(e) => onAbsenceIsPaidChange(e.target.checked)}
                />
                Paid
              </label>
              <Button
                type="submit"
                className="h-9"
                disabled={isSubmittingAbsence}
              >
                {isSubmittingAbsence ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الفترة</TableHead>
                <TableHead>السبب</TableHead>
                <TableHead>مدفوعة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absenceRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    لا توجد سجلات.
                  </TableCell>
                </TableRow>
              ) : (
                absenceRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {row.doctorName || row.employeeName || "-"}
                    </TableCell>
                    <TableCell>{row.doctorId ? "Doctor" : "Staff"}</TableCell>
                    <TableCell>
                      {formatDateTime(row.fromDate)} -{" "}
                      {formatDateTime(row.toDate)}
                    </TableCell>
                    <TableCell>{row.reason || "-"}</TableCell>
                    <TableCell>
                      {row.isPaid ? (
                        <Badge variant="secondary">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
