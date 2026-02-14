import * as v from 'valibot'

export const OpenSessionSchema = v.object({
  doctorId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار الطبيب لتفعيل العيادة')),
  notes: v.optional(v.string()),
})

export type OpenSessionInput = v.InferInput<typeof OpenSessionSchema>

export const CutTicketSchema = v.object({
  sessionId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار العيادة')),
  patientId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار المريض')),
  doctorId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار الطبيب')),
  doctorServiceId: v.optional(v.string()), // ضفناها عشان مربوطة بنوع الخدمة وتسعيرتها
  isUrgent: v.boolean(), // هنسيبها في الفورم عشان نبني عليها اللوجيك بتاع الـ 2 API calls
  notes: v.optional(v.string()),
})

export type CutTicketInput = v.InferInput<typeof CutTicketSchema>
