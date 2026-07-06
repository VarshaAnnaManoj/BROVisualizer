from fastapi import APIRouter, HTTPException

from app.db.session import can_connect

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/live")
def liveness() -> dict[str, str]:
    return {"status": "live"}


@router.get("/ready")
def readiness() -> dict[str, str]:
    ok, details = can_connect()
    if not ok:
        raise HTTPException(status_code=503, detail=f"database not ready: {details}")
    return {"status": "ready"}
