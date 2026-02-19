import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-plex-sans-arabic',
  display: 'swap',
  weight: ['300', '100', '200', '400', '500', '600', '700'],
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
        className={`${ibmPlexSansArabic.variable} font-sans antialiased`}
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
