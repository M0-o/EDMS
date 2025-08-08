from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.schemas.diploma import DiplomaOut
from app.schemas.document import DocumentOut


class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    cne: str
    apogee: str
    email: Optional[EmailStr] = None

# For returning students
class StudentOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    cne: str
    apogee: str
    email: Optional[str] = None
    diplomas: Optional[list[DiplomaOut]] = None  
    id_documents: Optional[list[DocumentOut]] = None
    created_at: datetime

    
    class Config:
        from_attributes = True

class StudentListOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    cne: str
    apogee: str
    email: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
