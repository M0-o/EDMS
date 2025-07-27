
import { z } from "zod"

export const diplomaSchemaCreate = z.object({
  student_id: z.number().int().positive("Student ID must be a positive integer"),
  title: z.string().min(1, "Title is required"),
  institution: z.string().min(1, "Institution is required"),
  issue_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Issue date must be a valid date",
  }),
})

export const diplomaSchemaOut = diplomaSchemaCreate.extend({
  id: z.number().int() ,
    is_valid: z.boolean(),
    created_at: z.string(),
})
 