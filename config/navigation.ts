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

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'لوحة التحكم',
    href: '/', 
    icon: LayoutDashboard,
    roles: ['SuperAdmin', 'ClinicOwner', 'ClinicManager', 'Receptionist'],
  },
  {
    title: 'الطابور والاستقبال',
    href: '/queue',
    icon: Clock,
    roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
  },
  {
    title: 'طابور الطبيب',
    href: '/doctor/queue',
    icon: Activity,
    roles: ['Doctor', 'SuperAdmin'],
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
  {
    title: 'الفواتير والمدفوعات',
    href: '/billing',
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
  {
    title: 'الأطباء',
    href: '/doctors',
    icon: Stethoscope,
    roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'], // الدكتور ملوش إنه يشوف قايمة الدكاترة زمايله ويديرهم
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
    roles: ['ClinicOwner', 'SuperAdmin'], // المالك بس اللي بيسعر
  },
  {
    title: 'إعدادات العيادة',
    href: '/settings',
    icon: Settings,
    roles: ['ClinicOwner', 'SuperAdmin'],
  },
]
