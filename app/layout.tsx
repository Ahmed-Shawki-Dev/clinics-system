import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Cairo, Tajawal } from 'next/font/google' // استدعاء الخطين
import './globals.css'

// خط الداشبورد الأساسي
const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

// خط اللاندنج بيدج الفخم
const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-zain',
  display: 'swap',
  weight: ['200', '300', '400', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Nile Dental',
  description: 'Medical System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ar' dir='rtl' suppressHydrationWarning>
      {/* رمينا المتغيرين هنا عشان يبقوا متاحين في ملف الـ CSS */}
      <body
        className={`${cairo.variable} ${tajawal.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <DirectionProvider direction='rtl' dir={'rtl'}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
