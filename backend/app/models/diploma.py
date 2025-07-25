from sqlalchemy import Column, Integer, String, Date, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base

class Diploma(Base):
    __tablename__ = "diplomas"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key to student
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    
    # Essential diploma information
    title = Column(String(200), nullable=False)  # Degree title
    institution = Column(String(200), nullable=False)
    issue_date = Column(Date, nullable=False)
    
    # Status
    is_valid = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
      # Relationships
    student = relationship("Student", back_populates="diplomas")
    files = relationship("DiplomaFile", back_populates="diploma")
    status_history = relationship("DiplomaStatus", back_populates="diploma")
    
    def __repr__(self):
        return f"<Diploma(id={self.id}, title='{self.title}', student_id={self.student_id})>"