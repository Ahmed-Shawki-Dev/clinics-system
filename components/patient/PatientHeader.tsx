'use client'

import { ClinicImage } from '@/components/shared/clinic-image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { usePatientAuthStore } from '../../store/usePatientAuthStore'
import { useTenantStore } from '../../store/useTenantStore'
import { PatientLogoutButton } from '../auth/PatientLogoutButton'

export function PatientHeader() {
  const router = useRouter()
  const params = useParams()
  const tenantSlug = params.tenantSlug as string

  // جلب الداتا من الـ Stores
  const { config } = useTenantStore()
  const { user, activeProfileId } = usePatientAuthStore() // شيلنا الـ logout من هنا

  // تحديد اسم المريض الحالي (لو عنده Profiles فرعية بنجيب اسم الـ Profile النشط)
  const activeProfile = user?.profiles?.find((p) => p.id === activeProfileId)
  const displayName = activeProfile?.name || user?.displayName || user?.username || 'مريض'

  return (
    <header className='sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b h-14 flex items-center justify-between px-4 shadow-sm'>
      {/* 1. اسم العيادة واللوجو */}
      <div className='flex items-center gap-2'>
        <div className='relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background border'>
          <ClinicImage
            src={config?.logoUrl}
            alt={config?.name || 'Clinic Logo'}
            fill
            fallbackType='logo'
            className='object-cover'
          />
        </div>
        <h1 className='font-bold text-lg text-foreground tracking-wider truncate max-w-37.5'>
          {config?.name || tenantSlug}
        </h1>
      </div>

      {/* 2. أفتار المريض والدروب داون */}
      <div className='flex items-center gap-3'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-8 w-8 cursor-pointer border border-primary/20 hover:ring-2 hover:ring-primary/50 transition-all'>
              <AvatarImage src='' />
              <AvatarFallback className='bg-primary/10 text-primary font-bold text-xs'>
                {displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' className='w-56' >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none truncate'>{displayName}</p>
                <p className='text-xs leading-none text-muted-foreground mt-1 truncate'>
                  {user?.username}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => router.push(`/${tenantSlug}/patient/profile`)}
            >
              <User className='mr-2 h-4 w-4 ml-2 text-muted-foreground' />
              الملف الشخصي
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* 👇 الكومبوننت المخصص لتسجيل الخروج */}
            <PatientLogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
