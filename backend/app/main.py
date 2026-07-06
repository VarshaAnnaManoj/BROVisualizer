from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.api.auth_routes import router as auth_router
from app.api.health_routes import router as health_router
from app.api.ontology_routes import router as ontology_router
from app.config.settings import get_settings
from app.database.connection import can_connect

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(ontology_router)
app.include_router(auth_router)


@app.on_event("startup")
def on_startup() -> None:
    ok, details = can_connect()
    if not ok:
        print(f"[startup] database connectivity check failed: {details}")

@app.get("/swagger", include_in_schema=False)
def swagger_redirect() -> RedirectResponse:
    return RedirectResponse(url="/docs")
