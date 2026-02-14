'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, XCircle, ArrowUpCircle } from 'lucide-react'
import { IQueueTicket } from '@/types/queue'
import { markTicketUrgent, cancelTicket } from '@/actions/queue/tickets'
import { toast } from 'sonner'

export const getQueueColumns = (tenantSlug: string): ColumnDef<IQueueTicket>[] => [
  {
    accessorKey: 'ticketNumber',
    header: 'رقم التذكرة',
    cell: ({ row }) => <div className='font-bold text-lg'>#{row.getValue('ticketNumber')}</div>,
  },
  {
    accessorKey: 'patientName',
    header: 'اسم المريض',
    cell: ({ row }) => {
      const isUrgent = row.original.isUrgent
      return (
        <div className='flex items-center gap-2'>
          <span className='font-medium'>{row.getValue('patientName')}</span>
          {isUrgent && (
            <Badge variant='destructive' className='animate-pulse gap-1'>
              <AlertCircle className='h-3 w-3' />
              طوارئ
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'serviceName',
    header: 'الخدمة',
    cell: ({ row }) => row.getValue('serviceName') || 'كشف عام',
  },
  {
    id: 'actions',
    header: 'إجراءات',
    cell: ({ row }) => {
      const ticket = row.original

      return (
        <div className='flex items-center gap-2'>
          {/* زرار رفع الحالة لطوارئ (يظهر فقط لو مش طوارئ أصلاً) */}
          {!ticket.isUrgent && (
            <Button
              variant='outline'
              size='sm'
              className='text-orange-600 border-orange-200 hover:bg-orange-50 gap-1'
              onClick={async () => {
                const res = await markTicketUrgent(tenantSlug, ticket.id)
                if (res.success) toast.success('تم رفع الحالة لطوارئ')
              }}
            >
              <ArrowUpCircle className='h-4 w-4' />
              استعجال
            </Button>
          )}

          {/* زرار إلغاء التذكرة */}
          <Button
            variant='ghost'
            size='sm'
            className='text-destructive hover:bg-destructive/10 gap-1'
            onClick={async () => {
              const res = await cancelTicket(tenantSlug, ticket.id)
              if (res.success) toast.success('تم إلغاء التذكرة')
            }}
          >
            <XCircle className='h-4 w-4' />
            إلغاء
          </Button>
        </div>
      )
    },
  },
]
