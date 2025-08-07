from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.models.document import Document as DocModel
from app.schemas.document import DocumentOut
from app.db import SessionLocal

router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[DocumentOut])
def list_docs(request: Request, db: Session = Depends(get_db)):
    docs = db.query(DocModel).all()
  
    return docs