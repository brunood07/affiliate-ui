import { z } from "zod"

const addPaymentTypeFormSchema = z.object({
  name: z.string().min(2).max(50),
  quantity: z.string().max(50),
  active: z.boolean(),
})

type AddPaymentTypeFormType = z.infer<typeof addPaymentTypeFormSchema>;

export { addPaymentTypeFormSchema };
export type { AddPaymentTypeFormType };