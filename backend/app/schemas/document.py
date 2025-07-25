from pydantic import BaseModel
from datetime import datetime

# For creating diploma files
class DiplomaFileCreate(BaseModel):
    original_filename: str

# For returning diploma files
class DiplomaFileOut(BaseModel):
    id: int
    original_filename: str
    diploma_id: int
    uploaded_by_id: int
    uploaded_at: datetime
    
    class Config:
        from_attributes = True
