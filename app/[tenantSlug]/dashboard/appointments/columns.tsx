'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { ArrowUpDown, Calendar, Clock, Phone, Stethoscope, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IBooking } from '@/types/booking'
import { BookingRowActions } from './BookingRowActions'

const columnHelper = createColumnHelper<IBooking>()

export const columns = [
  // 1. عمود المريض
  columnHelper.accessor('patientName', {
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          المريض
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='flex flex-col gap-1 text-right'>
        <span className='font-semibold flex items-center gap-2'>
          <User className='h-3 w-3 text-muted-foreground' />
          {row.original.patientName}
        </span>
        <span className='text-xs text-muted-foreground font-mono flex items-center gap-1'>
          <Phone className='h-3 w-3' />
          {row.original.patientPhone}
        </span>
      </div>
    ),
  }),

  // 2. عمود الدكتور
  columnHelper.accessor('doctorName', {
    header: 'الدكتور',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1 text-right'>
        <div className='flex items-center gap-2'>
          <Stethoscope className='h-3 w-3 text-primary' />
          <span className='font-medium'>{row.original.doctorName}</span>
        </div>
        {row.original.serviceName && (
          <span className='text-xs text-muted-foreground mr-5'>{row.original.serviceName}</span>
        )}
      </div>
    ),
  }),

  // 3. عمود الميعاد (العمود "التنين" اللي رتبناه)
  columnHelper.accessor('bookingDate', {
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          الميعاد
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    // دالة الترتيب المخصصة: تدمج التاريخ مع الوقت للمقارنة
    sortingFn: (rowA, rowB) => {
      const dateTimeA = new Date(
        `${rowA.original.bookingDate.split('T')[0]}T${rowA.original.bookingTime}`,
      ).getTime()
      const dateTimeB = new Date(
        `${rowB.original.bookingDate.split('T')[0]}T${rowB.original.bookingTime}`,
      ).getTime()
      return dateTimeA - dateTimeB
    },
    cell: ({ row }) => (
      <div className='flex flex-col gap-1 text-right'>
        <div className='flex items-center gap-1 text-sm'>
          <Calendar className='h-3 w-3 text-muted-foreground' />
          {format(new Date(row.original.bookingDate), 'PPP', { locale: ar })}
        </div>
        <div className='flex items-center gap-1 font-mono text-xs text-muted-foreground'>
          <Clock className='h-3 w-3' />
          {row.original.bookingTime}
        </div>
      </div>
    ),
  }),

  // 4. عمود الحالة
  columnHelper.accessor('status', {
    header: 'الحالة',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
      const status = row.original.status

      const statusConfig: Record<
        string,
        { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
      > = {
        Confirmed: { label: 'مؤكد', variant: 'default' },
        Cancelled: { label: 'ملغي', variant: 'destructive' },
        Completed: { label: 'مكتمل', variant: 'secondary' },
        Rescheduled: { label: 'مؤجل', variant: 'outline' },
      }

      const config = statusConfig[status] || { label: status, variant: 'outline' }

      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  }),

  // 5. عمود الإجراءات
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const booking = row.original
      return <BookingRowActions booking={booking} />
    },
  }),
] as ColumnDef<IBooking>[]
