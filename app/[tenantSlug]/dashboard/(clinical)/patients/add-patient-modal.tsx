'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { CalendarIcon, CheckCircle2, Loader2, MessageCircle, UserPlus } from 'lucide-react'
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
import { createPatientAction } from '../../../../../actions/patient/createPatient'
import { CreatePatientInput, CreatePatientSchema } from '../../../../../validation/patient'

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
  const [credentials, setCredentials] = useState<{
    username: string
    password: string
    name: string
    phone: string
  } | null>(null)

  const form = useForm<CreatePatientInput>({
    resolver: valibotResolver(CreatePatientSchema),
    defaultValues: {
      name: '',
      phone: initialPhone || '',
      address: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (initialPhone) {
      form.setValue('phone', initialPhone)
    }
  }, [initialPhone, form])

  const onSubmit = async (values: CreatePatientInput) => {
    try {
      const result = await createPatientAction(values, tenantSlug)

      if (result.success && result.data) {
        toast.success('تمت إضافة المريض بنجاح')

        setCredentials({
          username: result.data.username || '',
          password: result.data.password || result.data.initialPassword || '',
          name: values.name,
          phone: values.phone,
        })

        if (onSuccess && result.data.patient) {
          onSuccess(result.data.patient.id, result.data.patient.name)
        }
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'حدث خطأ غير متوقع')
      }
    }
  }

  // 🔥 دالة إرسال الواتساب مع إضافة رابط العيادة
  const handleSendWhatsApp = () => {
    if (!credentials) return

    // تظبيط رقم التليفون
    let phone = credentials.phone
    if (phone.startsWith('0')) {
      phone = '20' + phone.substring(1)
    } else {
      phone = phone.replace(/\+/g, '')
    }

    // 👈 توليد رابط العيادة لصفحة دخول المرضى
    const clinicLink = `${window.location.origin}/${tenantSlug}/patient/login`

    const message = `أهلاً بك أ. ${credentials.name} في العيادة \n\nبيانات الدخول الخاصة بك لتطبيق المرضى هي:\nاسم المستخدم: *${credentials.username}*\nكلمة المرور: *${credentials.password}*\n\nيمكنك الدخول لمتابعة حسابك المباشر عبر الرابط التالي:\n${clinicLink}\n\nنتمنى لك دوام الصحة والعافية.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      form.reset()
      setCredentials(null)
    }, 200)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose()
        else setOpen(true)
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <UserPlus className='mr-2 h-4 w-4' />
            مريض جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        {credentials ? (
          <div className='flex flex-col items-center justify-center py-6 space-y-6'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100'>
              <CheckCircle2 className='h-10 w-10 text-emerald-600' />
            </div>
            <div className='text-center space-y-1'>
              <DialogTitle className='text-xl'>تم تسجيل المريض بنجاح</DialogTitle>
              <DialogDescription>برجاء إرسال بيانات الدخول التالية للمريض</DialogDescription>
            </div>

            <div className='w-full bg-muted/50 p-4 rounded-lg space-y-3 border'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>اسم المستخدم:</span>
                <span className='font-mono font-bold select-all'>{credentials.username}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>كلمة المرور:</span>
                <span className='font-mono font-bold select-all'>{credentials.password}</span>
              </div>
            </div>

            <div className='flex w-full gap-3 pt-4'>
              <Button onClick={handleClose} variant='outline' className='flex-1 font-bold'>
                إغلاق
              </Button>
              <Button
                onClick={handleSendWhatsApp}
                className='flex-1 bg-green-600 hover:bg-green-700 text-white font-bold shadow-md'
              >
                <MessageCircle className='mr-2 h-4 w-4' />
                إرسال عبر واتساب
              </Button>
            </div>
          </div>
        ) : (
          <>
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
                              disabled={(date) =>
                                date > new Date() || date < new Date('1900-01-01')
                              }
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
                    {form.formState.isSubmitting && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    حفظ البيانات
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
