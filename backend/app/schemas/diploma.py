from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional 

# For creating diplomas
class DiplomaCreate(BaseModel):
    student_id: int
    title: str
    institution: str
    issue_date: date

# For returning diplomas
class DiplomaOut(BaseModel):
    id: int
    student_id: int
    title: str
    institution: str
    issue_date: date
    is_valid: bool
    document_id: Optional[int] 
    created_at: datetime

    class Config:
        from_attributes = True
