from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base
import enum 

class DocumentTypeEnum(str, enum.Enum):
    id_card           = "id_card"
    previous_diploma  = "previous_diploma"
    new_diploma       = "new_diploma"
    transcript        = "transcript"
    other             = "other"

class Document(Base):
    __tablename__ = "documents"

    id                = Column(Integer, primary_key=True, index=True)
    original_filename = Column(String(255), nullable=False)
    file_path         = Column(String(500), nullable=False)
    document_type     = Column(Enum(DocumentTypeEnum), nullable=False)

    # Relations
    student_id        = Column(Integer, ForeignKey("students.id"), nullable=False)
    diploma_id        = Column(Integer, ForeignKey("diplomas.id"), nullable=True)
    uploaded_by_id    = Column(Integer, ForeignKey("users.id"), nullable=False)

    uploaded_at       = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship(
        "Student",
        back_populates="documents",
        foreign_keys=[student_id]
    )
    diploma = relationship(
        "Diploma",
        back_populates="document",
        foreign_keys=[diploma_id]
    )
    uploaded_by       = relationship("User")