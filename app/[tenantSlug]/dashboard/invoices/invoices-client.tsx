'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IInvoice } from '@/types/visit'
import { Printer } from 'lucide-react'
import { GenericPagination } from '../../../../components/shared/pagination'
import { EditInvoiceDialog } from './edit-invoice-modal'
import { PaymentDialog } from './payment-modal'

interface InvoicesClientProps {
  initialInvoices: IInvoice[]
  tenantSlug: string
  pagination: {
    pageNumber: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export function InvoicesClient({ initialInvoices, tenantSlug, pagination }: InvoicesClientProps) {
  const handlePrint = (invoice: IInvoice) => {
    const printContent = `
      <div dir="rtl" style="font-family: Arial; padding: 20px;">
        <h2 style="text-align: center;">إيصال استلام نقدية</h2>
        <hr />
        <p><strong>المريض:</strong> ${invoice.patientName}</p>
        <p><strong>الطبيب:</strong> ${invoice.doctorName}</p>
        <p><strong>الإجمالي:</strong> ${invoice.amount} ج.م</p>
        <p><strong>المدفوع:</strong> ${invoice.paidAmount} ج.م</p>
        <p><strong>المتبقي:</strong> ${invoice.remainingAmount} ج.م</p>
        <hr />
        <p style="text-align: center; font-size: 12px;">تم الإصدار من النظام الآلي</p>
      </div>
    `
    const printWindow = window.open('', '', 'width=600,height=600')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <div className='space-y-4'>
      <div className='border rounded-xl bg-card overflow-hidden'>
        <Table dir='rtl'>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='font-bold text-right'>رقم الفاتورة</TableHead>
              <TableHead className='font-bold text-right'>المريض</TableHead>
              <TableHead className='font-bold text-right'>الطبيب</TableHead>
              <TableHead className='font-bold text-right'>الإجمالي</TableHead>
              <TableHead className='font-bold text-right'>المتبقي</TableHead>
              <TableHead className='font-bold text-right'>الحالة</TableHead>
              <TableHead className='font-bold text-center'>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className='font-mono text-xs'>{inv.id.split('-')[0]}</TableCell>
                <TableCell className='font-bold'>{inv.patientName}</TableCell>
                <TableCell>{inv.doctorName}</TableCell>
                <TableCell className='font-bold text-primary'>{inv.amount} ج.م</TableCell>
                <TableCell className='font-bold text-destructive'>
                  {inv.remainingAmount} ج.م
                </TableCell>
                <TableCell>
                  <StatusBadge status={inv.status} />
                </TableCell>
                <TableCell className='flex gap-2 justify-center'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePrint(inv)}
                    title='طباعة'
                  >
                    <Printer className='h-4 w-4' />
                  </Button>

                  {/* مودال التعديل */}
                  <EditInvoiceDialog invoice={inv} tenantSlug={tenantSlug} />

                  {/* مودال الدفع (بيظهر بس لو الفاتورة مش مدفوعة بالكامل) */}
                  {inv.status !== 'Paid' && <PaymentDialog invoice={inv} tenantSlug={tenantSlug} />}
                </TableCell>
              </TableRow>
            ))}
            {initialInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center text-muted-foreground'>
                  لا توجد فواتير
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <GenericPagination
        currentPage={pagination.pageNumber}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: IInvoice['status'] }) {
  if (status === 'Paid')
    return (
      <Badge className='bg-green-100 text-green-700 hover:bg-green-100 border-transparent'>
        مدفوع
      </Badge>
    )
  if (status === 'PartiallyPaid')
    return (
      <Badge className='bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-transparent'>
        دفع جزئي
      </Badge>
    )
  return <Badge variant='destructive'>غير مدفوع</Badge>
}
