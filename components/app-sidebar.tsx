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

export function AppSidebar() {
  const pathname = usePathname()
  const params = useParams()
  const tenantSlug = params.tenantSlug as string
  const user = useAuthStore((state) => state.user)

  const getFullUrl = (href: string) => `/${tenantSlug}/dashboard${href === '/' ? '' : href}`

  // 🔴 فكر كمهندس: بنفلتر الـ Categories والـ Items في خطوة واحدة
  const filteredConfig = SIDEBAR_NAVIGATION.map((category) => ({
    ...category,
    items: category.items.filter((item) => user && item.roles.includes(user.role)),
  })).filter((category) => category.items.length > 0) // لو الكاتيجوري فاضي لليوزر ده ميرسموش

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
        {filteredConfig.map((category) => (
          <SidebarGroup key={category.label}>
            {/* عنوان الكاتيجوري */}
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
