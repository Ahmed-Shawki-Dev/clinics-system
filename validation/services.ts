import * as v from 'valibot'


export const SingleServiceSchema = v.object({
  serviceName: v.pipe(v.string(), v.nonEmpty('اسم الخدمة مطلوب')),
  price: v.pipe(
    v.unknown(),
    v.transform((input) => Number(input)),
    v.number('السعر يجب أن يكون رقم'),
  ),
  durationMinutes: v.optional(v.number(), 15),
  isActive: v.optional(v.boolean(), true),
})

export const UpdateServicesSchema = v.object({
  services: v.array(SingleServiceSchema),
})
