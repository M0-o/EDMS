from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base
import enum

class StatusType(enum.Enum):
    PENDING = "pending"
    IN_REVIEW = "in_review"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"
    SUSPENDED = "suspended"

class DiplomaStatus(Base):
    __tablename__ = "diploma_statuses"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key to diploma
    diploma_id = Column(Integer, ForeignKey("diplomas.id"), nullable=False)
    
    # Foreign key to user who changed the status (admin/verifier)
    changed_by_clerk_user_id = Column( Text , nullable=False)
    
    # Status information
    status = Column(Enum(StatusType), nullable=False, default=StatusType.PENDING)
    previous_status = Column(Enum(StatusType), nullable=True)
    
    # Status details
    reason = Column(Text)  # Reason for status change
    notes = Column(Text)  # Additional notes

    
    # Timestamps
    date = Column(DateTime(timezone=True), server_default=func.now())
    
      # Relationships
    diploma = relationship("Diploma", back_populates="status_history")
       # Removed back_populates for MVP simplicity
    
    def __repr__(self):
        return f"<DiplomaStatus(id={self.id}, diploma_id={self.diploma_id}, status='{self.status.value}')>"
    