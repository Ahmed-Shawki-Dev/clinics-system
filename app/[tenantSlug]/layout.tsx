import { notFound, redirect } from 'next/navigation'
interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ tenantSlug: string }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { tenantSlug } = await params

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/${tenantSlug}/clinic`,
    { next: { revalidate: 3600 } },
  )

  if (response.status === 404) {
    notFound()
  }

  const result = await response.json()

  if (!result.data?.isActive) {
    redirect(`/${tenantSlug}/suspended`)
  }

  return children
}
