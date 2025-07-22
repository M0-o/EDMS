from sqlalchemy import Column, Integer, String, Date, Boolean
from app.db import Base

class Diploma(Base):
    __tablename__ = "diplomas"
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, nullable=False)
    institution = Column(String, nullable=False)
    hot_reload_test = Column(String )
    issue_date = Column(Date)
    is_valid = Column(Boolean, default=True)