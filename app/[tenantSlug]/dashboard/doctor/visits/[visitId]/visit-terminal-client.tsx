'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IVisit } from '@/types/visit'
import { LogOut, Save } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { completeVisitAction } from '../../../../../../actions/visit/complete-visit'
import { ClinicalTab } from './clinical-tab'
import { LabsTab } from './lab-tab'
import { PrescriptionTab } from './prescription-tab'
import { IDoctorVisitConfig } from '@/types/doctor' 

export function VisitTerminalClient({
  visit,
  tenantSlug,
  defaultTab,
  doctorConfig, 
}: {
  visit: IVisit
  tenantSlug: string
  defaultTab: string
  doctorConfig?: IDoctorVisitConfig 
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isCompleting, setIsCompleting] = useState(false)

  const handleCompleteVisit = async () => {
    setIsCompleting(true)
    const res = await completeVisitAction(tenantSlug, visit.id)
    setIsCompleting(false)

    if (res.success) {
      toast.success('تم إنهاء الزيارة بنجاح')
      router.push(`/${tenantSlug}/dashboard/doctor/queue`)
    } else {
      toast.error(res.message || 'حدث خطأ أثناء إنهاء الزيارة')
    }
  }

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Header الزيارة */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm'>
        <div className='flex items-center gap-4 w-full sm:w-auto'>
          <div className='space-y-1.5'>
            <h2 className='text-xl font-bold leading-none text-right'>{visit.patientName}</h2>
            <div className='flex flex-wrap gap-2 pt-1 justify-start'>
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
          <Button variant='outline'>
            <LogOut className='w-4 h-4 ml-2' /> خروج
          </Button>

          {!visit.completedAt && (
            <Button onClick={handleCompleteVisit} disabled={isCompleting}>
              <Save className='w-4 h-4 ml-2' />
              {isCompleting ? 'جاري الإنهاء...' : 'إنهاء الزيارة'}
            </Button>
          )}
        </div>
      </div>

      {/* التابات */}
      <Tabs defaultValue={defaultTab} onValueChange={handleTabChange} className='w-full'>
        <TabsList className='flex w-full h-12 overflow-x-auto justify-start sm:justify-center bg-muted/50 p-1 mb-4'>
          <TabsTrigger value='clinical' className='px-4 sm:px-8 text-sm'>
            التشخيص والشكوى
          </TabsTrigger>
          <TabsTrigger value='prescription' className='px-4 sm:px-8 text-sm'>
            الروشتة
          </TabsTrigger>
          <TabsTrigger value='labs' className='px-4 sm:px-8 text-sm'>
            التحاليل والأشعة
          </TabsTrigger>
        </TabsList>

        <TabsContent value='clinical' className='focus-visible:outline-none mt-2'>
          {/* 4. مررنا الإعدادات للتابة عشان تخفي وتظهر براحتها */}
          <ClinicalTab visit={visit} tenantSlug={tenantSlug} doctorConfig={doctorConfig} />
        </TabsContent>

        <TabsContent value='prescription' className='focus-visible:outline-none mt-2'>
          <PrescriptionTab visit={visit} tenantSlug={tenantSlug} />
        </TabsContent>

        <TabsContent value='labs' className='focus-visible:outline-none mt-2'>
          <LabsTab tenantSlug={tenantSlug} visit={visit} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
