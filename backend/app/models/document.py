from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base

class DiplomaFile(Base):
    __tablename__ = "diploma_files"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # File information (minimal)
    original_filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    
    # Foreign keys
    diploma_id = Column(Integer, ForeignKey("diplomas.id"), nullable=False)
    uploaded_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    diploma = relationship("Diploma", back_populates="files")
    uploaded_by = relationship("User")