'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Stethoscope } from 'lucide-react'

import { useAuthStore } from '@/store/useAuthStore'
import { useTenantStore } from '@/store/useTenantStore'

import { LogoutButton } from './auth/LogoutButton'
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function DoctorNavbar() {
  const { user } = useAuthStore()
  const tenantConfig = useTenantStore((state) => state.config)

  // حماية الـ Hydration بدون ما نضرب الـ Render
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <header className='sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-6 shadow-sm'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-8 w-8 rounded-md' />
          <Skeleton className='h-5 w-32' />
        </div>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-9 rounded-full' />
        </div>
      </header>
    )
  }

  return (
    <header className='sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-6 shadow-sm'>
      {/* الجزء اليمين: اللوجو واسم العيادة فقط */}
      <div className='flex items-center gap-3'>
        <div className='relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary'>
          {tenantConfig?.logoUrl ? (
            <Image
              src={tenantConfig.logoUrl}
              alt={tenantConfig?.name || 'Clinic'}
              fill
              className='object-cover'
            />
          ) : (
            <Stethoscope className='h-5 w-5' />
          )}
        </div>
        <span className='font-bold text-foreground hidden sm:inline-block text-lg'>
          {tenantConfig?.name || 'العيادة'}
        </span>
      </div>

      {/* الجزء الشمال: تحكم المستخدم */}
      <div className='flex items-center gap-3'>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-9 w-9 cursor-pointer border border-primary/20 hover:ring-2 hover:ring-primary/50 transition-all'>
              <AvatarImage src='' />
              <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                {user?.displayName?.charAt(0) || 'D'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel className='flex flex-col'>
              <span>{user?.displayName || 'دكتور'}</span>
              <span className='text-xs text-muted-foreground font-normal'>مساحة عمل الطبيب</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>الملف الشخصي</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>إعدادات الكشف</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
