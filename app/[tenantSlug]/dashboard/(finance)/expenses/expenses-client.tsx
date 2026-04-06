"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GenericPagination } from "@/components/shared/pagination"; // المكون بتاعك
import { IExpense } from "@/types/expense";
import { ExpenseRowActions } from "./expense-row-actions";
import { AddExpenseDialog } from "./add-expense-dialog";

interface Props {
  initialExpenses: IExpense[];
  tenantSlug: string;
  pagination: {
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function ExpensesClient({
  initialExpenses,
  tenantSlug,
  pagination,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black">سجل المصروفات</h3>
        <AddExpenseDialog tenantSlug={tenantSlug} />
      </div>

      <div className="overflow-hidden rounded-md border shadow-sm">
        <Table dir="rtl">
          <TableHeader className="bg-muted/50 h-12">
            <TableRow>
              <TableHead className="text-muted-foreground font-bold">
                التاريخ
              </TableHead>
              <TableHead className="text-muted-foreground font-bold">
                البند
              </TableHead>
              <TableHead className="text-muted-foreground font-bold">
                المبلغ
              </TableHead>
              <TableHead className="text-muted-foreground font-bold">
                بواسطة
              </TableHead>
              <TableHead className="text-muted-foreground text-right font-bold">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialExpenses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-32 text-center"
                >
                  لا توجد مصروفات مسجلة.
                </TableCell>
              </TableRow>
            ) : (
              initialExpenses.map((exp) => (
                <TableRow
                  key={exp.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(exp.expenseDate ?? "").toLocaleDateString(
                      "ar-EG",
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{exp.category}</TableCell>
                  <TableCell className="text-lg font-bold">
                    {exp.amount?.toLocaleString()}
                    <span className="font-sans text-[10px]">ج.م</span>
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    {exp.recordedByName}
                  </TableCell>
                  <TableCell className="text-right">
                    <ExpenseRowActions exp={exp} tenantSlug={tenantSlug} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <GenericPagination
            currentPage={pagination.pageNumber}
            totalPages={pagination.totalPages}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
          />
        </div>
      )}
    </div>
  );
}
