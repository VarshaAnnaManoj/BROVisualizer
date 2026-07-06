import os

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///./backend_test.db")

from app.api import auth_routes
from app.main import app
from app.services.auth_service import AuthServiceError


client = TestClient(app)


@pytest.fixture(autouse=True)
def override_get_db() -> None:
    app.dependency_overrides[auth_routes.get_db] = lambda: object()
    yield
    app.dependency_overrides.clear()


def test_login_success(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        auth_routes.auth_service,
        "authenticate",
        lambda _db, user_id, password: user_id == "user" and password == "pass",
    )

    response = client.post("/api/auth/login", json={"user_id": "user", "password": "pass"})

    assert response.status_code == 200
    assert response.json() == {"success": True, "message": "Login successful."}


def test_login_invalid_credentials(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(auth_routes.auth_service, "authenticate", lambda _db, _user_id, _password: False)

    response = client.post("/api/auth/login", json={"user_id": "wrong", "password": "bad"})

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid user ID or password."


def test_login_payload_validation() -> None:
    response = client.post("/api/auth/login", json={"user_id": "user"})
    assert response.status_code == 422


def test_login_database_error(monkeypatch: pytest.MonkeyPatch) -> None:
    def raise_error(_db: object, _user_id: str, _password: str) -> bool:
        raise AuthServiceError("db unavailable")

    monkeypatch.setattr(auth_routes.auth_service, "authenticate", raise_error)

    response = client.post("/api/auth/login", json={"user_id": "user", "password": "pass"})

    assert response.status_code == 500
    assert response.json()["detail"] == "Authentication service unavailable."
