from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum
from app.models.diploma_status import StatusType 

# Base schema with common fields
class DiplomaStatusBase(BaseModel):
    status: StatusType
    reason: Optional[str] = None
    notes: Optional[str] = None
    

# For creating diploma status (this is how you "update" status - by creating a new record)
class DiplomaStatusCreate(DiplomaStatusBase):
    diploma_id: int
    

# For returning diploma status
class DiplomaStatusOut(DiplomaStatusBase):
    id: int
    diploma_id: int
    changed_by_clerk_user_id: str
    date: datetime
    
    class Config:
        from_attributes = True
