import {
  Activity,
  Banknote,
  CalendarDays,
  ClipboardList,
  Clock,
  Handshake,
  LayoutDashboard,
  PieChart,
  Receipt,
  Settings,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { UserRole } from './roles' // تأكد من مسار الـ UserRole عندك

export type NavItem = {
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
  // 1. مساحة عمل الطبيب (حصرية للدكتور فقط بسبب الـ Self-Scoped APIs)
  {
    label: 'مساحة عمل الطبيب',
    items: [
      {
        title: 'طابور الكشف',
        href: '/doctor/queue',
        icon: Activity,
        roles: ['Doctor'],
      },
      {
        title: 'زياراتي',
        href: '/doctor/visits',
        icon: CalendarDays,
        roles: ['Doctor'],
      },
      {
        title: 'سجل مرضاي',
        href: '/doctor/patients',
        icon: Users,
        roles: ['Doctor'],
      },
      {
        title: 'الإعدادات',
        href: '/doctor/settings',
        icon: Settings,
        roles: ['Doctor'],
      },
    ],
  },

  // 2. التشغيل والاستقبال (Front-desk)
  {
    label: 'العيادة والاستقبال',
    items: [
      {
        title: 'لوحة التحكم',
        href: '/',
        icon: LayoutDashboard,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'الطابور المجمع',
        href: '/queue',
        icon: Clock,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'المواعيد والحجوزات',
        href: '/appointments',
        icon: CalendarDays,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
      {
        title: 'قاعدة المرضى',
        href: '/patients',
        icon: Users,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'],
      },
    ],
  },

  // 3. الإدارة المالية
  {
    label: 'الماليات',
    items: [
      {
        title: 'الفواتير والمدفوعات',
        href: '/invoices',
        icon: Receipt,
        roles: ['ClinicOwner', 'ClinicManager', 'Receptionist', 'SuperAdmin'], // الريسبشن بيكريت فواتير
      },
      {
        title: 'المصروفات',
        href: '/expenses',
        icon: Banknote,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'], // المصروفات للإدارة بس
      },
      {
        title: 'التقارير المالية',
        href: '/reports',
        icon: PieChart,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
      },
      {
        title: 'التعاقدات',
        href: '/contracts',
        icon: Handshake ,
        roles: ['ClinicOwner', 'ClinicManager', 'SuperAdmin'],
      },
    ],
  },

  // 4. الإدارة والتشغيل
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
        roles: ['ClinicOwner', 'SuperAdmin'], // المدير ملوش يغير أسعار
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
