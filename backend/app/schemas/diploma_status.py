from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

# StatusType enum for use in schemas
class StatusType(str, Enum):
    PENDING = "pending"
    IN_REVIEW = "in_review"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"
    SUSPENDED = "suspended"

# Base schema with common fields
class DiplomaStatusBase(BaseModel):
    status: StatusType
    reason: Optional[str] = None
    notes: Optional[str] = None
    verification_code: Optional[str] = None

# For creating diploma status (this is how you "update" status - by creating a new record)
class DiplomaStatusCreate(DiplomaStatusBase):
    diploma_id: int
    # changed_by_user_id will be set from the authenticated user context

# For returning diploma status
class DiplomaStatusOut(DiplomaStatusBase):
    id: int
    diploma_id: int
    changed_by_clerk_user_id: int
    previous_status: Optional[StatusType] = None
    date: datetime
    
    class Config:
        from_attributes = True
