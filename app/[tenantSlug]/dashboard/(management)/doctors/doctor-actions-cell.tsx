'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Settings2 } from 'lucide-react'
import { useParams } from 'next/navigation' // <-- الإضافة هنا
import { useState } from 'react'
import { VisitFieldsConfigModal } from './visit-fields-modal'
import { IDoctor } from '../../../../../types/doctor'

export const DoctorActionsCell = ({ doctor }: { doctor: IDoctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // سحبنا الـ tenantSlug من الـ URL مباشرة
  const params = useParams<{ tenantSlug: string }>()
  const tenantSlug = params?.tenantSlug || ''

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <Settings2 className='w-4 h-4 ml-2' /> تخصيص العلامات الحيوية
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(doctor.id)}>
            نسخ المعرف (ID)
          </DropdownMenuItem>
          <DropdownMenuItem>تعديل البيانات</DropdownMenuItem>
          <DropdownMenuItem className='text-destructive'>إيقاف الحساب</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && (
        <VisitFieldsConfigModal
          tenantSlug={tenantSlug}
          doctorId={doctor.id}
          initialConfig={doctor.visitFieldConfig}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
