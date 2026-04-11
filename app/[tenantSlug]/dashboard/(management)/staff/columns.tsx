"use client";

import { IStaff } from "@/types/staff";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Phone, User } from "lucide-react";
import { StaffActionsCell } from "./staff-actions-cell";

// 1. Helper Type-Safe
const columnHelper = createColumnHelper<IStaff>();

export const columns = [
  // الاسم
  columnHelper.accessor("name", {
    header: "الموظف",

    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      // لو الدكتور موقوف، بنقلل الـ opacity عشان يبان للمستخدم إنه مش شغال
      const opacityClass = row.original.isEnabled
        ? "opacity-100"
        : "opacity-50";

      return (
        <div className={`flex items-center gap-3 ${opacityClass}`}>
          <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full border">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-muted-foreground text-xs">
              {row.original.username}
            </span>
          </div>
        </div>
      );
    },
  }),

  // الوظيفة
  columnHelper.accessor("role", {
    header: "الوظيفة",
    cell: (info) =>
      info.getValue() === "ClinicManager"
        ? "مدير عيادة"
        : info.getValue() === "Receptionist"
          ? "إستقبال"
          : info.getValue(),
  }),

  // الهاتف
  columnHelper.accessor("phone", {
    header: "الهاتف",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Phone className="text-primary h-4 w-4" />
        {info.getValue() ? (
          <span>{info.getValue()}</span>
        ) : (
          <span>لا يوجد رقم</span>
        )}
      </div>
    ),
  }),

  // الحالة
  columnHelper.accessor("isEnabled", {
    header: "الحالة",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${info.getValue() ? "bg-emerald-500" : "bg-destructive"}`}
        />
        <span className="text-muted-foreground text-sm">
          {info.getValue() ? "نشط" : "معطل"}
        </span>
      </div>
    ),
  }),

  // تاريخ الإضافة
  columnHelper.accessor("createdAt", {
    header: "تاريخ الإضافة",
    cell: (info) => {
      const createdAt = info.getValue();

      return (
        <span>
          {createdAt
            ? new Date(createdAt).toLocaleDateString("ar-EG")
            : "غير متاح"}
        </span>
      );
    },
  }),

  // الإجراءات
  columnHelper.display({
    id: "actions",
    header: "الإجراءات",
    cell: ({ row }) => <StaffActionsCell staff={row.original} />,
  }),
] as ColumnDef<IStaff>[];
