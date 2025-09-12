from fastapi import APIRouter, Depends , HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentOut , StudentListOut
from sqlalchemy import or_

router = APIRouter()

@router.post("/", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    db_student = Student(**student.model_dump())
    existsCheck = db.query(Student).filter(or_(Student.cne == student.cne, Student.email == student.email, Student.apogee == student.apogee)).first()
    if existsCheck:
        raise HTTPException(status_code=400, detail="Student with this CNE, email or Apogee already exists")
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@router.get("/", response_model=list[StudentListOut])
def list_students(db: Session = Depends(get_db)):
    result = db.query(Student).all()
    return result

@router.get("/{student_id}", response_model=StudentOut )
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.get("/{student_id}/minimal")
def get_student_minimal(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return {
        "id": student.id,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "email": student.email
   }

@router.delete("/{student_id}", response_model=StudentOut)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(student)
    db.commit()
    return student

