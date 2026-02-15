'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IVisit } from '@/types/visit'
import { LogOut, Save } from 'lucide-react'
import { useState } from 'react'

export function VisitTerminalClient({
  visit: initialVisit,
  tenantSlug,
}: {
  visit: IVisit
  tenantSlug: string
}) {
  const [visit, setVisit] = useState<IVisit>(initialVisit)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm'>
        <div className='flex items-center gap-4 w-full sm:w-auto'>
          <div className='space-y-1.5'>
            <h2 className='text-xl font-bold leading-none'>{visit.patientName}</h2>
            <div className='flex flex-wrap gap-2 pt-1'>
              <Badge variant='outline' className='whitespace-nowrap'>
                زيارة كشف
              </Badge>
              <Badge
                variant={visit.status === 'Open' ? 'default' : 'secondary'}
                className='whitespace-nowrap'
              >
                {visit.status === 'Open' ? 'حالة مفتوحة' : 'مكتملة'}
              </Badge>
            </div>
          </div>
        </div>

        <div className='flex w-full sm:w-auto gap-2 mt-2 sm:mt-0'>
          <Button variant='outline' size='sm' className='flex-1 sm:flex-none h-10 sm:h-9'>
            <LogOut className='w-4 h-4 ml-2' /> خروج
          </Button>
          <Button
            size='sm'
            className='bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none h-10 sm:h-9'
          >
            <Save className='w-4 h-4 ml-2' /> إنهاء الزيارة
          </Button>
        </div>
      </div>

      {/* Tabs: منطقة العمل */}
      <Tabs defaultValue='clinical' className='w-full'>
        {/* الحاوية قابلة للسحب الأفقي */}
        <TabsList className='flex w-full h-12 overflow-x-auto justify-start sm:justify-center bg-muted/50 p-1 mb-4 [&::-webkit-scrollbar]:hidden'>

          <TabsTrigger value='clinical' className='shrink-0 whitespace-nowrap px-4 sm:px-8 text-sm'>
            التشخيص والشكوى
          </TabsTrigger>
          <TabsTrigger
            value='prescription'
            className='shrink-0 whitespace-nowrap px-4 sm:px-8 text-sm'
          >
            الروشتة
          </TabsTrigger>
          <TabsTrigger value='labs' className='shrink-0 whitespace-nowrap px-4 sm:px-8 text-sm'>
            التحاليل والأشعة
          </TabsTrigger>
          <TabsTrigger value='billing' className='shrink-0 whitespace-nowrap px-4 sm:px-8 text-sm'>
            الفاتورة
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='clinical'
          className='focus-visible:outline-none focus-visible:ring-0 mt-2'
        >
          <div className='p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground'>
            قريباً: فورمة الشكوى والتشخيص
          </div>
        </TabsContent>

        <TabsContent
          value='prescription'
          className='focus-visible:outline-none focus-visible:ring-0 mt-2'
        >
          <div className='p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground'>
            قريباً: الروشتة
          </div>
        </TabsContent>
        <TabsContent value='labs' className='focus-visible:outline-none focus-visible:ring-0 mt-2'>
          <div className='p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground'>
            قريباً: التحاليل
          </div>
        </TabsContent>
        <TabsContent
          value='billing'
          className='focus-visible:outline-none focus-visible:ring-0 mt-2'
        >
          <div className='p-8 border-2 border-dashed rounded-xl text-center text-muted-foreground'>
            قريباً: الفاتورة
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
