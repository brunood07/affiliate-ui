import { z } from "zod"

const updateAffiliateFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(11),
})

type UpdateAffiliateFormType = z.infer<typeof updateAffiliateFormSchema>;

export { updateAffiliateFormSchema };
export type { UpdateAffiliateFormType };

