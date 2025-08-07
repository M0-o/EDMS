from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum as SQLEnum , text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db import Base
import enum

class StatusType(enum.Enum):
    EN_ATTENTE = "en attente"
    ENVOYE_A_LA_PRESIDENCE = "envoyé à la présidence"
    ARRIVE_A_LA_PRESIDENCE = "arrivé à la présidence"
    ENVOYE_A_L_ETABLISSEMENT = "envoyé à l'établissement"
    ARRIVE_A_L_ETABLISSEMENT = "arrivé à l'établissement"
    CORRECTION_REQUISE = "correction requise"
    RENVOYE_APRES_CORRECTION = "renvoyé après correction"
    SIGNE_PAR_PRESIDENT = "signé par le président" 
    PRET = "prêt"
    DELIVRE = "délivré"


class DiplomaStatus(Base):
    __tablename__ = "diploma_statuses"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key to diploma
    diploma_id = Column(Integer, ForeignKey("diplomas.id"), nullable=False)
    
    # Foreign key to user who changed the status (admin/verifier)
    changed_by_clerk_user_id = Column( Text , nullable=False)
    
    # Status information
    status = Column(
        SQLEnum(
            StatusType,
            name="statustype",               # your existing PG type
            native_enum=True,               # use a native PG enum
            create_type=False,              # don’t try to CREATE it again
            values_callable=lambda ev: [e.value for e in ev],
        ),
        nullable=False,
        server_default=text("'en attente'"),  # match one of the enum values
    )

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
    