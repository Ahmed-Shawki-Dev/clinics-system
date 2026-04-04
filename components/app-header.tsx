'use client'

import { User } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '../store/useAuthStore'
import { LogoutButton } from './auth/LogoutButton'
import { DoctorNotesBell } from './DoctorNotesBell'
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

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const { user } = useAuthStore()

  const tenantSlug = params.tenantSlug as string

  const isNotDoctor = user?.role !== 'Doctor'

  const getTitle = () => {
    if (pathname.includes('/patients')) return 'سجل المرضى'
    if (pathname.includes('/staff')) return 'إدارة الموظفين'
    if (pathname.includes('/settings')) return 'الإعدادات'
    if (pathname.includes('/queue')) return 'الكشفوفات'
    if (pathname.includes('/appointments')) return 'الحجوزات'
    if (pathname.includes('/invoices')) return 'الفواتير'
    if (pathname.includes('/expenses')) return 'المصروفات'
    if (pathname.includes('/reports')) return 'التقارير'
    if (pathname.includes('/doctors')) return 'إدارة الأطباء'
    if (pathname.includes('/services')) return 'الخدمات'
    if (pathname.includes('/contracts')) return 'التعاقدات'
    if (pathname.includes('/store')) return 'المخزون'
    if (pathname.includes('/profile')) return 'الملف الشخصي'
    return 'الرئيسية'
  }

  const handleProfileNavigation = () => {
    if (!tenantSlug) return

    const profilePath =
      user?.role === 'Doctor'
        ? `/${tenantSlug}/dashboard/doctor/profile`
        : `/${tenantSlug}/dashboard/profile`

    router.push(profilePath)
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-40 w-full'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mx-2 h-4' />

      <div className='flex-1 flex items-center gap-2 text-sm'>
        <span className='text-muted-foreground'>العيادة</span>
        <span className='text-muted-foreground'>/</span>
        <h2 className='font-semibold text-foreground'>{getTitle()}</h2>
      </div>

      <div className='flex items-center gap-4'>
        {isNotDoctor && user?.tenantSlug && <DoctorNotesBell tenantSlug={user.tenantSlug} />}

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-9 w-9 cursor-pointer border border-primary/20 hover:ring-2 hover:ring-primary/50 transition-all'>
              <AvatarImage src='' />
              <AvatarFallback className='bg-primary/10 text-primary font-bold'>
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>{user?.displayName || 'مستخدم'}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className='cursor-pointer' onClick={handleProfileNavigation}>
              <User className='ml-2 h-4 w-4' />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>

            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
