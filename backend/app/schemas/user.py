from pydantic import BaseModel, EmailStr
from datetime import datetime

# For creating users
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    password: str

# For returning users
class UserOut(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    is_admin: bool
    created_at: datetime
    full_name: str
    
    class Config:
        from_attributes = True
