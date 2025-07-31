from pydantic import BaseModel , HttpUrl
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
    document_type: DocumentTypeEnum
    student_id: int
    diploma_id: Optional[int] = None

class DocumentOut(BaseModel):
    id: int
    original_filename: str
    document_type: DocumentTypeEnum
    student_id: int
    diploma_id: Optional[int]
    relative_path: str                
    download_url: HttpUrl              
    uploaded_by_id: int
    uploaded_at: datetime

    class Config:
        from_attributes = True