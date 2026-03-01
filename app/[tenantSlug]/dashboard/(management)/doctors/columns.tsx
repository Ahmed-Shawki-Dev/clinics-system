'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Clock, Phone, Stethoscope, User } from 'lucide-react'
import { DoctorActionsCell } from './doctor-actions-cell'
import { IDoctor } from '../../../../../types/doctor'
import { Badge } from '@/components/ui/badge' // تأكد إن المكون ده عندك أو استخدم div مكانه
import { cn } from '../../../../../lib/utils'

export const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: 'name',
    header: 'الطبيب',
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      // لو الدكتور موقوف، بنقلل الـ opacity عشان يبان للمستخدم إنه مش شغال
      const opacityClass = row.original.isEnabled ? 'opacity-100' : 'opacity-50'

      return (
        <div className={`flex items-center gap-3 ${opacityClass}`}>
          <div className='flex h-9 w-9 items-center justify-center rounded-full border bg-muted'>
            <User className='h-4 w-4' />
          </div>
          <div className='flex flex-col'>
            <span className='font-medium text-sm'>{name}</span>
            <span className='text-xs text-muted-foreground'>{row.original.username}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'specialty',
    header: 'التخصص',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <Stethoscope className='w-4 h-4 text-primary' />
        {row.getValue('specialty')}
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'الهاتف',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Phone className='w-4 h-4 text-primary' />
        {row.getValue('phone') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'avgVisitDurationMinutes',
    header: 'مدة الكشف',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 text-sm font-medium'>
        <Clock className='w-4 h-4 text-primary' />
        {row.getValue('avgVisitDurationMinutes')} دقيقة
      </div>
    ),
  },
  // الإضافة الجديدة: عمود الحالة
  {
    accessorKey: 'isEnabled',
    header: 'الحالة',
    cell: ({ row }) => {
      const isEnabled = row.original.isEnabled
      return (
        <Badge variant={isEnabled ? 'default' : 'destructive'} className={cn(isEnabled?'bg-green-400 text-white' : 'bg-destructive')}>{isEnabled ? 'نشط' : 'موقوف'}</Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'الإجراءات',
    cell: ({ row }) => <DoctorActionsCell doctor={row.original} />,
  },
]
