import { Building2 } from 'lucide-react'
import { PatientBottomNav } from '../../../../components/patient/bottom-navigation-mobile'

// 1. خلينا الدالة async
// 2. غيرنا الـ Type بتاع params لـ Promise
export default async function PatientLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tenantSlug: string }>
}) {
  // 3. عملنا await للـ params قبل ما نستخدم الـ tenantSlug
  const { tenantSlug } = await params

  return (
    <div className='min-h-screen bg-muted/10 pb-20' dir='rtl'>
      <header className='sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b h-14 flex items-center justify-between px-4 shadow-sm'>
        <div className='flex items-center gap-2'>
          <Building2 className='h-5 w-5 text-primary' />
          <h1 className='font-bold text-lg text-foreground uppercase tracking-wider'>
            {tenantSlug}
          </h1>
        </div>
      </header>

      <main className='p-4 max-w-md mx-auto'>{children}</main>

      <PatientBottomNav />
    </div>
  )
}
