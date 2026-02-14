'use client'

import { useMemo, useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IDoctor, IDoctorService } from '@/types/doctor'
import { IServiceItem } from '@/types/services'
import { updateDoctorServicesAction } from '@/actions/service/update-doctor-services'

import { DoctorSelect } from './doctor-select'
import { ServicesManager } from './services-manager'

interface Props {
  // التعديل هنا: الـ Type يطابق شكل الداتا اللي جاية من الأكشن
  doctors: { items: IDoctor[]; totalCount: number } | null
  tenantSlug: string
}

export function ServicesView({ doctors: rawData, tenantSlug }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // استخراج المصفوفة بأمان تام من الأوبجيكت
  const doctors = useMemo(() => {
    return rawData?.items || []
  }, [rawData])

  const doctorIdParam = searchParams.get('doctorId')

  const selectedDoctorId = useMemo(() => {
    const found = doctorIdParam && doctors.find((d) => d.id === doctorIdParam)
    return found ? doctorIdParam : doctors[0]?.id || ''
  }, [doctorIdParam, doctors])

  const [isSaving, setIsSaving] = useState(false)
  const [services, setServices] = useState<IServiceItem[]>([])

  // مزامنة خدمات الطبيب المختارة
  useEffect(() => {
    const doc = doctors.find((d) => d.id === selectedDoctorId)
    if (doc) {
      setServices(
        (doc.services || []).map((s) => ({
          serviceName: s.serviceName,
          price: s.price,
          durationMinutes: s.durationMinutes || 15,
          isActive: s.isActive,
        })),
      )
    }
  }, [selectedDoctorId, doctors])

  const handleDoctorChange = useCallback(
    (val: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('doctorId', val)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  const addService = useCallback((newItem: IServiceItem) => {
    setServices((prev) => [...prev, newItem])
  }, [])

  const removeService = useCallback((index: number) => {
    setServices((prev) => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
  }, [])

  const handleSave = async () => {
    if (!selectedDoctorId) return
    setIsSaving(true)
    try {
      const formattedServices: IDoctorService[] = services.map((s) => ({
        serviceName: s.serviceName,
        price: s.price,
        durationMinutes: s.durationMinutes || 15,
        isActive: s.isActive ?? true,
      }))

      const result = await updateDoctorServicesAction({
        doctorId: selectedDoctorId,
        tenantSlug,
        services: formattedServices,
      })

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع')
    } finally {
      setIsSaving(false)
    }
  }

  if (doctors.length === 0)
    return <div className='p-8 text-center border rounded-lg'>لا يوجد أطباء مسجلين.</div>

  return (
    <div className='space-y-6'>
      <DoctorSelect doctors={doctors} selectedId={selectedDoctorId} onSelect={handleDoctorChange} />

      <Card>
        <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <div className='grid gap-1'>
            <CardTitle>قائمة الخدمات</CardTitle>
            <CardDescription>
              الخدمات الخاصة بـ {doctors.find((d) => d.id === selectedDoctorId)?.name || '...'}
            </CardDescription>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='ml-2 h-4 w-4' />
            )}
            حفظ التغييرات
          </Button>
        </CardHeader>
        <CardContent>
          <ServicesManager
            key={selectedDoctorId}
            services={services}
            onAdd={addService}
            onRemove={removeService}
          />
        </CardContent>
      </Card>
    </div>
  )
}
