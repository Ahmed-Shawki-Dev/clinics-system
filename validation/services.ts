import * as v from 'valibot'

export const ServiceSchema = v.object({
  serviceName: v.pipe(v.string('الاسم مطلوب'), v.minLength(2, 'اسم الخدمة لازم يكون حرفين على الأقل')),
  price: v.pipe(v.number('السعر مطلوب'), v.minValue(1, 'السعر لازم يكون أكبر من 0')),
})