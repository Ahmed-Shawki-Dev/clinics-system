'use client'

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
import { Switch } from '@/components/ui/switch' // عشان الحالة
import { ROLE_CONFIG, ROLES } from '@/config/roles'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateStaffAction } from '../../../../actions/staff/update-staff'
import { IStaff } from '../../../../types/staff'
import { UpdateStaffInput, updateStaffSchema } from '../../../../validation/staff'

interface Props {
  staff: IStaff
  tenantSlug: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateStaffDialog({ staff, tenantSlug, open, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm<UpdateStaffInput>({
    resolver: valibotResolver(updateStaffSchema),
    defaultValues: {
      id: staff.id,
      name: staff.name,
      username: staff.username,
      phone: staff.phone || '',
      role: staff.role,
      isEnabled: staff.isEnabled,
      password: '', // فاضي عشان مش عايزين نغيره إلا لو اليوزر كتب
    },
  })

  async function onSubmit(values: UpdateStaffInput) {
    setLoading(true)
    const res = await updateStaffAction(values, tenantSlug)
    setLoading(false)

    if (res.success) {
      toast.success(res.message)
      onOpenChange(false)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>تعديل بيانات: {staff.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* الاسم */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الوظيفة */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوظيفة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[ROLES.CLINIC_MANAGER, ROLES.RECEPTIONIST].map((r) => (
                        <SelectItem key={r} value={r}>
                          {ROLE_CONFIG[r].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الهاتف */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الهاتف</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الباسورد (اختياري) */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور الجديدة (اختياري)</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='اتركه فارغاً للاحتفاظ بالقديم' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* التفعيل */}
            <FormField
              control={form.control}
              name='isEnabled'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between rounded-lg border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>تفعيل الحساب</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? <Loader2 className='animate-spin mr-2' /> : 'حفظ التعديلات'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
