'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams } from 'next/navigation' // عشان نجيب الـ tenantSlug
import { useState } from 'react'
import { UpdateStaffDialog } from '../../app/[tenantSlug]/dashboard/staff/update-staff-dialog'
import { IStaff } from '../../types/staff'

export function StaffActionsCell({ staff }: { staff: IStaff }) {
  const [openUpdate, setOpenUpdate] = useState(false)
  const params = useParams()
  const tenantSlug = params.tenantSlug as string

  return (
    <>
      <UpdateStaffDialog
        staff={staff}
        tenantSlug={tenantSlug}
        open={openUpdate}
        onOpenChange={setOpenUpdate}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>

          {/* بنفتح المودال لما يدوس تعديل */}
          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            <Edit className='ml-2 h-4 w-4' /> تعديل
          </DropdownMenuItem>

          <DropdownMenuItem className='text-destructive focus:text-destructive'>
            <Trash className='ml-2 h-4 w-4' /> تعطيل الحساب
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
