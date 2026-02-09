'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { Lock } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// Shadcn Components (زي ما هي)
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
import { useAuthStore } from '../../../store/useAuthStore'
import { LoginInput, LoginSchema } from '../../../validation/login'
import { loginAction } from '../../../actions/auth/login'

export default function LoginPage() {
  const { tenantSlug } = useParams()
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (values: LoginInput) => {
    try {
      const result = await loginAction(values, tenantSlug as string)

      if (!result.success || !result.data) {
        throw new Error(result.message)
      }

      useAuthStore.getState().setAuth(result.data)

      toast.success(`أهلاً بك يا ${result.data.user.displayName}`)

      router.push(`/${tenantSlug}/dashboard`)
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'خطأ غير معروف'
      toast.error(message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-background to-muted/50 p-4'>
      <Card className='w-full max-w-md border-none shadow-2xl bg-card/80 backdrop-blur-md'>
        <CardHeader className='space-y-3 text-center pb-8'>
          <div className='mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2'>
            <Lock className='w-6 h-6 text-primary' />
          </div>
          <div className='space-y-1'>
            <CardTitle className='text-3xl font-extrabold uppercase tracking-tighter text-primary'>
              {tenantSlug}
            </CardTitle>
            <CardDescription className='text-sm font-medium'>
              بوابة تسجيل دخول الموظفين والدكاترة
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold'>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='اسم المستخدم الخاص بك'
                        className='bg-background/50 focus-visible:ring-primary'
                        {...field}
                      />
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
                    <FormLabel className='font-bold'>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        className='bg-background/50 focus-visible:ring-primary'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' variant={'destructive'} disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'جاري التحقق من الهوية...' : 'دخول النظام'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
