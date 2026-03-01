'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { AlertCircle, Clock, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { updateDoctorAction } from '@/actions/doctor/update-doctor'
import { UpdateDoctorInput, UpdateDoctorSchema } from '@/validation/doctor'
import { MEDICAL_SPECIALTIES } from '@/constants/specialties'
import { IDoctor } from '@/types/doctor'

interface EditDoctorDialogProps {
  doctor: IDoctor
  tenantSlug: string
  isOpen: boolean
  onClose: () => void
}

export function EditDoctorDialog({ doctor, tenantSlug, isOpen, onClose }: EditDoctorDialogProps) {
  // بنعبي الفورمة بالداتا القديمة اللي جاية من الجدول
  const form = useForm<UpdateDoctorInput>({
    resolver: valibotResolver(UpdateDoctorSchema),
    defaultValues: {
      name: doctor.name,
      phone: doctor.phone || '',
      specialty: doctor.specialty,
      bio: doctor.bio || '',
      urgentCaseMode: doctor.urgentCaseMode, // راجع التايب لو ده رقم أو سترينج عندك
      avgVisitDurationMinutes: doctor.avgVisitDurationMinutes,
      // الـ photoUrl لو مش بتعدلها دلوقتي سيبها
    },
  })

  const onSubmit = async (values: UpdateDoctorInput) => {
    const res = await updateDoctorAction(doctor.id, tenantSlug, values)
    if (res.success) {
      toast.success('تم تحديث بيانات الطبيب بنجاح')
      onClose()
    } else {
      toast.error(res.message || 'حدث خطأ أثناء التحديث')
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل بيانات الطبيب</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-2'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم ثلاثي</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
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
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* شيلنا الـ Username والـ Password من هنا خالص */}

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='specialty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التخصص</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='اختر التخصص الطبي' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='max-h-50'>
                        {MEDICAL_SPECIALTIES.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>النبذة التعريفية (Bio)</FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border'>
              <FormField
                control={form.control}
                name='avgVisitDurationMinutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' /> مدة الكشف (دقيقة)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        value={(field.value as number) ?? ''}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='urgentCaseMode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <AlertCircle className='w-4 h-4' /> نظام الطوارئ
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='اختر النظام' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='0'>بعد الحالة الحالية (Next)</SelectItem>
                        <SelectItem value='1'>في السلة (Bucket)</SelectItem>
                        <SelectItem value='2'>أول الطابور (Front)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : (
                'تحديث البيانات'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
