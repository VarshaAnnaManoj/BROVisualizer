from datetime import datetime

from pydantic import BaseModel


class RecordCreate(BaseModel):
    title: str
    status: str = "active"


class RecordRead(BaseModel):
    id: int
    title: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
