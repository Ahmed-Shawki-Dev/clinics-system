'use client'

import { ILabRequest, IVisit } from '@/types/visit'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createLabRequestAction } from '@/actions/labs/create-lab-request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LabRequestFormInput, labRequestSchema } from '@/validation/labs'
import { AlertCircle, Beaker, FileText, Loader2, Plus, Trash2 } from 'lucide-react'

interface LabsTabProps {
  visit: IVisit
  tenantSlug: string
}

export function LabsTab({ visit, tenantSlug }: LabsTabProps) {
  const form = useForm<LabRequestFormInput>({
    resolver: valibotResolver(labRequestSchema),
    defaultValues: {
      testName: '',
      type: 'Lab',
      notes: '',
      isUrgent: false,
    },
  })

  const onSubmit = async (data: LabRequestFormInput) => {
    const res = await createLabRequestAction(tenantSlug, visit.id, data)
    if (res.success) {
      toast.success('تم إضافة الطلب بنجاح')
      form.reset()
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className='space-y-6 mt-4'>
      {/* 1. فورمة احترافية مقسمة صح */}
      <div className='bg-card p-6 rounded-xl border shadow-sm'>
        <div className='flex items-center gap-2 mb-6 text-primary font-bold'>
          <Beaker className='w-5 h-5' />
          <h3 className='text-lg'>إضافة طلب جديد (تحليل / أشعة)</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-start'>
              {/* اسم الفحص */}
              <div className='md:col-span-4'>
                <FormField
                  control={form.control}
                  name='testName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الفحص</FormLabel>
                      <FormControl>
                        <Input placeholder='مثال: CBC, MRI' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* نوع الفحص - Shadcn Select */}
              <div className='md:col-span-3'>
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>النوع</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='اختر النوع' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Lab'>معمل (Lab)</SelectItem>
                          <SelectItem value='Radiology'>أشعة (Radiology)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ملاحظات */}
              <div className='md:col-span-5'>
                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='أي تعليمات إضافية...'
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex items-center justify-between border-t pt-4 mt-2'>
              {/* حالة طارئة - Shadcn Checkbox */}
              <FormField
                control={form.control}
                name='isUrgent'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-reverse space-x-3 space-y-0 rounded-md border p-3 shadow-sm'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='text-red-600 font-bold flex items-center gap-1'>
                        <AlertCircle className='w-4 h-4' /> حالة طارئة
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                size='lg'
                className='px-8 bg-blue-600'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <>
                    <Plus className='ml-2 w-4 h-4' /> إضافة للزيارة
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* 2. جدول الطلبات */}
      <div className='bg-card rounded-xl border shadow-sm overflow-hidden'>
        <div className='p-4 bg-muted/30 border-b flex items-center justify-between'>
          <div className='flex items-center gap-2 font-semibold'>
            <FileText className='w-4 h-4 text-muted-foreground' />
            <h4>قائمة الفحوصات المطلوبة</h4>
          </div>
          <Badge variant='outline'>{visit.labRequests?.length || 0} طلبات</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-right'>نوع الفحص</TableHead>
              <TableHead className='text-right'>اسم الفحص</TableHead>
              <TableHead className='text-right'>الملاحظات</TableHead>
              <TableHead className='text-right'>الحالة</TableHead>
              <TableHead className='w-12.5'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visit.labRequests?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center py-10 text-muted-foreground'>
                  لا توجد طلبات مسجلة لهذه الزيارة.
                </TableCell>
              </TableRow>
            ) : (
              visit.labRequests.map((lab: ILabRequest) => (
                <TableRow key={lab.id} className={lab.isUrgent ? 'bg-red-50/30' : ''}>
                  <TableCell>
                    <Badge variant='secondary'>{lab.type === 'Lab' ? 'معمل' : 'أشعة'}</Badge>
                  </TableCell>
                  <TableCell className='font-bold flex items-center gap-2'>
                    {lab.testName}
                    {lab.isUrgent && (
                      <Badge className='bg-red-500 hover:bg-red-600 text-[10px] h-4 px-1'>
                        عاجل
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {lab.notes || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='bg-yellow-50 text-yellow-700 border-yellow-200'
                    >
                      في انتظار النتيجة
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='icon' className='text-destructive'>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
