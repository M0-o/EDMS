from pydantic import BaseModel
from datetime import date

class DiplomaCreate(BaseModel):
    student_name: str
    institution: str
    issue_date: date

class DiplomaOut(DiplomaCreate):
    id: int
    is_valid: bool

    class Config:
        orm_mode = True
