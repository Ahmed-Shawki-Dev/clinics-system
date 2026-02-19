import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Zain } from 'next/font/google'
import './globals.css'

const zain = Zain({
  subsets: ['arabic'],
  variable: '--font-tajawal',
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
      <body className={`${zain.variable} font-sans antialiased`} suppressHydrationWarning>
        <DirectionProvider direction='rtl' dir={'rtl'}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position='top-center' richColors />
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
