from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import analyze_workouts, create_routine_from_prompt
from app.config import settings

router = APIRouter(prefix="/api/ai", tags=["ai"])

_NO_KEY_MSG = "Anthropic API key not configured. Add ANTHROPIC_API_KEY to backend/.env to use AI features."


def _require_ai_key() -> None:
    if not settings.anthropic_api_key:
        raise HTTPException(status_code=503, detail=_NO_KEY_MSG)


class AnalyzeRequest(BaseModel):
    workouts: list[dict]


class CreateRoutineRequest(BaseModel):
    prompt: str
    exercise_templates: list[dict]


@router.post("/analyze")
async def analyze(body: AnalyzeRequest):
    _require_ai_key()
    analysis = await analyze_workouts(body.workouts)
    return {"analysis": analysis}


@router.post("/create-routine")
async def create_routine(body: CreateRoutineRequest):
    _require_ai_key()
    try:
        routine = await create_routine_from_prompt(body.prompt, body.exercise_templates)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return routine
