from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import analyze_workouts, create_routine_from_prompt

router = APIRouter(prefix="/api/ai", tags=["ai"])


class AnalyzeRequest(BaseModel):
    workouts: list[dict]


class CreateRoutineRequest(BaseModel):
    prompt: str
    exercise_templates: list[dict]


@router.post("/analyze")
async def analyze(body: AnalyzeRequest):
    analysis = await analyze_workouts(body.workouts)
    return {"analysis": analysis}


@router.post("/create-routine")
async def create_routine(body: CreateRoutineRequest):
    routine = await create_routine_from_prompt(body.prompt, body.exercise_templates)
    return routine
