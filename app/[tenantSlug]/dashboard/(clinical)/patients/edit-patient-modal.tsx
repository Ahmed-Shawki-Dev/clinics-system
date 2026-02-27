'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreatePatientInput, CreatePatientSchema } from '../../../../../validation/patient'
import { updatePatientAction } from '../../../../../actions/patient/update-patient'
import { IPatient } from '../../../../../types/patient'



export function EditPatientModal({ patient }: { patient: IPatient }) {
  const [open, setOpen] = useState(false)
  const { tenantSlug } = useParams()

  const form = useForm<CreatePatientInput>({
    resolver: valibotResolver(CreatePatientSchema),
    defaultValues: {
      name: patient.name,
      phone: patient.phone,
      gender: patient.gender ,
      dateOfBirth: new Date(patient.dateOfBirth),
      address: patient.address || '',
      notes: patient.notes || '',
    },
  })

  const onSubmit = async (values: CreatePatientInput) => {
    const result = await updatePatientAction(patient.id, values, tenantSlug as string)
    if (result.success) {
      toast.success(result.message)
      setOpen(false)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* بنستخدمه كـ Div عشان يشتغل جوه الـ DropdownMenu من غير مشاكل */}
        <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
          تعديل البيانات
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>تعديل ملف: {patient.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المريض</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              حفظ التعديلات
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
