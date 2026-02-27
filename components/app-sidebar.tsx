'use client'

import { Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { SIDEBAR_NAVIGATION } from '@/config/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { useTenantStore } from '@/store/useTenantStore' // 1. استيراد الـ Store
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'

export function AppSidebar() {
  const pathname = usePathname()
  const params = useParams()
  const tenantSlug = params.tenantSlug as string

  const user = useAuthStore((state) => state.user)
  const tenantConfig = useTenantStore((state) => state.config) // 2. قراءة بيانات العيادة

  const getFullUrl = (href: string) => `/${tenantSlug}/dashboard${href === '/' ? '' : href}`

  const filteredConfig = SIDEBAR_NAVIGATION.map((category) => ({
    ...category,
    items: category.items.filter((item) => user && item.roles.includes(user.role)),
  })).filter((category) => category.items.length > 0)

  return (
    <Sidebar collapsible='icon' side='right'>
      {/* 3. الهيدر الديناميكي */}
      <SidebarHeader className='flex h-16 shrink-0 flex-row items-center gap-2 border-b px-4 text-xl font-bold text-primary'>
        {tenantConfig ? (
          // الداتا وصلت، ارسم العيادة
          <>
            <div className='relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary'>
              {tenantConfig.logoUrl ? (
                <Image
                  src={tenantConfig.logoUrl}
                  alt={tenantConfig.name || 'Logo'}
                  fill
                  className='object-cover'
                />
              ) : (
                <Stethoscope className='h-5 w-5' />
              )}
            </div>
            <span className='truncate font-extrabold group-data-[collapsible=icon]:hidden'>
              {tenantConfig.name}
            </span>
          </>
        ) : (
          // الداتا لسه بتيجي، ارسم السكيلتون (حجز مكان احترافي)
          <>
            <Skeleton className='h-8 w-8 rounded-md' />
            <Skeleton className='h-5 w-24 group-data-[collapsible=icon]:hidden' />
          </>
        )}
      </SidebarHeader>

      <SidebarContent>
        {filteredConfig.map((category) => (
          <SidebarGroup key={category.label}>
            <SidebarGroupLabel className='text-xs font-bold text-muted-foreground/70 uppercase tracking-widest'>
              {category.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {category.items.map((item) => {
                  const fullUrl = getFullUrl(item.href)
                  const isActive =
                    item.href === '/'
                      ? pathname === fullUrl
                      : pathname === fullUrl || pathname.startsWith(`${fullUrl}/`)

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className='transition-all duration-200 hover:bg-primary/5 data-[active=true]:bg-primary/10'
                      >
                        <Link href={fullUrl}>
                          <item.icon className='h-4 w-4' />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
