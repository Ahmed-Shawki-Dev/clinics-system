'use client'

import { GenericPagination } from '@/components/shared/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IExpense } from '@/types/expense'
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
      <div className='flex justify-end'>
        <AddExpenseDialog tenantSlug={tenantSlug} />
      </div>

      <div className='border rounded-md overflow-hidden'>
        <Table dir='rtl'>
          <TableHeader className='bg-muted/50 h-12'>
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
                <TableCell>
                  {new Date(exp.expenseDate).toLocaleDateString('ar-EG-u-nu-latn', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
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
