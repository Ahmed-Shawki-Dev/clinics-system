import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'

export function Navbar() {
  // مصفوفة الروابط عشان نمنع التكرار (DRY)
  const routes = [
    { href: '#features', label: 'المميزات' },
    { href: '#about', label: 'عن النظام' },
    { href: '#contact', label: 'تواصل معنا' },
  ]

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6'>
        {/* اليمين: اللوجو والروابط للشاشات الكبيرة */}
        <div className='flex items-center gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            {/* <Image
              src='/logo.png'
              alt='Elite Clinic Logo'
              width={32}
              height={32}
              className='ms-2'
            /> */}
            <span className='font-bold text-xl inline-block text-primary'>Beta Clinics</span>
          </Link>
          <nav className='hidden md:flex gap-6'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* اليسار: الأزرار وقائمة الموبايل */}
        <div className='flex items-center gap-2'>
          {/* أزرار الشاشات الكبيرة */}
          <div className='hidden md:flex items-center gap-2'>
            <ModeToggle />
            <Button asChild variant='ghost' size='sm'>
              <Link href='/login'>تسجيل الدخول</Link>
            </Button>
            <Button asChild size='sm'>
              <Link href='/book'>احجز ديمو</Link>
            </Button>
          </div>

          {/* قائمة الموبايل (Mobile Drawer) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='pr-0 sm:max-w-xs'>
              <div className='flex flex-col gap-6 px-6 pt-10'>
                <Link href='/' className='flex items-center space-x-2 mb-4'>
                  <Image
                    src='/logo.png'
                    alt='Elite Clinic Logo'
                    width={32}
                    height={32}
                    className='ms-2'
                  />
                  <span className='font-bold text-xl text-primary'>Elite Clinic</span>
                </Link>
                <div className='flex flex-col gap-4'>
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className='text-base font-medium text-muted-foreground hover:text-primary'
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
                <div className='flex flex-col gap-3 mt-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-muted-foreground'>المظهر</span>
                    <ModeToggle />
                  </div>
                  <Button asChild variant='outline' className='w-full justify-center'>
                    <Link href='/login'>تسجيل الدخول</Link>
                  </Button>
                  <Button asChild className='w-full justify-center'>
                    <Link href='/book'>احجز ديمو</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
