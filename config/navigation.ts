// config/navigation.ts
import {
  Banknote,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users, // 👈 ضيفنا الأيقونة دي
  type LucideIcon,
} from 'lucide-react'
import { UserRole } from './roles'

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
    title: 'الأطباء',
    href: '/doctors',
    icon: Stethoscope,
    roles: ['ClinicOwner', 'ClinicManager'],
  },
  {
    title: 'الخدمات والأسعار',
    href: '/services',
    icon: Banknote,
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
