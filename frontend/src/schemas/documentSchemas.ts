

import { z } from "zod"
export const documentTypeEnum = z.enum([
  "id_card",
  "previous_diploma",
  "new_diploma",
  "transcript",
  "other"
])

export const documentSchemaCreate = z.object({
  original_filename: z.string(),
  type: documentTypeEnum,
  student_id: z.number().int().positive("Student ID must be a positive integer"),
  diploma_id: z.number().int().optional(),
})

export const documentSchemaOut = documentSchemaCreate.extend({
  id: z.number(),
  file_path: z.string(),
  download_url: z.string().url(),
  uploaded_by_clerk_user_id: z.string(),
  uploaded_at: z.string(),
})

