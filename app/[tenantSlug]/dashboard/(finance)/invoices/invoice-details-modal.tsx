'use client'

import { getInvoiceByIdAction } from '@/actions/finance/invoices'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IInvoice } from '@/types/visit'
import {
  CreditCard,
  Eye,
  Loader2,
  ReceiptText,
  UserCircle,
  Wallet,
  AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'

export function InvoiceDetailsAction({
  invoiceId,
  tenantSlug,
}: {
  invoiceId: string
  tenantSlug: string
}) {
  const [open, setOpen] = useState(false)
  const [invoice, setInvoice] = useState<IInvoice | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen && !invoice) {
      setLoading(true)
      const res = await getInvoiceByIdAction(tenantSlug, invoiceId)
      if (res.success && res.data) {
        setInvoice(res.data)
      }
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div
          role='menuitem'
          className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground font-bold w-full'
          onClick={(e) => e.stopPropagation()}
        >
          <Eye className='w-4 h-4 ml-2 text-primary' /> عرض التفاصيل
        </div>
      </DialogTrigger>

      <DialogContent className='max-w-3xl p-0 gap-0 overflow-hidden bg-background sm:rounded-xl'>
        <div className='bg-muted/50 px-6 py-4 border-b border-border'>
          <DialogHeader>
            <div className='flex items-center justify-between'>
              <DialogTitle className='flex items-center gap-2 text-lg font-bold text-foreground'>
                <ReceiptText className='w-5 h-5 text-muted-foreground' />
                تفاصيل الفاتورة
                {!loading && invoice && (
                  <span className='text-muted-foreground font-mono font-medium text-sm mr-2'>
                    #{invoice.invoiceNumber}
                  </span>
                )}
                {!loading && invoice && !invoice.isServiceRendered && (
                  <Badge variant='outline' className='mr-2 text-destructive border-destructive/50'>
                    لم يتم تقديم الخدمة
                  </Badge>
                )}
              </DialogTitle>
              {!loading && invoice && <StatusBadge status={invoice.status} />}
            </div>
          </DialogHeader>
        </div>

        <div className='max-h-[80vh] overflow-y-auto px-6 py-6'>
          {loading ? (
            <div className='flex flex-col justify-center items-center py-20'>
              <Loader2 className='w-8 h-8 animate-spin text-primary mb-4' />
              <p className='text-muted-foreground text-sm font-medium'>جاري تحميل البيانات...</p>
            </div>
          ) : !invoice ? (
            <div className='flex flex-col justify-center items-center py-20'>
              <ReceiptText className='w-12 h-12 text-muted-foreground/30 mb-4' />
              <p className='text-muted-foreground font-medium'>حدث خطأ في تحميل الفاتورة</p>
            </div>
          ) : (
            <div className='space-y-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col justify-center p-4 rounded-lg border bg-card'>
                  <div className='flex items-center gap-2 mb-1 text-muted-foreground'>
                    <UserCircle className='w-4 h-4' />
                    <span className='text-xs font-semibold'>المريض</span>
                  </div>
                  <p className='text-base font-bold text-foreground pr-6'>{invoice.patientName}</p>
                  {invoice.patientPhone && (
                    <p className='text-sm text-muted-foreground pr-6 font-mono'>
                      {invoice.patientPhone}
                    </p>
                  )}
                </div>
                <div className='flex flex-col justify-center p-4 rounded-lg border bg-card'>
                  <div className='flex items-center gap-2 mb-1 text-muted-foreground'>
                    <UserCircle className='w-4 h-4' />
                    <span className='text-xs font-semibold'>الطبيب المعالج</span>
                  </div>
                  <p className='text-base font-bold text-foreground pr-6'>
                    د. {invoice.doctorName}
                  </p>
                </div>
              </div>

              <div className='rounded-lg border bg-card overflow-hidden'>
                <div className='px-4 py-3 bg-muted/50 border-b flex items-center gap-2'>
                  <Wallet className='w-4 h-4 text-muted-foreground' />
                  <h3 className='text-sm font-bold'>الملخص المالي</h3>
                </div>
                <div className='divide-y divide-border'>
                  <div className='flex justify-between items-center px-4 py-3'>
                    <span className='text-sm text-muted-foreground'>إجمالي الفاتورة</span>
                    <span className='font-bold text-foreground'>{invoice.amount} ج.م</span>
                  </div>
                  <div className='flex justify-between items-center px-4 py-3'>
                    <span className='text-sm text-muted-foreground'>المدفوع</span>
                    <span className='font-bold text-primary'>{invoice.paidAmount} ج.م</span>
                  </div>
                  <div className='flex justify-between items-center px-4 py-3 bg-muted/20'>
                    <span className='text-sm font-bold text-foreground'>المبلغ المتبقي</span>
                    <span className='text-lg font-black text-destructive'>
                      {invoice.remainingAmount} ج.م
                    </span>
                  </div>

                  {invoice.creditAmount > 0 && (
                    <div className='flex justify-between items-center px-4 py-3 bg-destructive/10'>
                      <div className='flex items-center gap-2 text-destructive'>
                        <AlertTriangle className='w-4 h-4' />
                        <span className='text-sm font-bold'>
                          رصيد مستحق للمريض (تم قفل الجلسة بدون كشف)
                        </span>
                      </div>
                      <span className='font-bold text-destructive'>{invoice.creditAmount} ج.م</span>
                    </div>
                  )}
                </div>
              </div>

              <div className='space-y-3'>
                <h3 className='font-bold text-sm flex items-center gap-2 text-foreground px-1'>
                  <CreditCard className='w-4 h-4 text-muted-foreground' /> سجل الدفعات
                </h3>
                <div className='border rounded-lg overflow-hidden bg-card'>
                  <Table>
                    <TableHeader className='bg-muted/50'>
                      <TableRow className='hover:bg-transparent'>
                        <TableHead className='font-semibold text-xs text-muted-foreground h-10'>
                          التاريخ
                        </TableHead>
                        <TableHead className='font-semibold text-xs text-muted-foreground h-10'>
                          المبلغ
                        </TableHead>
                        <TableHead className='font-semibold text-xs text-muted-foreground h-10'>
                          طريقة الدفع
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoice.payments && invoice.payments.length > 0 ? (
                        invoice.payments.map((payment) => (
                          <TableRow key={payment.id} className='hover:bg-muted/10'>
                            <TableCell className='text-xs whitespace-nowrap font-mono'>
                              {new Date(payment.createdAt).toLocaleString('ar-EG')}
                            </TableCell>
                            <TableCell className='font-bold text-sm text-foreground'>
                              {payment.amount} ج.م
                            </TableCell>
                            <TableCell>
                              <Badge variant='outline' className='text-xs font-medium'>
                                {payment.paymentMethod}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className='text-center text-muted-foreground py-10 text-sm'
                          >
                            لا توجد أي عمليات دفع مسجلة.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Paid')
    return (
      <Badge variant='secondary' className='bg-primary/10 text-primary hover:bg-primary/20'>
        مدفوعة
      </Badge>
    )
  if (status === 'PartiallyPaid') return <Badge variant='secondary'>دفع جزئي</Badge>
  return (
    <Badge
      variant='destructive'
      className='bg-destructive/10 text-destructive hover:bg-destructive/20'
    >
      غير مدفوعة
    </Badge>
  )
}
