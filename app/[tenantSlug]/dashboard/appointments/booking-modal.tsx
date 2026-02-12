'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { AlertCircle, CalendarIcon, Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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

import { createBookingAction } from '@/actions/booking/create-booking'
import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { CreateBookingInput, createBookingSchema } from '@/validation/booking'

interface Props {
  patients: IPatient[]
  doctors: IDoctor[]
}

export function BookingModal({ patients = [], doctors = [] }: Props) {
  const [open, setOpen] = useState(false)
  const [patientPopoverOpen, setPatientPopoverOpen] = useState(false)
  const { tenantSlug } = useParams()

  const safeDoctors = doctors || []
  const safePatients = patients || []

  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)

  const form = useForm<CreateBookingInput>({
    resolver: valibotResolver(createBookingSchema),
    defaultValues: {
      patientId: '',
      doctorId: '',
      doctorServiceId: '',
      notes: '',
      bookingTime: '09:00',
      bookingDate: new Date(),
    },
  })

  const activeDoctor = safeDoctors.find((d) => d.id === selectedDoctorId)
  // تشييك: هل الدكتور المختار عنده خدمات؟
  const hasServices = activeDoctor && (activeDoctor.services?.length ?? 0) > 0

  const onSubmit = async (values: CreateBookingInput) => {
    // زيادة تأكيد برمجياً قبل الـ Action
    if (!hasServices) {
      toast.error('لا يمكن الحجز لدكتور ليس لديه خدمات معرفة')
      return
    }

    try {
      const result = await createBookingAction(values, tenantSlug as string)
      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        form.reset()
        setSelectedDoctorId(null)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      if (error instanceof Error) toast.error('حدث خطأ أثناء الاتصال بالسيرفر')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>حجز موعد جديد</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>حجز موعد جديد</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* 1. اختيار المريض */}
            <FormField
              control={form.control}
              name='patientId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>المريض</FormLabel>
                  <Popover open={patientPopoverOpen} onOpenChange={setPatientPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-full justify-between text-right font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? safePatients.find((p) => p.id === field.value)?.name
                            : 'ابحث عن مريض...'}
                          <ChevronsUpDown className='mr-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-100 p-0'>
                      <Command>
                        <CommandInput placeholder='بحث بالاسم ...' />
                        <CommandList>
                          <CommandEmpty>لا يوجد مريض بهذا الاسم.</CommandEmpty>
                          <CommandGroup>
                            {safePatients.map((patient) => (
                              <CommandItem
                                value={patient.name}
                                key={patient.id}
                                onSelect={() => {
                                  form.setValue('patientId', patient.id)
                                  setPatientPopoverOpen(false) // يقفل لما نختار
                                }}
                              >
                                <Check
                                  className={cn(
                                    'ml-2 h-4 w-4',
                                    patient.id === field.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                <div className='flex flex-col text-right'>
                                  <span>{patient.name}</span>
                                  <span className='text-xs text-muted-foreground font-mono'>
                                    {patient.phone}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. اختيار الطبيب */}
            <FormField
              control={form.control}
              name='doctorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الطبيب المعالج</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val)
                      setSelectedDoctorId(val)
                      form.setValue('doctorServiceId', '') // تصفير الخدمة
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='text-right'>
                        <SelectValue placeholder='اختر الطبيب' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {safeDoctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id} className='text-right'>
                          {doc.name} - {doc.specialty || 'تخصص عام'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. الخدمة - إجبارية وتظهر دايماً لو تم اختيار دكتور */}
            {selectedDoctorId && (
              <FormField
                control={form.control}
                name='doctorServiceId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخدمة المطلوبة</FormLabel>
                    {hasServices ? (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className='text-right'>
                            <SelectValue placeholder='اختر نوع الخدمة/الكشف' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeDoctor.services?.map((svc) => (
                            <SelectItem key={svc.id} value={svc.id!} className='text-right'>
                              {svc.serviceName} ({svc.price} ج.م)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className='flex items-center gap-2 p-3 text-xs bg-destructive/10 text-destructive rounded-md border border-destructive/20'>
                        <AlertCircle className='h-4 w-4' />
                        عذراً، هذا الطبيب ليس لديه خدمات متاحة حالياً. يرجى إضافة خدمات له أولاً.
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* 4. التاريخ والوقت */}
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='bookingDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>التاريخ</FormLabel>
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
                              <span>اختر يوم</span>
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
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          locale={ar}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bookingTime'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الساعة</FormLabel>
                    <FormControl>
                      <Input type='time' {...field} className='text-right font-mono' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 5. ملاحظات */}
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='أي تفاصيل إضافية عن الحالة...'
                      {...field}
                      className='text-right resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الزرار يتقفل لو مفيش خدمات للدكتور المختار */}
            <Button
              type='submit'
              className='w-full'
              disabled={form.formState.isSubmitting || (selectedDoctorId !== null && !hasServices)}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'تأكيد الحجز'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
