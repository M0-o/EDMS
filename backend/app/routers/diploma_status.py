from fastapi import APIRouter, Depends, HTTPException
from app.models.diploma_status import DiplomaStatus
from app.db import SessionLocal
from app.schemas.diploma_status import DiplomaStatusOut
from sqlalchemy.orm import Session

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/",response_model= list[DiplomaStatusOut])
def list_diploma_status(db: Session = Depends(get_db)):
    return db.query(DiplomaStatus).all()

@router.get("/{diploma_id}", response_model=list[DiplomaStatusOut])
def get_diploma_status(diploma_id: int, db: Session = Depends(get_db)):
    statuses = db.query(DiplomaStatus).filter(DiplomaStatus.diploma_id == diploma_id).all()
    if not statuses:
        raise HTTPException(status_code=404, detail="Diploma status not found")
    return statuses