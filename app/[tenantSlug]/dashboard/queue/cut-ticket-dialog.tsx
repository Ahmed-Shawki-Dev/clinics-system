'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { Loader2, Ticket } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { createTicket, markTicketUrgent } from '@/actions/queue/tickets'
import { IDoctor } from '@/types/doctor'
import { IPatient } from '@/types/patient'
import { IQueueBoardSession } from '@/types/queue'
import { CutTicketSchema, type CutTicketInput } from '@/validation/queue'
import { PatientSearch } from './patient-search'

interface CutTicketDialogProps {
  tenantSlug: string
  patients: IPatient[]
  activeSessions: IQueueBoardSession[] // الجلسات المفتوحة حالياً
  doctors: IDoctor[] // بنحتاجهم عشان نجيب الخدمات بتاعتهم
}

export function CutTicketDialog({
  tenantSlug,
  patients,
  activeSessions,
  doctors,
}: CutTicketDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<CutTicketInput>({
    resolver: valibotResolver(CutTicketSchema),
    defaultValues: {
      isUrgent: false,
      notes: '',
    },
  })

  // مراقبة اختيار الجلسة عشان نحدد الدكتور والخدمات بتاعته
  const selectedSessionId = form.watch('sessionId')

  const selectedDoctor = React.useMemo(() => {
    const session = activeSessions.find((s) => s.sessionId === selectedSessionId)
    if (!session) return null
    return doctors.find((d) => d.id === session.doctorId)
  }, [selectedSessionId, activeSessions, doctors])

  async function onSubmit(values: CutTicketInput) {
    setIsSubmitting(true)
    try {
      // الخطوة 1: إنشاء التذكرة
      const res = await createTicket(tenantSlug, values)

      if (!res.success) {
        throw new Error(res.message || 'فشل إصدار التذكرة')
      }

      // الخطوة 2: لو طارئة، نادي الـ Urgent API فوراً
      if (values.isUrgent && res.data?.id) {
        const urgentRes = await markTicketUrgent(tenantSlug, res.data.id)
        if (!urgentRes.success) {
          toast.error('تم إنشاء التذكرة ولكن فشل رفعها كحالة طارئة')
        }
      }

      toast.success('تم إصدار التذكرة بنجاح')
      setOpen(false)
      form.reset()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message || 'حدث خطأ غير متوقع')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2 h-11 px-6'>
          <Ticket className='h-5 w-5' />
          قطع تذكرة جديدة
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>إصدار تذكرة مريض</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {/* 1. اختيار العيادة/الدكتور */}
            <FormField
              control={form.control}
              name='sessionId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العيادة المفتوحة</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val)
                      // أوتوماتيك حط الـ doctorId في الفورم بناءً على الجلسة
                      const docId = activeSessions.find((s) => s.sessionId === val)?.doctorId
                      if (docId) form.setValue('doctorId', docId)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='h-11'>
                        <SelectValue placeholder='اختر العيادة...' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeSessions.map((session) => (
                        <SelectItem key={session.sessionId} value={session.sessionId}>
                          عيادة د. {session.doctorName} ({session.waitingCount} في الانتظار)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. البحث عن المريض (المكون اللي عملناه) */}
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. اختيار الخدمة (فلترة ذكية بناءً على الدكتور) */}
            <FormField
              control={form.control}
              name='doctorServiceId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع الخدمة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='h-11' disabled={!selectedDoctor}>
                        <SelectValue
                          placeholder={selectedDoctor ? 'اختر الخدمة...' : 'اختر العيادة أولاً'}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedDoctor?.services
                        .filter((s) => s.isActive)
                        .map((service) => (
                          <SelectItem key={service.id} value={service.id!}>
                            {service.serviceName} - {service.price} ج.م
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. خيار الاستعجال (الطوارئ) */}
            <FormField
              control={form.control}
              name='isUrgent'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-destructive/5 border-destructive/20'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-destructive font-bold cursor-pointer'>
                      حالة طارئة (Urgent Case)
                    </FormLabel>
                    <p className='text-xs text-muted-foreground'>
                      سيتم وضع المريض في قمة الطابور فوراً.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات إضافية</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='شكوى المريض أو ملاحظات للريسبشن...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full h-12 text-lg' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='ml-2 h-5 w-5 animate-spin' />
                  جاري إصدار التذكرة...
                </>
              ) : (
                'تأكيد وقطع التذكرة'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
