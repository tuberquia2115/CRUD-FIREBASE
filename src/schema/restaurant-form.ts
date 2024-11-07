import * as z from "zod";

export const restaurantFormSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }),
  isActive: z.boolean().default(false),
});
