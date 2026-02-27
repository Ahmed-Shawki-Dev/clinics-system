import { IPublicClinic } from '@/types/public' // استورد التايب بتاعك
import { notFound, redirect } from 'next/navigation'
import { TenantInitializer } from '../../components/TenantInitializer'
import { BaseApiResponse } from '../../types/api'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ tenantSlug: string }>
}

// ضيفنا التايب عشان TypeScript ميعيطش ويقولك any

export default async function RootLayout({ children, params }: LayoutProps) {
  const { tenantSlug } = await params

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/${tenantSlug}/clinic`,
    { next: { revalidate: 3600 } },
  )

  if (response.status === 404) {
    notFound()
  }

  const result = (await response.json()) as BaseApiResponse<IPublicClinic>

  if (!result.data?.isActive) {
    redirect(`/${tenantSlug}/suspended`)
  }

  // 🔴 التعديل السحري هنا: بنحقن الداتا في المتصفح من غير ما نبوظ شكل اللايوت
  return (
    <>
      <TenantInitializer clinic={result.data} />
      {children}
    </>
  )
}
