from fastapi import APIRouter, Query
from app.hevy.client import HevyClient
from app.hevy.schemas import WorkoutsPage, Workout
from app.config import settings

router = APIRouter(prefix="/api/workouts", tags=["workouts"])


def get_hevy_client() -> HevyClient:
    return HevyClient(api_key=settings.hevy_api_key, base_url=settings.hevy_base_url)


@router.get("", response_model=WorkoutsPage)
async def list_workouts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=10),
):
    client = get_hevy_client()
    return await client.get_workouts(page=page, page_size=page_size)


@router.get("/{workout_id}", response_model=Workout)
async def get_workout(workout_id: str):
    client = get_hevy_client()
    return await client.get_workout(workout_id)
