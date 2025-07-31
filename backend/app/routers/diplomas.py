from fastapi import APIRouter, Depends , File, Form, UploadFile
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.diploma import Diploma
from app.schemas.diploma import DiplomaCreate, DiplomaOut
from datetime import date
import shutil
from uuid import uuid4
from pathlib import Path
from app.models.document import Document

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=DiplomaOut)
async def create_diploma(
    student_id: int         = Form(...),
    title: str              = Form(...),
    institution: str        = Form(...),
    issue_date: date        = Form(...),
    file: UploadFile | None = File(None),
    db: Session             = Depends(get_db),
):
    # build your diploma and persist
    db_diploma = Diploma(
      student_id=student_id,
      title=title,
      institution=institution,
      issue_date=issue_date,
    )
    

    # now handle the uploaded file if present
    if file:
        # pick sub-folder by MIME subtype (e.g. “pdf”, “png”)
        file_type = file.content_type.split("/")[-1] or "misc"

        # resolve project root from this file’s location:
        project_root = Path(__file__).resolve().parents[1]
        print(project_root)
        # save in a folder with the path uploads/[filetype]/[document_type]/[student_id]/year/month/file
        upload_folder = project_root / "uploads" / file_type / "new_diploma" / str(student_id) / date.today().strftime("%Y/%m")
        upload_folder.mkdir(parents=True, exist_ok=True)

        # generate unique filename, keep extension
        ext = Path(file.filename).suffix
        filename = f"{uuid4().hex}{ext}"
        dest = upload_folder / filename

        # stream to disk
        with dest.open("wb") as out:
            shutil.copyfileobj(file.file, out)

        #save document information to database
        db_document = Document(
            original_filename=file.filename,
            document_type="new_diploma",
            student_id=student_id,
            diploma_id=db_diploma.id,
            file_path=str(dest.relative_to(project_root)),
            uploaded_by_id=1,  # Assuming a static user ID for now

        )

        db_diploma.document_id = db_document.id 
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
       
    db.add(db_diploma)
    db.commit()
    db.refresh(db_diploma)

    return db_diploma

@router.get("/", response_model=list[DiplomaOut])
def list_diplomas(db: Session = Depends(get_db)):
    return db.query(Diploma).all()
