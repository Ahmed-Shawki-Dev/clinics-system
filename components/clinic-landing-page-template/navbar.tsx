import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDown, Menu, Stethoscope, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IPublicClinic } from '../../types/public'
import { ModeToggle } from '../ModeToggle'

export const publicRoutes = [
  { href: '#about', label: 'عن العيادة' },
  { href: '#doctors', label: 'طاقم العمل' },
  { href: '#contact', label: 'تواصل معنا' },
]

interface NavbarProps {
  clinic: IPublicClinic
  tenantSlug: string
}

export function Navbar({ clinic, tenantSlug }: NavbarProps) {
  const mainContact: string | null | undefined = clinic.supportWhatsAppNumber || clinic.phone

  return (
    <header className='sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Left: Logo + Desktop Nav */}
        <div className='flex items-center gap-8 md:gap-10'>
          <Link
            href={`/${tenantSlug}`}
            className='flex items-center gap-2 transition-opacity hover:opacity-80'
          >
            {clinic.logoUrl ? (
              <Image width={50} height={50} src={clinic.logoUrl} alt={clinic.clinicName} />
            ) : (
              <span className='font-bold text-xl text-primary tracking-tight'>
                {clinic.clinicName}
              </span>
            )}
          </Link>

          <nav className='hidden md:flex gap-6'>
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
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
            {mainContact && (
              <Button variant='outline' size='sm' asChild>
                <a
                  href={`https://wa.me/${mainContact.replace(/\D/g, '')}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    role='img'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 bg-white rounded-full'
                  >
                    <title>WhatsApp</title>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                  </svg>
                </a>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={clinic.bookingEnabled ? 'secondary' : 'default'}
                  size='sm'
                  className='gap-2'
                >
                  تسجيل الدخول
                  <ChevronDown className='w-4 h-4 opacity-50' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem asChild>
                  <Link
                    href={`${tenantSlug}/patient/login`}
                    className='cursor-pointer w-full flex items-center gap-2'
                  >
                    <User className='w-4 h-4' />
                    <span>بوابة المرضى</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`${tenantSlug}/login`}
                    className='cursor-pointer w-full flex items-center gap-2'
                  >
                    <Stethoscope className='w-4 h-4' />
                    <span>الطاقم الطبي</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='top' className='flex flex-col'>
              <div className='flex flex-col gap-6 pt-6 px-2 flex-1'>
                {/* Mobile Logo Fallback */}
                <SheetTitle className='border-b pb-4 flex items-center gap-2 justify-center'>
                  {clinic.logoUrl ? (
                    <div>
                      <Image width={70} height={70} src={clinic.logoUrl} alt={clinic.clinicName} />
                      <span className='text-xl font-bold tracking-tight text-primary'>
                        {clinic.clinicName}
                      </span>
                    </div>
                  ) : (
                    <span className='text-xl font-bold tracking-tight text-primary'>
                      {clinic.clinicName}
                    </span>
                  )}
                </SheetTitle>

                <nav className='flex flex-col gap-4'>
                  {publicRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className='text-base font-medium text-foreground/80 hover:text-primary transition-colors'
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>

                <div className='flex flex-col gap-3 mt-auto pb-6 border-t pt-6'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-muted-foreground font-medium'>المظهر</span>
                    <ModeToggle />
                  </div>

                  <div className='grid grid-cols-2 gap-2 mt-2'>
                    <Button variant='secondary' asChild className='w-full gap-2 text-xs'>
                      <Link href={`${tenantSlug}/patient/login`}>
                        <User className='w-3 h-3' />
                        للمرضى
                      </Link>
                    </Button>
                    <Button variant='secondary' asChild className='w-full gap-2 text-xs'>
                      <Link href={`${tenantSlug}/login`}>
                        <Stethoscope className='w-3 h-3' />
                        للطاقم
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
