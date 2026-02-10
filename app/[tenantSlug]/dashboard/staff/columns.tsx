'use client'

import { Badge } from '@/components/ui/badge'
import { IStaff } from '@/types/staff'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Phone } from 'lucide-react'
import { StaffActionsCell } from '../../../../actions/staff/staff-actions-cell'

// 1. Helper Type-Safe
const columnHelper = createColumnHelper<IStaff>()

export const columns = [
  // الاسم
  columnHelper.accessor('name', {
    header: 'الموظف',
    cell: (info) => <span className='font-medium text-foreground'>{info.getValue()}</span>,
  }),

  // الهاتف
  columnHelper.accessor('phone', {
    header: 'الهاتف',
    cell: (info) => (
      <div className='flex items-center gap-2'>
        <Phone className='h-3 w-3 text-muted-foreground' />
        <span dir='ltr' className='font-mono text-sm'>
          {info.getValue()}
        </span>
      </div>
    ),
  }),

  // الوظيفة
  columnHelper.accessor('role', {
    header: 'الوظيفة',
    cell: (info) => {
      const role = info.getValue()
      const variant = role === 'ClinicManager' ? 'default' : 'secondary'
      return (
        <Badge variant={variant} className='rounded-sm'>
          {role}
        </Badge>
      )
    },
  }),

  // الحالة
  columnHelper.accessor('isEnabled', {
    header: 'الحالة',
    cell: (info) => (
      <div className='flex items-center gap-2'>
        <span
          className={`h-2 w-2 rounded-full ${info.getValue() ? 'bg-emerald-500' : 'bg-destructive'}`}
        />
        <span className='text-sm text-muted-foreground'>{info.getValue() ? 'نشط' : 'معطل'}</span>
      </div>
    ),
  }),

  // تاريخ الإضافة
  columnHelper.accessor('createdAt', {
    header: 'تاريخ الإضافة',
    cell: (info) => (
      <span className='text-muted-foreground text-xs'>
        {new Date(info.getValue()).toLocaleDateString('ar-EG')}
      </span>
    ),
  }),

  // الإجراءات
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <StaffActionsCell staff={row.original} />,
  }),
] as ColumnDef<IStaff>[]
