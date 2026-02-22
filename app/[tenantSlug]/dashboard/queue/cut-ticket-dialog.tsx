'use client'

import { createTicket, markTicketUrgent } from '@/actions/queue/tickets'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Input } from '@/components/ui/input' // ضفنا الـ Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { IQueueBoardSession } from '@/types/queue'
import { CutTicketSchema, type CutTicketInput } from '@/validation/queue'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Banknote, CreditCard, Loader2, Ticket } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PatientSearch } from './patient-search'

interface CutTicketDialogProps {
  tenantSlug: string
  patients: IPatient[]
  activeSessions: IQueueBoardSession[]
  doctors: IDoctor[]
}

export function CutTicketDialog({
  tenantSlug,
  patients,
  activeSessions,
  doctors,
}: CutTicketDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [, setIsAddPatientOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<CutTicketInput>({
    resolver: valibotResolver(CutTicketSchema),
    defaultValues: {
      isUrgent: false,
      notes: '',
      paymentMethod: 'Cash', // قيمة افتراضية عشان ميضربش إيرور
    },
  })

  // بنراقب العيادة والخدمة عشان نظهر ونخفي حقول الدفع
  const selectedSessionId = form.watch('sessionId')
  const selectedServiceId = form.watch('doctorServiceId')

  const selectedDoctor = React.useMemo(() => {
    const session = activeSessions.find((s) => s.sessionId === selectedSessionId)
    if (!session) return null
    return doctors.find((d) => d.id === session.doctorId)
  }, [selectedSessionId, activeSessions, doctors])

  // الدالة دي بتسحب سعر الخدمة تلقائي وتحطه في حقل المبلغ
  const handleServiceChange = (serviceId: string) => {
    form.setValue('doctorServiceId', serviceId)
    const service = selectedDoctor?.services?.find((s) => s.id === serviceId)
    if (service && service.price) {
      form.setValue('paymentAmount', Number(service.price))
    } else {
      form.setValue('paymentAmount', 0)
    }
  }

  async function onSubmit(values: CutTicketInput) {
    setIsSubmitting(true)
    try {
      const res = await createTicket(tenantSlug, values)

      if (!res.success) {
        throw new Error(res.message || 'فشل إصدار التذكرة')
      }

      if (values.isUrgent && res.data?.id) {
        await markTicketUrgent(tenantSlug, res.data.id)
      }

      toast.success('تم الحجز وإصدار التذكرة بنجاح')
      setOpen(false)
      form.reset()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) form.reset() // ننضف الفورمة لما تتقفل
      }}
    >
      <DialogTrigger asChild>
        <Button className='gap-2 shadow-md'>
          <Ticket className='h-5 w-5' />
          قطع تذكرة
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold flex items-center gap-2'>
            <Ticket className='h-6 w-6 text-primary' />
            حجز موعد جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {/* اختيار العيادة */}
            <FormField
              control={form.control}
              name='sessionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العيادة المفتوحة</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val)
                      const docId = activeSessions.find((s) => s.sessionId === val)?.doctorId
                      if (docId) form.setValue('doctorId', docId)

                      // تصفير الخدمة والمبلغ لو غير العيادة عشان منبعتش داتا غلط
                      form.setValue('doctorServiceId', undefined)
                      form.setValue('paymentAmount', undefined)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='h-11 bg-muted/20'>
                        <SelectValue placeholder='اختر العيادة...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeSessions.map((session) => (
                        <SelectItem key={session.sessionId} value={session.sessionId}>
                          عيادة د. {session.doctorName}
                          <span className='text-muted-foreground mr-2 text-xs'>
                            ({session.waitingCount} انتظار)
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* المريض */}
            <FormField
              control={form.control}
              name='patientId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>المريض</FormLabel>
                  <FormControl>
                    <PatientSearch
                      patients={patients}
                      selectedPatientId={field.value}
                      onSelect={field.onChange}
                      onAddNew={() => setIsAddPatientOpen(true)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              {/* الخدمة */}
              <FormField
                control={form.control}
                name='doctorServiceId'
                render={({ field }) => (
                  <FormItem className='md:col-span-1'>
                    <FormLabel>الخدمة المطلوبة (اختياري)</FormLabel>
                    <Select onValueChange={handleServiceChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='h-11' disabled={!selectedDoctor}>
                          <SelectValue placeholder='بدون خدمة' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedDoctor?.services
                          ?.filter((s) => s.isActive)
                          .map((service) => (
                            <SelectItem key={service.id} value={service.id!}>
                              {service.serviceName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* الطوارئ */}
              <FormField
                control={form.control}
                name='isUrgent'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-destructive/5 border-destructive/10 md:col-span-1 h-11 mt-8'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-destructive font-bold cursor-pointer ml-2'>
                        حالة طارئة
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='data-[state=checked]:bg-destructive data-[state=checked]:border-destructive'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* قسم الدفع: بيظهر فقط لو تم اختيار خدمة */}
            {selectedServiceId && (
              <div className='grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl border border-muted'>
                <FormField
                  control={form.control}
                  name='paymentAmount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المبلغ المدفوع (جنيه)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          className='h-11 font-bold'
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='paymentMethod'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>طريقة الدفع</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-11'>
                            <SelectValue placeholder='اختر...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Cash'>
                            <span className='flex items-center gap-2'>
                              <Banknote className='w-4 h-4' /> كاش
                            </span>
                          </SelectItem>
                          <SelectItem value='Card'>
                            <span className='flex items-center gap-2'>
                              <CreditCard className='w-4 h-4' /> فيزا / بطاقة
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* الملاحظات */}
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات الاستقبال</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='أي تفاصيل إضافية...'
                      className='resize-none h-20'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full h-12 text-lg font-bold' disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className='animate-spin' /> : 'إصدار التذكرة'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
