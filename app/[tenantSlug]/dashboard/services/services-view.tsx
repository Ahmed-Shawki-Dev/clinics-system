'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {IDoctor} from '@/types/doctor'
import {IServiceItem} from '@/types/services'
import {Loader2, Save} from 'lucide-react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import {toast} from 'sonner'
import {updateDoctorServicesAction} from '@/actions/service/update-doctor-services'
import {DoctorSelect} from './doctor-select'
import {ServicesManager} from './services-manager'

interface Props {
    doctors: IDoctor[]
    tenantSlug: string
}

export function ServicesView({doctors, tenantSlug}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const doctorIdParam = searchParams.get('doctorId')
    const selectedDoctorId =
        doctorIdParam && doctors.find((d) => d.id === doctorIdParam)
            ? doctorIdParam
            : doctors[0]?.id || ''

    const [isSaving, setIsSaving] = useState(false)
    const [services, setServices] = useState<IServiceItem[]>([])

    useEffect(() => {
        const doc = doctors.find((d) => d.id === selectedDoctorId)
        if (doc) {
            setServices(
                (doc.services || []).map((s) => ({
                    serviceName: s.serviceName,
                    price: s.price,
                    durationMinutes: s.durationMinutes || 15,
                    isActive: true,
                })),
            )
        }
    }, [selectedDoctorId, doctors])

    const handleDoctorChange = useCallback(
        (val: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('doctorId', val)
            router.replace(`${pathname}?${params.toString()}`, {scroll: false})
        },
        [pathname, router, searchParams]
    )

    const addService = (newItem: IServiceItem) => {
        setServices([...services, newItem])
    }

    const removeService = (index: number) => {
        const updated = [...services]
        updated.splice(index, 1)
        setServices(updated)
    }

    const handleSave = async () => {
        if (!selectedDoctorId) return
        setIsSaving(true)
        try {
            const result = await updateDoctorServicesAction({
                doctorId: selectedDoctorId,
                tenantSlug,
                services,
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

    if (doctors.length === 0) return <div>لا يوجد أطباء.</div>

    return (
        <div className='space-y-6'>
            <DoctorSelect doctors={doctors} selectedId={selectedDoctorId} onSelect={handleDoctorChange}/>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
                    <div className='grid gap-1'>
                        <CardTitle>قائمة الخدمات</CardTitle>
                        <CardDescription>
                            الخدمات الخاصة بـ {doctors.find((d) => d.id === selectedDoctorId)?.name}
                        </CardDescription>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        ) : (
                            <Save className='mr-2 h-4 w-4'/>
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

