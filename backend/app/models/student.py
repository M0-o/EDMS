from sqlalchemy import Column, Integer, String, Date, Boolean, DateTime
from sqlalchemy.sql import func
from app.db import Base
from sqlalchemy.orm import relationship 

class Student(Base):
    __tablename__ = "students"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Essential information only
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    cne = Column(String(20), unique=True, nullable=False, index=True)  # National student ID
    apogee = Column(String(20), unique=True, nullable=False, index=True)  
    # Contact
    email = Column(String(100), unique=True, index=True)
    
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    diplomas = relationship("Diploma", back_populates="student", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="student", cascade="all, delete-orphan" )

    def __repr__(self):
        return f"<Student(id={self.id}, cne='{self.cne}', name='{self.full_name}')>"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


