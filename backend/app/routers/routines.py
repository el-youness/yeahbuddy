from fastapi import APIRouter, Query
from app.hevy.client import HevyClient
from app.hevy.schemas import RoutinesPage, Routine
from app.config import settings

router = APIRouter(prefix="/api/routines", tags=["routines"])


def get_hevy_client() -> HevyClient:
    return HevyClient(api_key=settings.hevy_api_key, base_url=settings.hevy_base_url)


@router.get("", response_model=RoutinesPage)
async def list_routines(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=10),
):
    client = get_hevy_client()
    return await client.get_routines(page=page, page_size=page_size)


@router.get("/{routine_id}", response_model=Routine)
async def get_routine(routine_id: str):
    client = get_hevy_client()
    return await client.get_routine(routine_id)
