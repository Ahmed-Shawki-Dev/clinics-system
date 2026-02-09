// config/navigation.ts
import { UserRole } from './roles'
import {
  Users,
  Stethoscope,
  ClipboardList,
  Settings,
  LayoutDashboard, // 👈 ضيفنا الأيقونة دي
  type LucideIcon,
} from 'lucide-react'

type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  roles: UserRole[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'لوحة التحكم',
    href: '/', 
    icon: LayoutDashboard,
    roles: ['SuperAdmin', 'ClinicOwner', 'ClinicManager', 'Doctor', 'Receptionist', 'Patient'],
  },
  {
    title: 'سجل المرضى',
    href: '/patients',
    icon: Users,
    roles: ['ClinicOwner', 'ClinicManager', 'Doctor', 'Receptionist'],
  },
  {
    title: 'الأطباء والخدمات',
    href: '/doctors',
    icon: Stethoscope,
    roles: ['ClinicOwner', 'ClinicManager'],
  },
  {
    title: 'قائمة الكشف',
    href: '/my-queue',
    icon: ClipboardList,
    roles: ['Doctor'],
  },
  {
    title: 'الإعدادات',
    href: '/settings',
    icon: Settings,
    roles: ['ClinicOwner'],
  },
]
