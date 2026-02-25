'use client'

import { IExpense } from '@/types/expense'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { GenericPagination } from '@/components/shared/pagination' // راجع مسار الباجينيشن بتاعك
import { AddExpenseDialog } from './add-expense-dialog'

interface ExpensesClientProps {
  initialExpenses: IExpense[]
  tenantSlug: string
  pagination: {
    pageNumber: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export function ExpensesClient({ initialExpenses, tenantSlug, pagination }: ExpensesClientProps) {
  return (
    <div className='space-y-4'>
      {/* زرار الإضافة في وش الجدول */}
      <div className='flex justify-end'>
        <AddExpenseDialog tenantSlug={tenantSlug} />
      </div>

      <div className='border rounded-xl bg-card overflow-hidden'>
        <Table dir='rtl'>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='font-bold text-right'>التاريخ</TableHead>
              <TableHead className='font-bold text-right'>البند</TableHead>
              <TableHead className='font-bold text-right'>المبلغ</TableHead>
              <TableHead className='font-bold text-right'>المسجل بواسطة</TableHead>
              <TableHead className='font-bold text-right'>ملاحظات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialExpenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className='font-mono'>
                  {new Date(exp.expenseDate).toLocaleDateString('ar-EG')}
                </TableCell>
                <TableCell className='font-bold'>{exp.category}</TableCell>
                <TableCell className='font-bold text-destructive'>{exp.amount} ج.م</TableCell>
                <TableCell>{exp.recordedByName}</TableCell>
                <TableCell className='text-muted-foreground'>{exp.notes || '---'}</TableCell>
              </TableRow>
            ))}

            {initialExpenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center text-muted-foreground'>
                  لا توجد مصروفات مسجلة في هذه الفترة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* الباجينيشن بتاعك */}
      <GenericPagination
        currentPage={pagination.pageNumber}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </div>
  )
}
