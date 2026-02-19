'use client'

import { IPrescription, IVisit } from '@/types/visit'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { createPrescriptionAction } from '../../../../../../actions/prescription/create-prescription'
import { deletePrescriptionAction } from '../../../../../../actions/prescription/delete-prescription'
import {
  PrescriptionFormInput,
  prescriptionSchema,
} from '../../../../../../validation/prescription'

// مصفوفة إعدادات الحقول للسرعة والنظافة
const prescriptionFields: {
  name: keyof PrescriptionFormInput
  placeholder: string
  className?: string
}[] = [
  { name: 'medicationName', placeholder: 'اسم الدواء (مثال: كتافلام)', className: 'md:col-span-2' },
  { name: 'dosage', placeholder: 'الجرعة (قرص)' },
  { name: 'frequency', placeholder: 'التكرار (3 مرات)' },
  { name: 'duration', placeholder: 'المدة (أسبوع)' },
  { name: 'instructions', placeholder: 'تعليمات (اختياري)', className: 'md:col-span-4' },
]

interface PrescriptionTabProps {
  visit: IVisit
  tenantSlug: string
}

export function PrescriptionTab({ visit, tenantSlug }: PrescriptionTabProps) {
  const form = useForm<PrescriptionFormInput>({
    resolver: valibotResolver(prescriptionSchema),
    defaultValues: {
      medicationName: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    },
  })

  const onSubmit = async (data: PrescriptionFormInput) => {
    const res = await createPrescriptionAction(tenantSlug, visit.id, data)
    if (res.success) {
      toast.success('تم إضافة الدواء للروشتة')
      form.reset() // تصفير الفورمة فوراً لكتابة الدواء التالي
    } else {
      toast.error(res.message)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deletePrescriptionAction(tenantSlug, visit.id, id)
    if (res.success) toast.success('تم حذف الدواء')
    else toast.error(res.message)
  }

  return (
    <div className='space-y-6 mt-4'>
      {/* 1. فورمة الإضافة السريعة */}
      <div className='bg-card p-5 rounded-xl border shadow-sm'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 md:grid-cols-5 gap-4 items-end'
          >
            {prescriptionFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className={field.className}>
                    <FormControl>
                      <Input
                        placeholder={field.placeholder}
                        {...formField}
                        value={formField.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <>
                  <Plus className='w-4 h-4 ml-2' /> إضافة
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* 2. جدول عرض الروشتة */}
      <div className='bg-card rounded-xl border shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='text-right'>الدواء</TableHead>
              <TableHead className='text-right'>الجرعة</TableHead>
              <TableHead className='text-right'>التكرار</TableHead>
              <TableHead className='text-right'>المدة</TableHead>
              <TableHead className='text-right'>تعليمات</TableHead>
              <TableHead className='w-12.5'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visit.prescriptions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-10 text-muted-foreground'>
                  الروشتة فارغة، ابدأ بإضافة الأدوية أعلاه.
                </TableCell>
              </TableRow>
            ) : (
              visit.prescriptions.map((p: IPrescription) => (
                <TableRow key={p.id}>
                  <TableCell className='font-bold text-blue-700'>{p.medicationName}</TableCell>
                  <TableCell>{p.dosage}</TableCell>
                  <TableCell>{p.frequency}</TableCell>
                  <TableCell>{p.duration}</TableCell>
                  <TableCell className='max-w-50 truncate'>{p.instructions || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-500 hover:text-red-700 hover:bg-red-50'
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
