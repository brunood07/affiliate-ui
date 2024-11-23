import * as z from "zod"

export const addPaymentFormSchema = z.object({
  paymentTypeId: z.string().min(1, "Payment type is required")
})

export type AddPaymentFormType = z.infer<typeof addPaymentFormSchema>
