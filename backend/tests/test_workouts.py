import pytest
import respx
import httpx
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app.main import app
from app.hevy.schemas import WorkoutsPage, Workout, Exercise, Set


@pytest.fixture
def client():
    return TestClient(app)


def make_workout(id="w1", title="Push Day"):
    return {
        "id": id, "title": title, "routine_id": None, "description": "",
        "start_time": "2026-06-20T10:00:00Z", "end_time": "2026-06-20T11:00:00Z",
        "updated_at": "2026-06-20T11:00:00Z", "created_at": "2026-06-20T11:00:00Z",
        "exercises": [],
    }


def test_get_workouts(client):
    page = WorkoutsPage(page=1, page_count=1, workouts=[Workout(**make_workout())])
    with patch("app.routers.workouts.get_hevy_client") as mock_factory:
        mock_hevy = AsyncMock()
        mock_hevy.get_workouts.return_value = page
        mock_factory.return_value = mock_hevy
        r = client.get("/api/workouts")
    assert r.status_code == 200
    data = r.json()
    assert data["page"] == 1
    assert data["workouts"][0]["title"] == "Push Day"


def test_get_workout_by_id(client):
    workout = Workout(**make_workout())
    with patch("app.routers.workouts.get_hevy_client") as mock_factory:
        mock_hevy = AsyncMock()
        mock_hevy.get_workout.return_value = workout
        mock_factory.return_value = mock_hevy
        r = client.get("/api/workouts/w1")
    assert r.status_code == 200
    assert r.json()["id"] == "w1"
