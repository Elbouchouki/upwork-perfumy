import { z } from "zod";

export const priceRangeSchema = z.object({
  id: z.string(),
  min: z.number().nullable(),
  max: z.number().nullable(),
})

export type PriceRange = z.infer<typeof priceRangeSchema>