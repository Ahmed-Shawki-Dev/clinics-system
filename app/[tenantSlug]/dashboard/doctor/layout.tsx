import { redirect } from 'next/navigation'
import { getUserRole } from '@/lib/get-user-role'

interface DoctorLayoutProps {
  children: React.ReactNode
  params: Promise<{ tenantSlug: string }>
}

export default async function DoctorLayout({ children, params }: DoctorLayoutProps) {
  const { tenantSlug } = await params

  // 1. اقرأ الرول من الكوكيز (Stateless و 0ms)
  const role = await getUserRole()

  // 2. تحديد الصلاحيات: مين مسموح له يشوف شغل الدكتور؟
  // لو عايز صاحب العيادة يراقب الطابور ضيف 'ClinicOwner'
  if (role !== 'Doctor') {
    // 🔴 السر هنا عشان نمنع الـ Loop: ارميه على الداشبورد الرئيسية مش اللوجن
    redirect(`/${tenantSlug}/dashboard`)
  }

  // 3. لو دكتور أو أونر، اعرض له شغله
  return <>{children}</>
}
