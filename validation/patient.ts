import * as v from 'valibot'

export const CreatePatientSchema = v.object({
  name: v.pipe(
    v.string('الاسم مطلوب'),
    v.minLength(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    v.maxLength(50, 'الاسم طويل جداً'),
  ),
  phone: v.pipe(
    v.string('رقم الهاتف مطلوب'),
    v.regex(/^01[0125][0-9]{8}$/, 'رقم الهاتف غير صحيح (يجب أن يكون مصري)'),
  ),
  // استخدمنا picklist بدل enum_ عشان دي string literals
  gender: v.picklist(['Male', 'Female'], 'يجب اختيار النوع'),

  dateOfBirth: v.date('تاريخ الميلاد مطلوب'),

  address: v.optional(v.string()),

  notes: v.optional(v.string()),
})

// استخراج التايب باستخدام InferOutput زي ما طلبت
export type CreatePatientInput = v.InferOutput<typeof CreatePatientSchema>

export const DeletePatientSchema = v.object({
  id: v.string(), 
  tenantSlug: v.string(), 
})