'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { KeyRound, Loader2, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { usePatientAuthStore } from '@/store/usePatientAuthStore'
import { LoginInput, LoginSchema } from '@/validation/login'
import { useParams, useRouter } from 'next/navigation'
import { patientLoginAction } from '../../../../actions/auth/patientLogin'

export default function PatientLoginPage() {
  const { tenantSlug } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (values: LoginInput) => {
    setIsLoading(true)
    try {
      const result = await patientLoginAction(values, tenantSlug as string)
      if (!result.success || !result.data) throw new Error(result.message)

      usePatientAuthStore.getState().setPatientAuth(result.data)
      toast.success('تم تسجيل الدخول بنجاح')

      // الحل السحري: Hard Navigation عشان نفرمت الكاش والميدلوير يشتغل صح
      window.location.href = `/${tenantSlug}/patient`
    } catch (error) {
      if (error instanceof Error) toast.error(error.message || 'خطأ في الدخول')
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-xl'>
        <CardHeader className='space-y-1 text-center pb-8'>
          <CardTitle className='text-2xl font-bold tracking-tight'>بوابة المرضى</CardTitle>
          <CardDescription className='uppercase tracking-widest text-xs font-semibold text-primary'>
            {tenantSlug} CLINIC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <UserRound className='absolute right-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder='رقم الهاتف أو اسم المستخدم'
                          className='pr-9'
                          {...field}
                        />
                      </div>
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
                      <div className='relative'>
                        <KeyRound className='absolute right-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input type='password' placeholder='••••••••' className='pr-9' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full mt-4' disabled={isLoading}>
                {isLoading && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
                دخول
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
