'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IInvoice } from '@/types/visit'
import { MoreHorizontal, Pencil, Plus, Printer } from 'lucide-react'
import { useState } from 'react'
import { GenericPagination } from '../../../../../components/shared/pagination'
import { EditInvoiceDialog } from './edit-invoice-modal'
import { PaymentDialog } from './payment-modal'
import { InvoiceDetailsAction } from './invoice-details-modal'

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
  const [editingInvoice, setEditingInvoice] = useState<IInvoice | null>(null)
  const [payingInvoice, setPayingInvoice] = useState<IInvoice | null>(null)

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
      <div className='border rounded-md overflow-hidden shadow-sm'>
        <Table>
          <TableHeader className='bg-muted/30 h-12'>
            <TableRow>
              <TableHead className='font-bold text-right text-muted-foreground'>
                رقم الفاتورة
              </TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>التاريخ</TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>المريض</TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>الطبيب</TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>الإجمالي</TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>المتبقي</TableHead>
              <TableHead className='font-bold text-right text-muted-foreground'>الحالة</TableHead>
              <TableHead className='font-bold text-center text-muted-foreground w-16'>
                إجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className='font-mono text-xs text-muted-foreground'>
                  #{inv.id.split('-')[0].toUpperCase()}
                </TableCell>
                <TableCell className='text-sm whitespace-nowrap'>
                  {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell className='font-bold text-foreground'>{inv.patientName}</TableCell>
                <TableCell className='text-muted-foreground text-sm'>د. {inv.doctorName}</TableCell>
                <TableCell className='font-bold'>{inv.amount} ج.م</TableCell>
                <TableCell className='font-bold text-destructive'>
                  {inv.remainingAmount} ج.م
                </TableCell>
                <TableCell>
                  <StatusBadge status={inv.status} />
                </TableCell>
                <TableCell className='text-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8 hover:bg-muted'>
                        <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-40'>
                      <DropdownMenuLabel className='text-xs text-muted-foreground'>
                        خيارات الفاتورة
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <InvoiceDetailsAction invoiceId={inv.id} tenantSlug={tenantSlug} />

                      <DropdownMenuItem onClick={() => handlePrint(inv)} className='cursor-pointer'>
                        <Printer className='h-4 w-4 ml-2 text-primary' /> طباعة الإيصال
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setEditingInvoice(inv)}
                        className='cursor-pointer'
                      >
                        <Pencil className='h-4 w-4 ml-2 text-primary' /> تعديل الإجمالي
                      </DropdownMenuItem>

                      {inv.status !== 'Paid' && (
                        <DropdownMenuItem
                          onClick={() => setPayingInvoice(inv)}
                          className='cursor-pointer font-bold text-emerald-600 focus:text-emerald-700'
                        >
                          <Plus className='h-4 w-4 ml-2' /> تسجيل دفعة
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {initialInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className='h-32 text-center text-muted-foreground'>
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

      {editingInvoice && (
        <EditInvoiceDialog
          invoice={editingInvoice}
          tenantSlug={tenantSlug}
          open={!!editingInvoice}
          setOpen={(open) => !open && setEditingInvoice(null)}
        />
      )}

      {payingInvoice && (
        <PaymentDialog
          invoice={payingInvoice}
          tenantSlug={tenantSlug}
          open={!!payingInvoice}
          setOpen={(open) => !open && setPayingInvoice(null)}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: IInvoice['status'] }) {
  if (status === 'Paid')
    return (
      <Badge className='bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0 shadow-none px-2.5 py-0.5'>
        مدفوع
      </Badge>
    )
  if (status === 'PartiallyPaid')
    return (
      <Badge className='bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0 shadow-none px-2.5 py-0.5'>
        دفع جزئي
      </Badge>
    )
  return (
    <Badge className='bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-0 shadow-none px-2.5 py-0.5'>
      غير مدفوع
    </Badge>
  )
}
