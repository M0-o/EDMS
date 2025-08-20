from pydantic import BaseModel , HttpUrl
from datetime import datetime
from enum import Enum
from typing import Optional
from  app.models.document import DocumentTypeEnum

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
        from_attributes = True