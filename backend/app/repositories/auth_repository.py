from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


class AuthRepositoryError(Exception):
    pass


class AuthRepository:
    def get_password_by_user_id(self, db: Session, user_id: str) -> str | None:
        try:
            row = db.execute(
                text(
                    """
                    SELECT password_hash
                    FROM public.login_users
                    WHERE CAST(user_id AS TEXT) = :user_id OR username = :user_id
                    LIMIT 1
                    """
                ),
                {"user_id": user_id},
            ).mappings().first()
        except SQLAlchemyError as exc:
            raise AuthRepositoryError("Login user lookup failed") from exc

        if row is None:
            return None

        password = row.get("password_hash")
        return None if password is None else str(password)
