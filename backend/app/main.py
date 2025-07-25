from fastapi import FastAPI
from app.routers import diplomas , students
# Import all model classes so SQLAlchemy can find relationships
from app.models.diploma import Diploma
from app.models.student import Student
from app.models.user import User
from app.models.document import DiplomaFile
from app.models.diploma_status import DiplomaStatus
from app.db import Base, engine

app = FastAPI()
app.include_router(diplomas.router, prefix="/diplomas", tags=["Diplomas"])
app.include_router(students.router , prefix="/students", tags=["Students"])

# Temporarily enable auto-create for fresh start
#Base.metadata.create_all(bind=engine)
