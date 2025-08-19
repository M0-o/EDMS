from fastapi import APIRouter, Depends, File, Form, Request , UploadFile 
from sqlalchemy.orm import Session 
from app.models.document import Document as DocModel
from app.schemas.document import DocumentOut
from app.db import get_db
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=list[DocumentOut])
def list_docs(request: Request, db: Session = Depends(get_db)):
    docs = db.query(DocModel).all()
  
    return docs

@router.post("/", response_model=list[DocumentOut])
def add_verification_docs( student_id: int = Form(...),
                           baccalaureat: UploadFile | None = File(None),
                           carteNationale: UploadFile | None = File(None),
                           diplomeBac2: UploadFile | None = File(None),
                           diplomeBac3: UploadFile | None = File(None),
                           releveNotes: UploadFile | None = File(None),
                           db: Session = Depends(get_db),
                           user_id = Depends(get_current_user)):
    if not user_id:
        return {"error": "User not authenticated"}, 401

    # Process the uploaded files and save them to the database
    # You can access the files using the variable names defined in the function parameters
    # For example, to save the baccalaureat file:
    if baccalaureat:
        # Save the file and create a Document record in the database
        pass

    return {"message": "Documents uploaded successfully"}