from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.ontology_model import OntologyEvolution


class OntologyRepository:
    def get_ontology_by_id(self, db: Session, ontology_id: int) -> OntologyEvolution | None:
        try:
            return db.get(OntologyEvolution, ontology_id)
        except SQLAlchemyError:
            return None

    def get_ontology_by_id_and_version(
        self,
        db: Session,
        ontology_id: int,
        version: str,
    ) -> OntologyEvolution | None:
        try:
            stmt = select(OntologyEvolution).where(
                OntologyEvolution.id == ontology_id,
                OntologyEvolution.version == version,
            )
            return db.execute(stmt).scalar_one_or_none()
        except SQLAlchemyError:
            return None

    def get_metadata(self, db: Session, ontology_id: int) -> OntologyEvolution | None:
        return self.get_ontology_by_id(db, ontology_id)

    def get_metadata_by_id_and_version(
        self,
        db: Session,
        ontology_id: int,
        version: str,
    ) -> OntologyEvolution | None:
        return self.get_ontology_by_id_and_version(db, ontology_id, version)
