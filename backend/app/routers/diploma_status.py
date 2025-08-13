from fastapi import APIRouter, Depends, HTTPException
from app.models.diploma_status import DiplomaStatus
from app.db import get_db
from app.schemas.diploma_status import DiplomaStatusCreate , DiplomaStatusOut
from sqlalchemy.orm import Session
from app.auth import get_current_user

router = APIRouter()

@router.get("/",response_model= list[DiplomaStatusOut])
def list_diploma_status(db: Session = Depends(get_db)):
    return db.query(DiplomaStatus).all()

@router.get("/{diploma_id}", response_model=list[DiplomaStatusOut])
def get_diploma_status(diploma_id: int, db: Session = Depends(get_db)):
    statuses = db.query(DiplomaStatus).filter(DiplomaStatus.diploma_id == diploma_id).all()
    if not statuses:
        raise HTTPException(status_code=404, detail="Diploma status not found")
    return statuses

@router.post("/{diploma_id}", response_model=DiplomaStatusOut)
def update_diploma_status(diploma_status: DiplomaStatusCreate, user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    new_db_status = DiplomaStatus(**diploma_status.model_dump(), changed_by_clerk_user_id=user_id)
    db.add(new_db_status)
    db.commit()
    db.refresh(new_db_status)
    return new_db_status
