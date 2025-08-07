from fastapi import APIRouter, Depends , File, Form, UploadFile 
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.diploma import Diploma
from app.schemas.diploma import DiplomaOut
from datetime import date
import shutil
from uuid import uuid4
from pathlib import Path
from app.models.document import Document
from fastapi import Request, HTTPException
from authlib.jose import jwt
import requests
from app.models.diploma_status import DiplomaStatus , StatusType

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

CLERK_ISSUER = "https://epic-bat-34.clerk.accounts.dev"
JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"
AUDIENCE = "epic-bat-34.clerk.lcl.dev"


def verify_token(token: str):
    jwks = requests.get(JWKS_URL).json()  # Fetch JWK Set
    claims_options = {
        "iss": {
            "essential": True,
            "values": [CLERK_ISSUER]
        },
        "aud": {
            "essential": True,
            "values": [AUDIENCE]
        }
    }
    claims = jwt.decode(token, jwks, claims_options=claims_options)  # Decode JWT and validate claims
    return claims

async def get_current_user(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth.replace("Bearer ", "")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        claims = verify_token(token)
    except Exception as e:
        print("Token verification error:", e)
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return claims['sub']  # Return the user ID from the token payload

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
        # pick sub-folder by MIME subtype (e.g. “pdf”, “png”)
        file_type = file.content_type.split("/")[-1] or "misc"

        # resolve project root from this file’s location:
        project_root = Path(__file__).resolve().parents[2]
        
        # save in a folder with the path uploads/[filetype]/[document_type]/[student_id]/year/month/file
        upload_root   = project_root / "uploads"
        upload_folder = upload_root / file_type / "new_diploma" / str(student_id) / date.today().strftime("%Y/%m")
        upload_folder.mkdir(parents=True, exist_ok=True)

        ext      = Path(file.filename).suffix
        filename = f"{uuid4().hex}{ext}"
        dest     = upload_folder / filename

        with dest.open("wb") as out:
            shutil.copyfileobj(file.file, out)

        relative_path = str(dest.relative_to(upload_root))
        #save document information to database
        db_document = Document(
            original_filename=file.filename,
            document_type="new_diploma",
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

@router.get("/", response_model=list[DiplomaOut])
def list_diplomas(request: Request, db: Session = Depends(get_db)):
    diplomas = db.query(Diploma).all()
  

    return diplomas


