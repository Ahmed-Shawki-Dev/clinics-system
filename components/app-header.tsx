'use client'

import { usePathname } from 'next/navigation'
import { LogoutButton } from './auth/LogoutButton'
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { useAuthStore } from '../store/useAuthStore'

export function AppHeader() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  // 1. هل إحنا في لوحة تحكم المنصة ولا العيادة؟
  const isAdmin = pathname.startsWith('/admin')

  const getTitle = () => {
    // 2. عناوين السوبر أدمن
    if (isAdmin) {
      if (pathname.includes('/tenants')) return 'إدارة العيادات'
      if (pathname.includes('/subscriptions')) return 'الاشتراكات'
      if (pathname.includes('/features')) return 'خواص النظام'
      return 'نظرة عامة'
    }

    // 3. عناوين العيادة
    if (pathname.includes('/patients')) return 'سجل المرضى'
    if (pathname.includes('/staff')) return 'إدارة الموظفين'
    if (pathname.includes('/settings')) return 'الإعدادات'
    if (pathname.includes('/queue')) return 'الطابور'
    return 'الرئيسية'
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-40 w-full'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mx-2 h-4' />

      <div className='flex-1 flex items-center gap-2 text-sm'>
        {/* 4. تغيير الكلمة ديناميكياً */}
        <span className='text-muted-foreground'>{isAdmin ? 'المنصة' : 'العيادة'}</span>
        <span className='text-muted-foreground'>/</span>
        <h2 className='font-semibold text-foreground'>{getTitle()}</h2>
      </div>

      <div className='flex items-center gap-4'>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-9 w-9 cursor-pointer border border-primary/20'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>{user?.displayName || 'مستخدم'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
