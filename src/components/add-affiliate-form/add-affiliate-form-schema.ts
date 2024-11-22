import { z } from "zod"

const addAffiliateFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phoneNumber: z.string().min(10).max(11),
})

type addAffiliateFormType = z.infer<typeof addAffiliateFormSchema>;

export { addAffiliateFormSchema };
export type { addAffiliateFormType };

