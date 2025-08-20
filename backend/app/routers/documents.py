from fastapi import APIRouter, Depends, File, Form, Request , UploadFile , HTTPException
from sqlalchemy.orm import Session 
from app.models.document import Document as DocModel , DocumentTypeEnum
from app.schemas.document import DocumentOut
from app.db import get_db
from app.auth import get_current_user
from app.utils import save_file_to_disc

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
        raise HTTPException(status_code=401, detail="User not authenticated")

   
    file_type_mapping = {
        "baccalaureat": DocumentTypeEnum.baccalaureat.value,
        "carteNationale": DocumentTypeEnum.carte_identite.value,
        "diplomeBac2": DocumentTypeEnum.diplome_bac2.value,
        "diplomeBac3": DocumentTypeEnum.diplome_bac3.value,
        "releveNotes": DocumentTypeEnum.releve_notes.value
    }

    files = {
        "baccalaureat": baccalaureat,
        "carteNationale": carteNationale,
        "diplomeBac2": diplomeBac2,
        "diplomeBac3": diplomeBac3,
        "releveNotes": releveNotes
    }
    created_docs = []
    
    # Process each file in the dictionary
    for doc_type, file in files.items():
        if file and file.filename:
            # Save the file and create a Document record
            file_path = save_file_to_disc(student_id ,file , file_type_mapping[doc_type])
            print(f"File saved at: {file_path}")
            doc = DocModel(
                student_id=student_id,
                type=file_type_mapping[doc_type],
                file_path=file_path,
                original_filename=file.filename,
                uploaded_by_clerk_user_id=user_id
            )
            db.add(doc)
            created_docs.append(doc)
    db.commit()
    for doc in created_docs:
        db.refresh(doc)

    return created_docs