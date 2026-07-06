from sqlalchemy.orm import Session

from app.repositories.auth_repository import AuthRepository, AuthRepositoryError


class AuthServiceError(Exception):
    pass


class AuthService:
    def __init__(self, repository: AuthRepository | None = None) -> None:
        self.repository = repository or AuthRepository()

    def authenticate(self, db: Session, user_id: str, password: str) -> bool:
        try:
            stored_password = self.repository.get_password_by_user_id(db, user_id)
        except AuthRepositoryError as exc:
            raise AuthServiceError("Authentication service unavailable") from exc

        if stored_password is None:
            return False

        return stored_password == password
