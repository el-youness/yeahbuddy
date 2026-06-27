import pytest
import respx
import httpx
from app.hevy.client import HevyClient
from app.hevy.schemas import WorkoutsPage, Workout


@pytest.fixture
def client():
    return HevyClient(api_key="test-key", base_url="https://api.hevyapp.com")


@respx.mock
async def test_get_workouts_returns_page(client):
    respx.get("https://api.hevyapp.com/v1/workouts").mock(
        return_value=httpx.Response(200, json={
            "page": 1,
            "page_count": 2,
            "workouts": [
                {
                    "id": "abc123",
                    "title": "Push Day",
                    "routine_id": None,
                    "description": "",
                    "start_time": "2026-06-20T10:00:00Z",
                    "end_time": "2026-06-20T11:00:00Z",
                    "updated_at": "2026-06-20T11:00:00Z",
                    "created_at": "2026-06-20T11:00:00Z",
                    "exercises": [],
                }
            ],
        })
    )
    page = await client.get_workouts(page=1, page_size=5)
    assert isinstance(page, WorkoutsPage)
    assert page.page == 1
    assert page.page_count == 2
    assert len(page.workouts) == 1
    assert page.workouts[0].title == "Push Day"


@respx.mock
async def test_get_routine_returns_routine(hevy_client):
    respx.get("https://api.hevyapp.com/v1/routines/r1").mock(
        return_value=httpx.Response(200, json={
            "routine": {
                "id": "r1",
                "title": "Push A",
                "folder_id": None,
                "updated_at": "2026-06-01T00:00:00Z",
                "created_at": "2026-06-01T00:00:00Z",
                "exercises": [],
            }
        })
    )
    routine = await hevy_client.get_routine("r1")
    assert routine.title == "Push A"
