'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { CalendarIcon, Loader2, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'
import { CreatePatientInput, CreatePatientSchema } from '../../../../../validation/patient'
import { createPatientAction } from '../../../../../actions/patient/createPatient'

// التعديل هنا: ضفنا الـ Props دي عشان نتحكم فيه من بره
interface AddPatientModalProps {
  tenantSlug: string
  initialPhone?: string
  trigger?: React.ReactNode
  onSuccess?: (patientId: string, patientName: string) => void
}

export function AddPatientModal({
  tenantSlug,
  initialPhone,
  trigger,
  onSuccess,
}: AddPatientModalProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreatePatientInput>({
    resolver: valibotResolver(CreatePatientSchema),
    defaultValues: {
      name: '',
      phone: initialPhone || '', // بياخد الرقم اللي الريسبشن كتبه وملقاهوش
      address: '',
      notes: '',
    },
  })

  // تحديث الـ phone لو الـ initialPhone اتغير من بره
  useEffect(() => {
    if (initialPhone) {
      form.setValue('phone', initialPhone)
    }
  }, [initialPhone, form])

  const onSubmit = async (values: CreatePatientInput) => {
    try {
      const result = await createPatientAction(values, tenantSlug)

      if (result.success && result.data) {
        toast.success(result.message)
        setOpen(false)
        form.reset()
        // 🔥 بنبلغ الـ PatientSearch إن المريض اتضاف عشان يختاره أوتوماتيك
        if (onSuccess) onSuccess(result.data.id, result.data.name)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'حدث خطأ غير متوقع')
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) form.reset()
      }}
    >
      <DialogTrigger asChild>
        {/* لو مفيش trigger مبعوت، هيعرض الزرار الافتراضي */}
        {trigger || (
          <Button>
            <UserPlus className='mr-2 h-4 w-4' />
            مريض جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <UserPlus className='h-5 w-5 text-primary' />
            إضافة ملف مريض جديد
          </DialogTitle>
          <DialogDescription>
            أدخل البيانات الأساسية للمريض لإنشاء ملف جديد في العيادة.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* ... (نفس الكود بتاعك للفورمة بدون أي تغيير) ... */}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المريض</FormLabel>
                    <FormControl>
                      <Input placeholder='الاسم ثلاثي' {...field} />
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
                      <Input placeholder='01xxxxxxxxx' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>النوع</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='اختر النوع' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Male'>ذكر</SelectItem>
                        <SelectItem value='Female'>أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='mb-2.5'>تاريخ الميلاد</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-right font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ar })
                            ) : (
                              <span>يوم / شهر / سنة</span>
                            )}
                            <CalendarIcon className='mr-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout='dropdown'
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                          locale={ar}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder='المنطقة، الشارع، رقم العمارة' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات طبية (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='أي ملاحظات مبدئية عن حالة المريض...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='gap-2 sm:gap-0 mt-6'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                إلغاء
              </Button>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                حفظ البيانات
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
