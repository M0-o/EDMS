from fastapi import FastAPI
from app.routers import diplomas
from app.models.diploma import Diploma
from app.db import Base, engine

app = FastAPI()
app.include_router(diplomas.router, prefix="/diplomas", tags=["Diplomas"])

# Auto-create tables (optional dev shortcut)
Base.metadata.create_all(bind=engine)
