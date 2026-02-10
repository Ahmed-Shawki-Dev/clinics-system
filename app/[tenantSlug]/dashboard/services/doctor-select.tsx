'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IDoctor } from '@/types/doctor'

interface Props {
  doctors: IDoctor[]
  selectedId: string
  onSelect: (id: string) => void
}

export function DoctorSelect({ doctors, selectedId, onSelect }: Props) {
  return (
    <div className='flex items-center gap-4 bg-muted/30 p-4 rounded-lg border'>
      <Label>اختر الطبيب لتعديل خدماته:</Label>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className='w-75 bg-background'>
          <SelectValue placeholder='اختر طبيب...' />
        </SelectTrigger>
        <SelectContent>
          {doctors.map((doc) => (
            <SelectItem key={doc.id} value={doc.id}>
              {doc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
