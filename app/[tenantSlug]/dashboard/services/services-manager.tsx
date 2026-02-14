'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IServiceItem } from '@/types/services'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { flatten, safeParse } from 'valibot'
import { SingleServiceSchema } from '../../../../validation/services'

interface Props {
  services: IServiceItem[]
  onAdd: (service: IServiceItem) => void
  onRemove: (index: number) => void
}

export function ServicesManager({ services, onAdd, onRemove }: Props) {
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [errors, setErrors] = useState<{ nested?: { serviceName?: string[]; price?: string[] } }>(
    {},
  )

  const handleAdd = () => {
    const rawData = {
      serviceName: newName,
      price: newPrice === '' ? NaN : Number(newPrice), 
      durationMinutes: 15,
      isActive: true,
    }

    // استخدم السكيما المفردة هنا!
    const result = safeParse(SingleServiceSchema, rawData)

    if (!result.success) {
      const flatErrors = flatten(result.issues)
      setErrors(flatErrors)
      return
    }

    setErrors({})
    onAdd(result.output as IServiceItem)
    setNewName('')
    setNewPrice('')
  }

  const getError = (field: 'serviceName' | 'price') => {
    return errors.nested?.[field]?.[0]
  }

  return (
    <div className='pt-6 space-y-6'>
      <div className='flex items-start gap-3 p-4 bg-secondary/10 rounded-lg border border-dashed'>
        <div className='grid gap-2 flex-1'>
          <Label className={getError('serviceName') ? 'text-destructive' : ''}>اسم الخدمة</Label>
          <Input
            placeholder='مثال: حشو عصب'
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value)
              if (getError('serviceName')) setErrors({})
            }}
            className={getError('serviceName') ? 'border-destructive' : ''}
          />
          {getError('serviceName') && (
            <span className='text-xs text-destructive font-medium'>{getError('serviceName')}</span>
          )}
        </div>

        {/* حقل السعر */}
        <div className='grid gap-2 w-32'>
          <Label className={getError('price') ? 'text-destructive' : ''}>السعر (ج.م)</Label>
          <Input
            type='number'
            placeholder='0'
            value={newPrice}
            onChange={(e) => {
              setNewPrice(e.target.value)
              if (getError('price')) setErrors({})
            }}
            className={getError('price') ? 'border-destructive' : ''}
          />
          {getError('price') && (
            <span className='text-xs text-destructive font-medium'>{getError('price')}</span>
          )}
        </div>

        <div className='pt-8'>
          <Button onClick={handleAdd} size='icon' variant='secondary'>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='rounded-md border'>
        {services.length === 0 ? (
          <div className='p-8 text-center text-muted-foreground text-sm'>
            لا توجد خدمات مضافة لهذا الطبيب بعد.
          </div>
        ) : (
          <div className='divide-y'>
            {services.map((svc, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between p-3 hover:bg-muted/50 transition-colors'
              >
                <span className='font-medium text-sm'>{svc.serviceName}</span>
                <div className='flex items-center gap-4'>
                  <span className='font-bold text-primary text-sm'>{svc.price} ج.م</span>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => onRemove(idx)}
                    className='h-8 w-8 text-muted-foreground hover:text-destructive'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
