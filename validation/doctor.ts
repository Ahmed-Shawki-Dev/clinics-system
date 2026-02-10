import * as v from 'valibot'

export const CreateDoctorSchema = v.object({
  name: v.pipe(
    v.string('نوع البيانات غير صحيح'),
    v.nonEmpty('يجب إدخال الاسم'),
    v.minLength(3, 'الاسم قصير جداً (3 أحرف على الأقل)'),
    v.maxLength(200, 'الاسم طويل جداً'),
  ),

  username: v.pipe(
    v.string('نوع البيانات غير صحيح'),
    v.nonEmpty('يجب إدخال اسم المستخدم'),
    v.minLength(3, 'اسم المستخدم قصير جداً'),
    v.maxLength(50, 'اسم المستخدم طويل جداً'),
    v.regex(/^[a-zA-Z0-9_]+$/, 'مسموح فقط بالحروف الإنجليزية والأرقام و _'),
  ),

  password: v.pipe(
    v.string('نوع البيانات غير صحيح'),
    v.nonEmpty('يجب إدخال كلمة المرور'),
    v.minLength(6, 'كلمة المرور ضعيفة (6 أحرف على الأقل)'),
  ),

  specialty: v.pipe(v.string('نوع البيانات غير صحيح'), v.nonEmpty('يجب اختيار التخصص')),

  phone: v.pipe(
    v.string(),
    v.regex(/^01[0125][0-9]{8}$|^$/, 'رقم الهاتف غير صحيح (يجب أن يكون رقم مصري)'),
  ),

  // 3. الأرقام والـ Enums
  urgentCaseMode: v.pipe(
    v.unknown(),
    v.transform((input) => (input === '' ? NaN : Number(input))),
    v.number('يجب اختيار نظام الطوارئ'),
    v.minValue(0, 'نظام طوارئ غير صحيح'),
    v.maxValue(2, 'نظام طوارئ غير صحيح'),
  ),

  avgVisitDurationMinutes: v.pipe(
    v.unknown(),
    v.transform((input) => (input === '' ? NaN : Number(input))),
    v.number('المدة يجب أن تكون رقم'),
    v.integer('المدة يجب أن تكون عدد صحيح'),
    v.minValue(1, 'المدة لا تقل عن دقيقة'),
    v.maxValue(120, 'المدة لا تزيد عن ساعتين'),
  ),
})

export type CreateDoctorInput = v.InferInput<typeof CreateDoctorSchema>
