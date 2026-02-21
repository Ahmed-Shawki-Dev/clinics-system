import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'
import { ModeToggle } from '../ModeToggle'

export const patientRoutes = [
  { href: '#services', label: 'الخدمات' },
  { href: '#doctors', label: 'الأطباء' },
  { href: '#booking', label: 'احجز موعد' },
  { href: '#about', label: 'عن العيادة' },
  { href: '#contact', label: 'تواصل معنا' },
]

export function Navbar({ clinic }: { clinic: IPublicClinic }) {
  const mainContact = clinic.supportWhatsAppNumber || clinic.phone

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Left: Logo + Desktop Nav */}
        <div className='flex items-center gap-8 md:gap-10'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='font-bold text-xl text-primary'>{clinic.clinicName}</span>
          </Link>

          <nav className='hidden md:flex gap-6'>
            {patientRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='text-sm font-medium text-muted-foreground hover:text-primary transition'
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions + Mobile Menu */}
        <div className='flex items-center gap-3'>
          {/* Desktop Actions */}
          <div className='hidden md:flex items-center gap-3'>
            <ModeToggle />
            {mainContact && (
              <Button variant='outline' size='sm' asChild>
                <a href={`https://wa.me/${mainContact.replace(/\D/g, '')}`} target='_blank'>
                  واتساب
                </a>
              </Button>
            )}
            {clinic.bookingEnabled ? (
              <Button size='sm' asChild>
                <Link href='/booking'>احجز موعد</Link>
              </Button>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/login'>تسجيل الدخول</Link>
              </Button>
            )}
          </div>

          {/* Mobile Sheet - نفس الفكرة بس مع routes الجديدة */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <div className='flex flex-col gap-6 pt-10 px-6'>
                <SheetTitle className='text-lg font-bold mb-4'>{clinic.clinicName}</SheetTitle>

                <nav className='flex flex-col gap-5'>
                  {patientRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className='text-base font-medium hover:text-primary'
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>

                <div className='flex flex-col gap-4 mt-8'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>المظهر</span>
                    <ModeToggle />
                  </div>

                  {mainContact && (
                    <Button asChild>
                      <a href={`https://wa.me/${mainContact.replace(/\D/g, '')}`} target='_blank'>
                        تواصل واتساب
                      </a>
                    </Button>
                  )}

                  {clinic.bookingEnabled ? (
                    <Button asChild>
                      <Link href='/booking'>احجز موعد الآن</Link>
                    </Button>
                  ) : (
                    <Button variant='outline' asChild>
                      <Link href='/login'>تسجيل الدخول</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
