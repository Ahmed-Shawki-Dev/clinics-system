'use client'

import { updateClinicSettings } from '@/actions/settings/update-settings'
import { DAYS_AR } from '@/types/public'
import { IClinicSettings } from '@/types/settings'
import { UpdateSettingsInput, UpdateSettingsSchema } from '@/validation/settings'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SettingsFormProps {
  initialData: IClinicSettings
  tenantSlug: string
}

export function SettingsForm({ initialData, tenantSlug }: SettingsFormProps) {
  const form = useForm<UpdateSettingsInput>({
    resolver: valibotResolver(UpdateSettingsSchema),
    defaultValues: {
      clinicName: initialData.clinicName || 'عيادة جديدة',
      phone: initialData.phone || '',
      whatsAppSenderNumber: initialData.whatsAppSenderNumber || '',
      supportWhatsAppNumber: initialData.supportWhatsAppNumber || '',
      supportPhoneNumber: initialData.supportPhoneNumber || '',
      address: initialData.address || '',
      city: initialData.city || '',
      logoUrl: initialData.logoUrl || '',
      bookingEnabled: initialData.bookingEnabled,
      cancellationWindowHours: initialData.cancellationWindowHours,
      workingHours: initialData.workingHours.map((wh) => ({
        dayOfWeek: wh.dayOfWeek as UpdateSettingsInput['workingHours'][0]['dayOfWeek'],
        // برمجة دفاعية: لو الباك إند بعت null مش هيضرب
        startTime: wh.startTime?.split('.')[0] || '00:00:00', 
        endTime: wh.endTime?.split('.')[0] || '00:00:00',
        isActive: wh.isActive,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'workingHours',
  })

  const onSubmit = async (data: UpdateSettingsInput) => {
    try {
      const response = await updateClinicSettings(tenantSlug, data)
      if (response.success) {
        toast.success('تم حفظ الإعدادات بنجاح')
      } else {
        toast.error(response.message || 'حدث خطأ أثناء الحفظ')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Tabs defaultValue='general' className='w-full'>
          <TabsList className='flex w-full overflow-x-auto justify-start mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <TabsTrigger value='general' className='min-w-fit whitespace-nowrap'>
              البيانات الأساسية
            </TabsTrigger>
            <TabsTrigger value='contact' className='min-w-fit whitespace-nowrap'>
              أرقام التواصل
            </TabsTrigger>
            <TabsTrigger value='booking' className='min-w-fit whitespace-nowrap'>
              إعدادات الحجز
            </TabsTrigger>
            <TabsTrigger value='workingHours' className='min-w-fit whitespace-nowrap'>
              أوقات العمل
            </TabsTrigger>
          </TabsList>

          <TabsContent value='general'>
            <Card>
              <CardHeader>
                <CardTitle>البيانات الأساسية للعيادة</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='clinicName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم العيادة</FormLabel>
                      <FormControl>
                        <Input placeholder='أدخل اسم العيادة' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* تم التعديل للموبايل: grid-cols-1 md:grid-cols-2 */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder='مثال: القاهرة' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان التفصيلي</FormLabel>
                        <FormControl>
                          <Input placeholder='أدخل العنوان بالتفصيل' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contact'>
            <Card>
              <CardHeader>
                <CardTitle>أرقام التواصل والدعم</CardTitle>
              </CardHeader>
              {/* تم التعديل للموبايل: grid-cols-1 md:grid-cols-2 */}
              <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم هاتف العيادة</FormLabel>
                      <FormControl>
                        <Input placeholder='رقم الهاتف' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='whatsAppSenderNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم إرسال الواتساب (للنظام)</FormLabel>
                      <FormControl>
                        <Input placeholder='الرقم المربوط بالـ API' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='supportWhatsAppNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم واتساب الدعم الفني</FormLabel>
                      <FormControl>
                        <Input placeholder='رقم دعم المرضى' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='supportPhoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم هاتف الدعم الفني</FormLabel>
                      <FormControl>
                        <Input placeholder='رقم دعم المرضى' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='booking'>
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحجز الأونلاين</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='bookingEnabled'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>تفعيل الحجز الأونلاين</FormLabel>
                        <FormDescription>
                          السماح للمرضى بحجز المواعيد عبر التطبيق الخاص بهم.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} dir='ltr' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cancellationWindowHours'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>فترة السماح بإلغاء الحجز (بالساعات)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        عدد الساعات المسموح للمريض بإلغاء حجزه قبل الموعد.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='workingHours'>
            <Card>
              <CardHeader>
                <CardTitle>أوقات عمل العيادة</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='flex flex-col md:flex-row items-start md:items-end gap-4 border-b pb-4 mb-4'
                  >
                    <div className='w-32 pb-2 font-bold text-lg'>{DAYS_AR[field.dayOfWeek]}</div>

                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.startTime`}
                      render={({ field }) => (
                        <FormItem className='flex-1 w-full'>
                          <FormLabel>من</FormLabel>
                          <FormControl>
                            <Input type='time' step='1' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.endTime`}
                      render={({ field }) => (
                        <FormItem className='flex-1 w-full'>
                          <FormLabel>إلى</FormLabel>
                          <FormControl>
                            <Input type='time' step='1' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`workingHours.${index}.isActive`}
                      render={({ field }) => (
                        <FormItem className='flex flex-col items-start md:items-center justify-center pb-2'>
                          <FormLabel className='mb-2'>يعمل؟</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              dir='ltr'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className='flex justify-end'>
          {/* تم التعديل: الزرار ياخد العرض كله في الموبايل بس */}
          <Button
            type='submit'
            className='w-full md:w-auto'
            size='lg'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </Button>
        </div>
      </form>
    </Form>
  )
}