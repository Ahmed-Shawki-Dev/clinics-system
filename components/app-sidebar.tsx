'use client'
import { Activity, Calendar, LayoutDashboard, Settings, Stethoscope, Users } from 'lucide-react'
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

export function AppSidebar() {
  const pathname = usePathname()
  const { tenantSlug } = useParams()

  const rootUrl = `/${tenantSlug}/dashboard`

  const menuItems = [
    { title: 'لوحة التحكم', url: `${rootUrl}`, icon: LayoutDashboard },
    { title: 'سجل المرضى', url: `${rootUrl}/patients`, icon: Users },
    { title: 'المواعيد', url: `${rootUrl}/appointments`, icon: Calendar },
    { title: 'الانتظار', url: `${rootUrl}/queue`, icon: Activity },
    { title: 'الإعدادات', url: `${rootUrl}/settings`, icon: Settings },
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='h-16 flex flex-row items-center px-4 border-b font-bold text-xl text-primary gap-2 shrink-0'>
        <Stethoscope className='h-6 w-6' />
        <span className='group-data-[collapsible=icon]:hidden truncate'>Elite Clinic</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
