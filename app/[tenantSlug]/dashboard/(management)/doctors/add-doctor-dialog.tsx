'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { AlertCircle, Clock, Loader2, Plus } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { createDoctorAction } from '@/actions/doctor/create-doctor'
import { CreateDoctorInput, CreateDoctorSchema } from '@/validation/doctor'
import { MEDICAL_SPECIALTIES } from '../../../../../constants/specialties'

export function AddDoctorDialog({ tenantSlug }: { tenantSlug: string }) {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateDoctorInput>({
    resolver: valibotResolver(CreateDoctorSchema),
    defaultValues: {
      name: '', 
      username: '',
      password: '',
      phone: '',
      specialty: '',
      urgentCaseMode: 0,
      avgVisitDurationMinutes: 15,
    },
  })

  const onSubmit = async (values: CreateDoctorInput) => {
    const res = await createDoctorAction(values, tenantSlug)
    if (res.success) {
      toast.success(res.message)
      setOpen(false)
      form.reset()
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='ml-2 h-4 w-4' />
          طبيب جديد
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>بيانات الطبيب الجديد</DialogTitle>
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
                      <Input placeholder='د. محمد أحمد' {...field} />
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder='dr_mohamed' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      {' '}
                      {/* max-h عشان السكرول */}
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

            <div className='grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border'>
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
                        value={(field.value as number | string) ?? ''}
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
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
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
              {form.formState.isSubmitting ? <Loader2 className='animate-spin' /> : 'حفظ البيانات'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
