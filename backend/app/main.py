from fastapi import FastAPI
from app.routers import diplomas , students , documents , diploma_status
from app.db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import ssl 

load_dotenv() 
app = FastAPI()

origins = [
    "*"    # your frontend origin
    # add more origins here, or use ["*"] to allow all
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],        # Authorization, Content-Type, etc.
)

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

class DevStaticFiles(StaticFiles):
    def file_response(self , full_path , stat_result ,scope , status_code=200):
         response = super().file_response(full_path, stat_result, scope, status_code)
         response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
         return response
    
app.mount("/uploads", DevStaticFiles(directory="uploads"), name="uploads")

app.include_router(diplomas.router, prefix="/diplomas", tags=["Diplomas"])
app.include_router(students.router , prefix="/students", tags=["Students"])
app.include_router(documents.router , prefix="/documents", tags=["Documents"])
app.include_router(diploma_status.router , prefix="/diploma_status", tags=["Diploma Status"])
# Auto-create tables (optional dev shortcut)
Base.metadata.create_all(bind=engine)
