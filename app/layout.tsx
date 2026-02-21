import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['300', '200', '400', '500', '600', '700','1000','800','900'],
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
      <body
        className={`${cairo.variable} font-sans antialiased `}
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
            <Toaster position='top-center' richColors />
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
