from datetime import datetime

from sqlalchemy import DateTime, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base


class OntologyEvolution(Base):
    __tablename__ = "vw_br_ontology_evol_output"
    __table_args__ = {"schema": "public"}

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    input_ontology_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    input_ocr_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    input_prompt_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    output_ontology_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    output_ontology_result: Mapped[str | None] = mapped_column(Text, nullable=True)
    location: Mapped[str | None] = mapped_column(Text, nullable=True)
    ocr_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    change_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    change_type: Mapped[str | None] = mapped_column(Text, nullable=True)
    hierarchy_assessment: Mapped[str | None] = mapped_column(Text, nullable=True)
    validation_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    version: Mapped[str | None] = mapped_column(Text, nullable=True)
