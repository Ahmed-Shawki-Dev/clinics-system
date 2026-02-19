import * as v from 'valibot'

// --- 1. Open Session Validation ---
export const OpenSessionSchema = v.object({
  doctorId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار الطبيب لتفعيل العيادة')),
  notes: v.optional(v.string()),
})

export type OpenSessionInput = v.InferInput<typeof OpenSessionSchema>

export const CutTicketSchema = v.object({
  sessionId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار العيادة')),
  patientId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار المريض')),
  doctorId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار الطبيب')),

  // الخدمة اختيارية عشان لو مش عايز يحددها دلوقتي
  doctorServiceId: v.optional(v.string()),

  isUrgent: v.boolean(),
  notes: v.optional(v.string()),
})

export type CutTicketInput = v.InferInput<typeof CutTicketSchema>
