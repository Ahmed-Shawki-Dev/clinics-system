'use client'

import { IPrescription, IVisit } from '@/types/visit'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Calendar, Loader2, Pill, Plus, Trash2 } from 'lucide-react'
import { createPrescriptionAction } from '../../../../../../actions/prescription/create-prescription'
import { deletePrescriptionAction } from '../../../../../../actions/prescription/delete-prescription'
import {
  PrescriptionFormInput,
  prescriptionSchema,
} from '../../../../../../validation/prescription'

const prescriptionFields: {
  name: keyof PrescriptionFormInput
  placeholder: string
  icon?: React.ReactNode
  className?: string
}[] = [
  {
    name: 'medicationName',
    placeholder: 'اسم الدواء (مثال: كتافلام)',
    icon: <Pill className='w-4 h-4 text-muted-foreground' />,
    className: 'md:col-span-2',
  },
  {
    name: 'dosage',
    placeholder: 'الجرعة (قرص)',
  },
  {
    name: 'frequency',
    placeholder: 'التكرار (3 مرات)',
  },
  {
    name: 'duration',
    placeholder: 'المدة (أسبوع)',
    icon: <Calendar className='w-4 h-4 text-muted-foreground' />,
  },
  {
    name: 'instructions',
    placeholder: 'تعليمات إضافية (اختياري)',
    className: 'md:col-span-4',
  },
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
      toast.success('تم إضافة الدواء للروشتة', {
        description: `${data.medicationName} - ${data.dosage}`,
      })
      form.reset()
    } else {
      toast.error('حدث خطأ', { description: res.message })
    }
  }

  const handleDelete = async (id: string, medicationName: string) => {
    if (confirm(`هل أنت متأكد من حذف ${medicationName}؟`)) {
      const res = await deletePrescriptionAction(tenantSlug, visit.id, id)
      if (res.success) {
        toast.success('تم حذف الدواء', { description: medicationName })
      } else {
        toast.error(res.message)
      }
    }
  }

  return (
    <div className='relative w-full mt-4 print:hidden space-y-6'>
      {/* بطاقة إضافة دواء */}
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Plus className='w-5 h-5 text-primary' />
            إضافة دواء للروشتة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                {prescriptionFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <FormItem className={field.className}>
                        <FormControl>
                          <div className='relative'>
                            {field.icon && (
                              <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                                {field.icon}
                              </div>
                            )}
                            <Input
                              placeholder={field.placeholder}
                              {...formField}
                              value={(formField.value as string) ?? ''}
                              className={`${field.icon ? 'pr-10' : ''}`}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className='flex justify-end pt-2'>
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className='w-4 h-4 ml-2 animate-spin' />
                  ) : (
                    <Plus className='w-4 h-4 ml-2' />
                  )}
                  حفظ الدواء
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* جدول الأدوية */}
      <Table>
        <TableHeader className='bg-muted/50'>
          <TableRow>
            <TableHead className='text-right w-12'>#</TableHead>
            <TableHead className='text-right'>الدواء</TableHead>
            <TableHead className='text-right'>الجرعة</TableHead>
            <TableHead className='text-right'>التكرار</TableHead>
            <TableHead className='text-right'>المدة</TableHead>
            <TableHead className='text-right'>ملاحظات</TableHead>
            <TableHead className='w-16'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!visit.prescriptions?.length ? (
            <TableRow>
              <TableCell colSpan={7} className='text-center py-12 text-muted-foreground'>
                الروشتة فارغة حالياً.
              </TableCell>
            </TableRow>
          ) : (
            visit.prescriptions.map((p: IPrescription, index: number) => (
              <TableRow key={p.id}>
                <TableCell className='text-muted-foreground'>{index + 1}</TableCell>
                <TableCell className='font-bold text-foreground'>{p.medicationName}</TableCell>
                <TableCell>{p.dosage}</TableCell>
                <TableCell>{p.frequency}</TableCell>
                <TableCell>{p.duration}</TableCell>
                <TableCell className='text-muted-foreground max-w-50 truncate'>
                  {p.instructions || '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-destructive hover:text-destructive hover:bg-destructive/10'
                    onClick={() => handleDelete(p.id, p.medicationName)}
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
  )
}
