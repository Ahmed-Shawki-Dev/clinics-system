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
import { AttendanceRecord } from "@/types/attendance";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { WorkforceOptionsMap, WorkforceType } from "./attendance-types";
import { formatDateTime } from "./attendance-utils";

interface AttendanceMainTabProps {
  attendanceType: WorkforceType;
  attendanceWorkerId: string;
  lateMinutes: string;
  workforceOptions: WorkforceOptionsMap;
  attendanceRows: AttendanceRecord[];
  isSubmittingAttendance: boolean;
  checkoutLoadingId: string | null;
  onAttendanceTypeChange: (value: WorkforceType) => void;
  onAttendanceWorkerIdChange: (value: string) => void;
  onLateMinutesChange: (value: string) => void;
  onSubmitAttendance: (e: FormEvent) => void;
  onCheckout: (attendanceId?: string) => void;
}

export function AttendanceMainTab({
  attendanceType,
  attendanceWorkerId,
  lateMinutes,
  workforceOptions,
  attendanceRows,
  isSubmittingAttendance,
  checkoutLoadingId,
  onAttendanceTypeChange,
  onAttendanceWorkerIdChange,
  onLateMinutesChange,
  onSubmitAttendance,
  onCheckout,
}: AttendanceMainTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">تسجيل حضور سريع</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmitAttendance}
            className="grid gap-3 md:grid-cols-[120px_1fr_140px_auto] md:items-end"
          >
            <div className="space-y-1">
              <Label className="text-xs">النوع</Label>
              <Select
                value={attendanceType}
                onValueChange={(value) =>
                  onAttendanceTypeChange(value as WorkforceType)
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
                value={attendanceWorkerId || "none"}
                onValueChange={(value) =>
                  onAttendanceWorkerIdChange(value === "none" ? "" : value)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">اختر</SelectItem>
                  {workforceOptions[attendanceType].map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="late-minutes" className="text-xs">
                Late (min)
              </Label>
              <Input
                id="late-minutes"
                type="number"
                min={0}
                value={lateMinutes}
                onChange={(e) => onLateMinutesChange(e.target.value)}
                className="h-9"
              />
            </div>

            <Button
              type="submit"
              className="h-9"
              disabled={isSubmittingAttendance}
            >
              {isSubmittingAttendance ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check in"
              )}
            </Button>
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
                <TableHead>الحضور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>إجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    لا توجد سجلات.
                  </TableCell>
                </TableRow>
              ) : (
                attendanceRows.map((row) => {
                  const canCheckout = !row.checkOutAt && !row.isAbsent;
                  const isDoctor = !!row.doctorId;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.doctorName || row.employeeName || "-"}
                      </TableCell>
                      <TableCell>{isDoctor ? "Doctor" : "Staff"}</TableCell>
                      <TableCell>{formatDateTime(row.checkInAt)}</TableCell>
                      <TableCell>
                        {row.isAbsent ? (
                          <Badge variant="destructive">Absent</Badge>
                        ) : row.checkOutAt ? (
                          <Badge variant="secondary">Checked out</Badge>
                        ) : (
                          <Badge>Present</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={
                            !canCheckout || checkoutLoadingId === row.id
                          }
                          onClick={() => onCheckout(row.id)}
                        >
                          {checkoutLoadingId === row.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Checkout"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
