'use client'

import { DoctorVisitFieldConfig, IVisit } from '@/types/visit'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { updateVisit } from '../../../../../../actions/visit/update-visit'
import { notesFields, vitalsFields } from '../../../../../../constants/vitals-fields'
import { ClinicalFormInput, clinicalSchema } from '../../../../../../validation/visit'

interface ClinicalTabProps {
  tenantSlug: string
  visit: IVisit
  doctorConfig?: DoctorVisitFieldConfig
}

export function ClinicalTab({ tenantSlug, visit, doctorConfig }: ClinicalTabProps) {
  const form = useForm<ClinicalFormInput>({
    resolver: valibotResolver(clinicalSchema),
    defaultValues: {
      complaint: visit.complaint ?? null,
      diagnosis: visit.diagnosis ?? null,
      notes: visit.notes ?? null,
      bloodPressureSystolic: visit.bloodPressureSystolic ?? null,
      bloodPressureDiastolic: visit.bloodPressureDiastolic ?? null,
      heartRate: visit.heartRate ?? null,
      temperature: visit.temperature ?? null,
      weight: visit.weight ?? null,
      height: visit.height ?? null,
      bmi: visit.bmi ?? null,
      bloodSugar: visit.bloodSugar ?? null,
      oxygenSaturation: visit.oxygenSaturation ?? null,
      respiratoryRate: visit.respiratoryRate ?? null,
    },
  })

  const onSubmit = async (data: ClinicalFormInput) => {
    try {
      const response = await updateVisit(tenantSlug, visit.id, data)

      if (response.success) {
        toast.success('تم حفظ البيانات السريرية بنجاح')
      } else {
        toast.error(response.message || 'فشل في حفظ البيانات')
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى')
      console.error('Submit Error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        {/* قسم العلامات الحيوية */}
        <div className='bg-card p-6 rounded-xl border shadow-sm'>
          <h3 className='text-lg font-bold mb-4 border-b pb-2'>العلامات الحيوية</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {vitalsFields
              .filter(
                (fieldConfig) =>
                  // لو مفيش config (لسه مجبناهوش) اعرض كله، لو فيه، اعرض اللي بـ true بس
                  !doctorConfig || doctorConfig[fieldConfig.configKey],
              )
              .map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name}
                  control={form.control}
                  name={fieldConfig.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldConfig.label}</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder={fieldConfig.placeholder}
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value
                            field.onChange(val === '' ? null : Number(val))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>
        </div>

        {/* قسم التشخيص والشكوى */}
        <div className='bg-card p-6 rounded-xl border shadow-sm'>
          <h3 className='text-lg font-bold mb-4 border-b pb-2'>التشخيص والملاحظات</h3>
          <div className='space-y-4'>
            {notesFields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={fieldConfig.placeholder}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            type='submit'
            size='lg'
            className='bg-emerald-600 hover:bg-emerald-700'
            disabled={form.formState.isSubmitting} 
          >
            {form.formState.isSubmitting ? 'جاري الحفظ...' : 'حفظ البيانات السريرية'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
