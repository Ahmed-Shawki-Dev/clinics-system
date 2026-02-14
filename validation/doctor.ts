import * as v from 'valibot'

export const CreateDoctorSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('يجب إدخال الاسم'), v.minLength(3, 'الاسم قصير جداً')),
  username: v.pipe(
    v.string(),
    v.nonEmpty('يجب إدخال اسم المستخدم'),
    v.regex(/^[a-zA-Z0-9_]+$/, 'إنجليزية وأرقام و _ فقط'),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty('يجب إدخال كلمة المرور'),
    v.minLength(6, '6 أحرف على الأقل'),
  ),
  specialty: v.pipe(v.string(), v.nonEmpty('يجب اختيار التخصص')),
  phone: v.pipe(v.string(), v.regex(/^01[0125][0-9]{8}$|^$/, 'رقم مصري غير صحيح')),
  urgentCaseMode: v.pipe(
    v.unknown(),
    v.transform((input) => Number(input)),
    v.number(),
    v.minValue(0),
    v.maxValue(2),
  ),
  avgVisitDurationMinutes: v.pipe(
    v.unknown(),
    v.transform((input) => Number(input)),
    v.number(),
    v.integer(),
    v.minValue(1),
    v.maxValue(120),
  ),
})

export type CreateDoctorInput = v.InferInput<typeof CreateDoctorSchema>
