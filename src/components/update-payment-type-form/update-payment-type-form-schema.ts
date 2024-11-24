import { z } from "zod"

const updatePaymentTypeFormSchema = z.object({
  name: z.string().min(2).max(50),
  quantity: z.string().max(50),
  active: z.boolean(),
})

type UpdatePaymentTypeFormType = z.infer<typeof updatePaymentTypeFormSchema>;

export { updatePaymentTypeFormSchema };
export type { UpdatePaymentTypeFormType };