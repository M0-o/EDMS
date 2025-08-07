from fastapi import FastAPI
from app.routers import diplomas , students , documents , diploma_status
# Import all model classes so SQLAlchemy can find relationships
from app.models.diploma import Diploma
from app.models.student import Student
from app.models.document import Document
from app.models.diploma_status import DiplomaStatus
from app.db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI()

origins = [
    "http://localhost:5173",    # your frontend origin
    # add more origins here, or use ["*"] to allow all
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],        # Authorization, Content-Type, etc.
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(diplomas.router, prefix="/diplomas", tags=["Diplomas"])
app.include_router(students.router , prefix="/students", tags=["Students"])
app.include_router(documents.router , prefix="/documents", tags=["Documents"])
app.include_router(diploma_status.router , prefix="/diploma_status", tags=["Diploma Status"])
# Auto-create tables (optional dev shortcut)
Base.metadata.create_all(bind=engine)
