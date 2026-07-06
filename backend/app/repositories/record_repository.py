from sqlalchemy.orm import Session

from app.models.record import Record
from app.schemas.record import RecordCreate


class RecordRepository:
    def list_records(self, db: Session) -> list[Record]:
        return db.query(Record).order_by(Record.id.desc()).all()

    def create_record(self, db: Session, payload: RecordCreate) -> Record:
        record = Record(title=payload.title, status=payload.status)
        db.add(record)
        db.commit()
        db.refresh(record)
        return record
