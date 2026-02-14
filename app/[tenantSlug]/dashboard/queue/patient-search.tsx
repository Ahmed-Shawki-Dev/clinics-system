'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IPatient } from '@/types/patient' //
import { Check, ChevronsUpDown, UserPlus } from 'lucide-react'
import * as React from 'react'

interface PatientSearchProps {
  patients: IPatient[]
  onSelect: (patientId: string) => void
  selectedPatientId?: string
  onAddNew?: () => void
}

export function PatientSearch({
  patients,
  onSelect,
  selectedPatientId,
  onAddNew,
}: PatientSearchProps) {
  const [open, setOpen] = React.useState(false)

  // استخدام useMemo لضمان الأداء وتجنب إعادة الحساب مع كل ريندر
  const selectedPatient = React.useMemo(
    () => patients.find((p) => p.id === selectedPatientId),
    [patients, selectedPatientId],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between h-11 text-right font-normal'
        >
          {selectedPatient ? (
            <span className='flex items-center gap-2'>
              <span className='font-bold'>{selectedPatient.name}</span>
              <span className='text-xs text-muted-foreground'>({selectedPatient.phone})</span>
            </span>
          ) : (
            'ابحث عن مريض بالاسم أو رقم الهاتف...'
          )}
          <ChevronsUpDown className='mr-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-(--radix-popover-trigger-width) p-0' align='start'>
        <Command>
          <CommandInput placeholder='اكتب اسم المريض أو رقم الموبايل...' className='h-11' />
          <CommandList>
            <CommandEmpty>
              <div className='py-4 text-center'>
                <p className='text-sm text-muted-foreground mb-3'>لم يتم العثور على المريض</p>
                {onAddNew && (
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => {
                      onAddNew()
                      setOpen(false)
                    }}
                  >
                    <UserPlus className='ml-2 h-4 w-4' />
                    إضافة مريض جديد
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup>
              {patients.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={`${patient.name} ${patient.phone}`} // الفلترة بتتم هنا
                  onSelect={() => {
                    onSelect(patient.id)
                    setOpen(false)
                  }}
                  className='flex items-center justify-between cursor-pointer'
                >
                  <div className='flex flex-col'>
                    <span className='font-medium text-right'>{patient.name}</span>
                    <span className='text-xs text-muted-foreground text-right'>
                      {patient.phone}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      'h-4 w-4',
                      selectedPatientId === patient.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
