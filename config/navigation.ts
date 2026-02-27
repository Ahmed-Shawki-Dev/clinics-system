import {
  Activity,
  Banknote,
  CalendarDays,
  ClipboardList,
  Clock,
  LayoutDashboard,
  PieChart,
  Receipt,
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

export type NavCategory = {
  label: string
  items: NavItem[]
}

export const SIDEBAR_NAVIGATION: NavCategory[] = [
  {
    label: 'الرئيسية',
    items: [
      {
        title: 'لوحة التحكم',
        href: '/',
        icon: LayoutDashboard,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'Doctor'],
      },
      {
        title: 'طابور الطبيب',
        href: '/doctor/queue',
        icon: Activity,
        roles: ['Doctor'],
      },
    ],
  },
  {
    label: 'العيادة والاستقبال',
    items: [
      {
        title: 'الطابور والاستقبال',
        href: '/queue',
        icon: Clock,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'المواعيد والحجوزات',
        href: '/appointments',
        icon: CalendarDays,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'Doctor', 'SuperAdmin'],
      },
      {
        title: 'المرضى',
        href: '/patients',
        icon: Users,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'Doctor', 'SuperAdmin'],
      },
    ],
  },
  {
    label: 'الماليات',
    items: [
      {
        title: 'الفواتير والمدفوعات',
        href: '/invoices',
        icon: Receipt,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'المصروفات',
        href: '/expenses',
        icon: Banknote,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'التقارير المالية',
        href: '/reports',
        icon: PieChart,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
      },
    ],
  },
  {
    label: 'الإدارة والإعدادات',
    items: [
      {
        title: 'الأطباء',
        href: '/doctors',
        icon: Stethoscope,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
      },
      {
        title: 'الموظفين',
        href: '/staff',
        icon: ClipboardList,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
      },
      {
        title: 'الخدمات والأسعار',
        href: '/services',
        icon: Banknote,
        roles: ['ClinicOwner', 'SuperAdmin'],
      },
      {
        title: 'إعدادات العيادة',
        href: '/settings',
        icon: Settings,
        roles: ['ClinicOwner', 'SuperAdmin'],
      },
    ],
  },
]
