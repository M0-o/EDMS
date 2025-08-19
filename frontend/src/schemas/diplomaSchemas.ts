
import { z } from "zod"
import { documentSchemaOut } from "./documentSchemas"
import { diplomaStatusOutSchema } from "./diplomaStatusSchemas"

export const diplomaSchemaCreate = z.object({
  student_id: z.number().int().positive("Student ID must be a positive integer"),
  title: z.string().min(1, "Title is required"),
  institution: z.string().min(1, "Institution is required"),
  issue_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Issue date must be a valid date",
  }),
  file: z.instanceof(File).optional().refine((file) => file ? file.size <= 10 * 1024 * 1024 : true, {
      message: "File size must be less than 10MB",
  }),
})

export const diplomaSchemaOut = diplomaSchemaCreate.extend({
    id: z.number().int() ,
    document: documentSchemaOut.optional(),
    current_status: z.string().optional(),
    status_history: z.array(diplomaStatusOutSchema).optional(),
    is_valid: z.boolean(),
    created_at: z.string(),
})
 