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

import { NAV_ITEMS } from '@/config/navigation'
import { useAuthStore } from '@/store/useAuthStore'

export function AppSidebar() {
  const pathname = usePathname()
  const params = useParams()
  const tenantSlug = params.tenantSlug as string

  const user = useAuthStore((state) => state.user)

  const getFullUrl = (href: string) => `/${tenantSlug}/dashboard${href === '/' ? '' : href}`

  const filteredMenu = NAV_ITEMS.filter((item) => {
    if (!user) return false

    return item.roles.includes(user.role)
  })

  return (
    <Sidebar collapsible='icon' side='right'>
      <SidebarHeader className='flex h-16 shrink-0 flex-row items-center gap-2 border-b px-4 text-xl font-bold text-primary'>
        <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
          <Stethoscope className='h-5 w-5' />
        </div>
        <span className='truncate font-extrabold group-data-[collapsible=icon]:hidden'>
          Elite Clinic
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenu.map((item) => {
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
                      className='transition-all duration-200 hover:translate-x-1'
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
      </SidebarContent>
    </Sidebar>
  )
}
