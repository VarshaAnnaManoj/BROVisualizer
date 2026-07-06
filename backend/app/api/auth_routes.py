from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.auth_schema import LoginRequest, LoginResponse
from app.services.auth_service import AuthService, AuthServiceError

router = APIRouter(prefix="/api/auth", tags=["auth"])
auth_service = AuthService()


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    try:
        authenticated = auth_service.authenticate(db, payload.user_id, payload.password)
    except AuthServiceError as exc:
        raise HTTPException(status_code=500, detail="Authentication service unavailable.") from exc

    if not authenticated:
        raise HTTPException(status_code=401, detail="Invalid user ID or password.")

    return LoginResponse(success=True, message="Login successful.")
