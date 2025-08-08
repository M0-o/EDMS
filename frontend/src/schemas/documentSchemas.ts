/* from pydantic import BaseModel , HttpUrl
from datetime import datetime
from enum import Enum
from typing import Optional

class DocumentTypeEnum(str, Enum):
    id_card           = "id_card"
    previous_diploma  = "previous_diploma"
    new_diploma       = "new_diploma"
    transcript        = "transcript"
    other             = "other"

class DocumentCreate(BaseModel):
    original_filename: str
    type: DocumentTypeEnum
    student_id: int
    diploma_id: Optional[int] = None

class DocumentOut(BaseModel):
    id: int
    original_filename: str
    type: DocumentTypeEnum
    student_id: int
    diploma_id: Optional[int]
    file_path: str
    download_url: HttpUrl
    uploaded_by_clerk_user_id: str
    uploaded_at: datetime

    class Config:
        from_attributes = True */

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

