from fastapi import APIRouter, Query
from app.hevy.client import HevyClient
from app.hevy.schemas import ExerciseTemplatesPage, ExerciseHistoryPage
from app.config import settings

router = APIRouter(prefix="/api", tags=["exercises"])


def get_hevy_client() -> HevyClient:
    return HevyClient(api_key=settings.hevy_api_key)


@router.get("/exercise_templates", response_model=ExerciseTemplatesPage)
async def list_exercise_templates(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=10),
):
    client = get_hevy_client()
    return await client.get_exercise_templates(page=page, page_size=page_size)


@router.get("/exercise_history/{template_id}", response_model=ExerciseHistoryPage)
async def get_exercise_history(
    template_id: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=10),
):
    client = get_hevy_client()
    return await client.get_exercise_history(template_id, page=page, page_size=page_size)
