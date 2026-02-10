import {
  Banknote,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users, 
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
    title: 'المرضى',
    href: '/patients',
    icon: Users,
    roles: ['ClinicOwner', 'ClinicManager', 'Doctor', 'Receptionist', 'SuperAdmin'],
  },
  {
    title: 'الأطباء',
    href: '/doctors',
    icon: Stethoscope,
    roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
  },
  {
    title: 'العمال',
    href: '/staff',
    icon: ClipboardList,
    roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
  },
  {
    title: 'الخدمات',
    href: '/services',
    icon: Banknote,
    roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
  },
  {
    title: 'قائمة الكشف',
    href: '/my-queue',
    icon: ClipboardList,
    roles: ['Doctor', 'SuperAdmin'  ],
  },
  {
    title: 'الإعدادات',
    href: '/settings',
    icon: Settings,
    roles: ['ClinicOwner'],
  },
]
