'use client'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { ModeToggle } from './ModeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function AppHeader() {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname.includes('/patients')) return 'سجل المرضى'
    if (pathname.includes('/staff')) return 'إدارة الموظفين'
    if (pathname.includes('/settings')) return 'الإعدادات'
    return 'الرئيسية'
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-40 w-full'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mx-2 h-4' />

      <div className='flex-1 flex items-center gap-2 text-sm'>
        <span className='text-muted-foreground'>العيادة</span>
        <span className='text-muted-foreground'>/</span>
        <h2 className='font-semibold text-foreground'>{getTitle()}</h2>
      </div>

      <div className='flex items-center gap-4'>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-9 w-9 cursor-pointer border border-primary/20'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>د. أحمد شوقي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
            <DropdownMenuItem className='text-red-600 font-medium'>تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
