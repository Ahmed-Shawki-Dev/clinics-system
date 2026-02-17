import * as v from 'valibot'

export const createInvoiceSchema = v.object({
  amount: v.pipe(
    v.number('المبلغ يجب أن يكون رقماً'),
    v.minValue(1, 'المبلغ يجب أن يكون أكبر من صفر'),
  ),
  notes: v.nullish(v.string()),
})

export type CreateInvoiceFormInput = v.InferInput<typeof createInvoiceSchema>

export const createPaymentSchema = v.object({
  amount: v.pipe(
    v.number('المبلغ يجب أن يكون رقماً'),
    v.minValue(1, 'المبلغ يجب أن يكون أكبر من صفر'),
  ),
  paymentMethod: v.pipe(v.string(), v.nonEmpty('طريقة الدفع مطلوبة')),
  referenceNumber: v.nullish(v.string()),
  notes: v.nullish(v.string()),
})

export type CreatePaymentFormInput = v.InferInput<typeof createPaymentSchema>
