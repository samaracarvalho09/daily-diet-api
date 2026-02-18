import { z } from "zod";

// Schema to create a new meal
export const createMealSchema = z.object({
  name: z.string().min(1, "O nome da refeição é obrigatório"),
  description: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
  isOnDiet: z.boolean()
});

// Schema to update a meal (all fields optional)
export const updateMealSchema = z.object({
  name: z.string().min(1, "O nome da refeição é obrigatório").optional(),
  description: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida").optional(),
  isOnDiet: z.boolean().optional()
});
