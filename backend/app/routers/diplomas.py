from fastapi import APIRouter, Depends , File, Form, UploadFile , Request , HTTPException   
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db import get_db
from app.models.diploma import Diploma
from app.schemas.diploma import DiplomaOut , DiplomaListOut
from datetime import date
from app.models.document import Document
from app.models.diploma_status import DiplomaStatus , StatusType
from app.auth import get_current_user
from urllib.parse import unquote_plus
from app.utils import save_file_to_disc

router = APIRouter()

@router.post("/", response_model=DiplomaOut)
async def create_diploma(
    student_id: int         = Form(...),
    title: str              = Form(...),
    institution: str        = Form(...),
    issue_date: date        = Form(...),
    file: UploadFile | None = File(None),
    user_id: str = Depends(get_current_user),
    db: Session             = Depends(get_db),
):
    # build your diploma and persist
    db_diploma = Diploma(
        student_id=student_id,
        title=title,
        institution=institution,
        issue_date=issue_date,
    )
    
    db.add(db_diploma)
    db.commit()
    db.refresh(db_diploma)

    # now handle the uploaded file if present
    if file:
        
        relative_path = save_file_to_disc(student_id, file, "diploma")
        #save document information to database
        db_document = Document(
            original_filename=file.filename,
            type="new_diploma",
            student_id=student_id,
            file_path=relative_path,
            uploaded_by_clerk_user_id=user_id,  
        )
        db_document.diploma = db_diploma  # Associate the document with the diploma
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
    
    db_diploma_status = DiplomaStatus(
        diploma_id=db_diploma.id,
        changed_by_clerk_user_id=user_id,
        status= StatusType.EN_ATTENTE.value ,  # Initial status
    )
    db.add(db_diploma_status)
    db.commit()
    db.refresh(db_diploma_status)

    return db_diploma

@router.get("/", response_model=list[DiplomaListOut])
def list_diplomas(request: Request, db: Session = Depends(get_db)):
    diplomas = db.query(Diploma).all()

    return diplomas

@router.get("/{diploma_id}", response_model=DiplomaOut)
def get_diploma(diploma_id: int, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.id == diploma_id).first()
    if not diploma:
        raise HTTPException(status_code=404, detail="Diploma not found")
    
    return diploma

@router.get("/status/{diploma_status}", response_model=list[DiplomaListOut])
def get_diplomas_by_status(diploma_status: str, db: Session = Depends(get_db)):
    decoded_uri_component = unquote_plus(diploma_status)
    
    latest_status_subq = (
        db.query(
            DiplomaStatus.diploma_id,
            func.max(DiplomaStatus.date).label('max_date')
        )
        .group_by(DiplomaStatus.diploma_id)
        .subquery()
    )
    
    # Join to get diplomas with the specific status
    diplomas = (
        db.query(Diploma)
        .join(DiplomaStatus, Diploma.id == DiplomaStatus.diploma_id)
        .join(
            latest_status_subq,
            (DiplomaStatus.diploma_id == latest_status_subq.c.diploma_id) &
            (DiplomaStatus.date == latest_status_subq.c.max_date)
        )
        .filter(DiplomaStatus.status == decoded_uri_component)
        .all()
    )
    return diplomas 