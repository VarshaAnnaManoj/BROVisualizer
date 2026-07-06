from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.record_repository import RecordRepository
from app.schemas.record import RecordCreate, RecordRead

router = APIRouter(prefix="/records", tags=["records"])
repository = RecordRepository()


@router.get("", response_model=list[RecordRead])
def list_records(db: Session = Depends(get_db)):
    return repository.list_records(db)


@router.post("", response_model=RecordRead)
def create_record(payload: RecordCreate, db: Session = Depends(get_db)):
    return repository.create_record(db, payload)
