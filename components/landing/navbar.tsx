import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'

export function Navbar() {
  const routes = [
    { href: '#features', label: 'المميزات' },
    { href: '#faq', label: 'الأسئلة الشائعة' },
    { href: '#contact', label: 'تواصل معنا' },
  ]

  return (
    // التعديل 1: النافبار مبقاش لازق في الحواف، بقى طاير (Floating)
    <div className='sticky w-full  z-50 flex justify-center'>
      <header className='w-full  rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300'>
        <div className='flex h-14 items-center justify-between px-4 md:px-6'>
          {/* اليمين: اللوجو */}
          <Link href='/' className='flex items-center gap-2 group'>
            <span className='font-black text-lg tracking-tight bg-clip-text text-transparent bg-linear-to-l from-foreground to-foreground/70'>
              ميدورا
            </span>
          </Link>

          {/* المنتصف: الروابط (ديسكتوب) */}
          <nav className='hidden md:flex items-center gap-8'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className='text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:-translate-y-0.5'
              >
                {route.label}
              </Link>
            ))}
          </nav>

          {/* اليسار: الثيم والموبايل */}
          <div className='flex items-center gap-2'>
            <div className='hidden md:block'>
              <ModeToggle />
            </div>

            {/* قائمة الموبايل */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden h-8 w-8 rounded-full'>
                  <Menu className='h-4 w-4' />
                  <span className='sr-only'>فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-70 sm:w-[320px] border-l-border/50'>
                <div className='flex flex-col h-full pt-10'>
                  <SheetTitle className='sr-only'>قائمة ميدورا</SheetTitle>

                  <Link href='/' className='flex items-center gap-2 mb-10'>
                    <div className='bg-primary/10 p-2 rounded-xl'>
                      <Sparkles className='h-5 w-5 text-primary' />
                    </div>
                    <span className='font-black text-2xl tracking-tight'>ميدورا</span>
                  </Link>

                  <nav className='flex flex-col gap-6 flex-1'>
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className='text-lg font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2'
                      >
                        <span className='w-1.5 h-1.5 rounded-full bg-primary/50' />
                        {route.label}
                      </Link>
                    ))}
                  </nav>

                  <div className='flex items-center justify-between py-6 border-t border-border/50 mt-auto'>
                    <span className='text-sm font-bold text-muted-foreground'>مظهر النظام</span>
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  )
}
