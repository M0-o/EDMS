from uuid import uuid4
from pathlib import Path
from datetime import date
import shutil


def save_file_to_disc(student_id ,file ,document_type:str):
    file_type = file.content_type.split("/")[-1] or "misc"

    # resolve project root from this file’s location:
    project_root = Path(__file__).resolve().parents[1]
    
    # save in a folder with the path uploads/[filetype]/[type]/[student_id]/year/month/file
    upload_root   = project_root / "uploads"
    upload_folder = upload_root / file_type / document_type / str(student_id) / date.today().strftime("%Y/%m")
    upload_folder.mkdir(parents=True, exist_ok=True)

    ext      = Path(file.filename).suffix
    filename = f"{uuid4().hex}{ext}"
    dest     = upload_folder / filename

    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)

    relative_path = str(dest.relative_to(upload_root))
    return relative_path