'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function PeriodFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentRange = searchParams.get('range') || 'all'

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    // هنحط الـ range في الـ URL عشان الـ Select يفضل محتفظ بقيمته
    params.set('range', value)

    // reset pagination on filter change
    params.set('page', '1')

    const today = new Date()

    if (value === 'today') {
      const dateStr = today.toISOString().split('T')[0]
      params.set('from', dateStr)
      params.set('to', dateStr)
    } else if (value === 'this-month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      params.set('from', firstDay.toISOString().split('T')[0])
      params.set('to', lastDay.toISOString().split('T')[0])
    } else if (value === 'last-month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0)
      params.set('from', firstDay.toISOString().split('T')[0])
      params.set('to', lastDay.toISOString().split('T')[0])
    } else if (value === 'this-year') {
      const firstDay = new Date(today.getFullYear(), 0, 1)
      const lastDay = new Date(today.getFullYear(), 11, 31)
      params.set('from', firstDay.toISOString().split('T')[0])
      params.set('to', lastDay.toISOString().split('T')[0])
    } else {
      params.delete('from')
      params.delete('to')
      params.delete('range')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={currentRange} onValueChange={handleRangeChange}>
      <SelectTrigger className='w-45 bg-background'>
        <SelectValue placeholder='الفترة الزمنية' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='today'>اليوم</SelectItem>
        <SelectItem value='this-month'>هذا الشهر</SelectItem>
        <SelectItem value='last-month'>الشهر الماضي</SelectItem>
        <SelectItem value='this-year'>هذه السنة</SelectItem>
        <SelectItem value='all'>كل الأوقات</SelectItem>
      </SelectContent>
    </Select>
  )
}
