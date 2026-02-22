'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Clock, Phone, Stethoscope, User } from 'lucide-react'
import { IDoctor } from '../../../../types/doctor'
import { DoctorActionsCell } from './doctor-actions-cell'


export const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: 'name',
    header: 'الطبيب',
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return (
        <div className='flex items-center gap-3'>
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
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'phone',
    header: 'الهاتف',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 '>
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
  {
    id: 'actions',
    header: 'الإجراءات',
    // مبقناش محتاجين نمرر الـ tenantSlug هنا
    cell: ({ row }) => <DoctorActionsCell doctor={row.original} />,
  },
]
