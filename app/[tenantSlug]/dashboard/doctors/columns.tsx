'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { ColumnDef } from '@tanstack/react-table'
import { Clock, MoreHorizontal, Phone, Stethoscope } from 'lucide-react'
import { IDoctor } from '../../../../types/doctor'

export const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: 'name',
    header: 'الطبيب',
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${name}&background=random`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
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
      <Badge variant='secondary' className='gap-1'>
        <Stethoscope className='w-3 h-3' />
        {row.getValue('specialty')}
      </Badge>
    ),
    // ده مهم عشان الفلتر يشتغل صح
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'phone',
    header: 'الهاتف',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Phone className='w-3 h-3' />
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
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(doctor.id)}>
              نسخ المعرف (ID)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>إيقاف الحساب</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
