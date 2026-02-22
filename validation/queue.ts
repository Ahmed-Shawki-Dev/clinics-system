import * as v from 'valibot'

// --- 1. Open Session Validation ---
export const OpenSessionSchema = v.object({
  doctorId: v.pipe(v.string(), v.minLength(1, 'يجب اختيار الطبيب لتفعيل العيادة')),
  notes: v.optional(v.string()),
})

export const CutTicketSchema = v.object({
  sessionId: v.string('اختر العيادة'),
  patientId: v.string('اختر المريض'),
  doctorId: v.string('الطبيب مطلوب'),
  doctorServiceId: v.optional(v.string()),
  isUrgent: v.optional(v.boolean()),
  notes: v.optional(v.string()),
  paymentAmount: v.optional(v.number()),
  paymentMethod: v.optional(v.string()),
  paymentReference: v.optional(v.string()),
  paymentNotes: v.optional(v.string()),
})

export type CutTicketInput = v.InferInput<typeof CutTicketSchema>
