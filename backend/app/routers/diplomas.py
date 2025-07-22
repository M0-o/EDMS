from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.diploma import Diploma
from app.schemas import DiplomaCreate, DiplomaOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=DiplomaOut)
def create_diploma(diploma: DiplomaCreate, db: Session = Depends(get_db)):
    db_diploma = Diploma(**diploma.dict())
    db.add(db_diploma)
    db.commit()
    db.refresh(db_diploma)
    return db_diploma

@router.get("/", response_model=list[DiplomaOut])
def list_diplomas(db: Session = Depends(get_db)):
    return db.query(Diploma).all()
