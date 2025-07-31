from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.schemas.diploma import DiplomaOut
# For creating students


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
    created_at: datetime
    
    class Config:
        from_attributes = True
