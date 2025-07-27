import { z } from "zod"

export const studentSchemaCreate = z.object({
  first_name: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  cne: z
    .string()
    .min(1, "CNE is required")
    .regex(/^[A-Z]\d{9}$/, "CNE must be in format: A123456789"),
  apogee: z
    .string()
    .min(1, "Apogee is required")
    .regex(/^\d{8}$/, "Apogee must be 8 digits"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
})

export const studentSchemaOut = studentSchemaCreate.extend({
  id: z.number(),
  created_at: z.string(),
})


