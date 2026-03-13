'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { AlertCircle, Camera, Clock, Loader2, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'

import { createDoctorAction } from '@/actions/doctor/create-doctor'
import { uploadDoctorPhotoAction } from '@/actions/doctor/upload-photo'
import { ClinicImage } from '@/components/shared/clinic-image' // 👈 المكون السحري بتاعنا
import { MEDICAL_SPECIALTIES } from '@/constants/specialties'
import { CreateDoctorInput, CreateDoctorSchema } from '@/validation/doctor'

export function AddDoctorDialog({ tenantSlug }: { tenantSlug: string }) {
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CreateDoctorInput>({
    resolver: valibotResolver(CreateDoctorSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      phone: '',
      specialty: '',
      urgentCaseMode: 0,
      avgVisitDurationMinutes: 15,
      bio: '',
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error('حجم الصورة يجب أن لا يتعدى 2 ميجا')

      // مسح الـ ObjectURL القديم عشان ميسحبش ميموري (Performance tip)
      if (previewUrl) URL.revokeObjectURL(previewUrl)

      const objectUrl = URL.createObjectURL(file)
      setSelectedFile(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleReset = () => {
    form.reset()
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (values: CreateDoctorInput) => {
    setIsSubmitting(true)
    try {
      // 1. إنشاء الدكتور أولاً
      const res = await createDoctorAction(values, tenantSlug)

      if (res.success && res.data) {
        const newDoctorId = res.data.id

        // 2. رفع الصورة لو موجودة
        if (selectedFile) {
          const formData = new FormData()
          formData.append('file', selectedFile)
          const photoRes = await uploadDoctorPhotoAction(tenantSlug, newDoctorId, formData)
          if (!photoRes.success) toast.error('تم إنشاء الدكتور ولكن فشل رفع الصورة')
        }

        toast.success('تم إضافة الطبيب بنجاح')
        setOpen(false)
        handleReset()
      } else {
        toast.error(res.message || 'فشل إنشاء الحساب')
      }
    } catch (error) {
      toast.error('حدث خطأ غير متوقع')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) handleReset()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className='ml-2 h-4 w-4' /> طبيب جديد
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl max-h-[95vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>بيانات الطبيب الجديد</DialogTitle>
        </DialogHeader>

        {/* دمج الـ ClinicImage في الـ Preview */}
        <div className='flex flex-col items-center justify-center gap-2 py-4'>
          <div
            className='relative h-24 w-24 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center bg-muted overflow-hidden group cursor-pointer hover:border-primary transition-all'
            onClick={() => fileInputRef.current?.click()}
          >
            {/* 👈 استخدام ClinicImage يضمن إن لو مفيش صورة يظهر الـ Fallback الموحد للسيستم */}
            <ClinicImage
              src={previewUrl}
              alt='Doctor Preview'
              fill
              fallbackType='doctor'
              className='object-cover'
            />

            <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <Camera className='text-white w-6 h-6' />
            </div>
          </div>
          <input
            type='file'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/*'
          />
          <span className='text-xs text-muted-foreground'>اضغط لرفع صورة تعريفية</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' autoComplete='off'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم ثلاثي</FormLabel>
                    <FormControl>
                      <Input placeholder='د. محمد أحمد' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='01xxxxxxxxx' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder='dr_mohamed' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='specialty'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التخصص</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='اختر التخصص' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='max-h-40'>
                      {MEDICAL_SPECIALTIES.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>النبذة التعريفية</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='خبرات الطبيب...'
                      className='resize-none h-20'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border'>
              <FormField
                control={form.control}
                name='avgVisitDurationMinutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' /> مدة الكشف (دقيقة)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field} // 1. نفك الـ props الأول
                        value={(field.value as number) ?? ''}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='urgentCaseMode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <AlertCircle className='w-4 h-4' /> الطوارئ
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='0'>Next (الدور على مين؟)</SelectItem>
                        <SelectItem value='1'>Bucket (أول واحد يخلص)</SelectItem>
                        <SelectItem value='2'>Front (يدخل أول واحد)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='w-full h-12 text-lg' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='animate-spin ml-2' /> جاري الحفظ...
                </>
              ) : (
                'إضافة الطبيب'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
