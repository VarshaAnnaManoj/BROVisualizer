# Backend Service (FastAPI + PostgreSQL)

## Prerequisites

- Python 3.11+
- PostgreSQL instance

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Create `.env` from `.env.example`.
4. Set `DATABASE_URL` in `.env`.

## Run

- Start API server:
  - `uvicorn app.main:app --reload --host 0.0.0.0 --port 6671`

## Health Endpoints

- Liveness: `GET /api/v1/health/live`
- Readiness: `GET /api/v1/health/ready`

## Notes

- Database credentials must be supplied through environment variables.
- Do not hardcode secrets in source files.

## Security Note (Temporary)

- Current login validation compares submitted password with `login_users.password` directly.
- If `login_users.password` stores plaintext values, this is suitable only for temporary/internal use.
- Recommended follow-up: store password hashes and verify using a secure hash algorithm with rate limiting.

## Rollback Guide

- If the ontology source-view rollout causes issues, revert the mapping in `app/models/ontology_model.py` to the previous relation and redeploy.
- Re-run ontology endpoint smoke checks after rollback to confirm service recovery.
