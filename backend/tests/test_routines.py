import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app.main import app
from app.hevy.schemas import RoutinesPage, Routine


@pytest.fixture
def client():
    return TestClient(app)


def make_routine(id="r1", title="Push A"):
    return {
        "id": id, "title": title, "folder_id": None,
        "updated_at": "2026-06-01T00:00:00Z",
        "created_at": "2026-06-01T00:00:00Z",
        "exercises": [],
    }


def test_get_routines(client):
    page = RoutinesPage(page=1, page_count=1, routines=[Routine(**make_routine())])
    with patch("app.routers.routines.get_hevy_client") as mock_factory:
        mock_hevy = AsyncMock()
        mock_hevy.get_routines.return_value = page
        mock_factory.return_value = mock_hevy
        r = client.get("/api/routines")
    assert r.status_code == 200
    assert r.json()["routines"][0]["title"] == "Push A"


def test_get_routine_by_id(client):
    routine = Routine(**make_routine())
    with patch("app.routers.routines.get_hevy_client") as mock_factory:
        mock_hevy = AsyncMock()
        mock_hevy.get_routine.return_value = routine
        mock_factory.return_value = mock_hevy
        r = client.get("/api/routines/r1")
    assert r.status_code == 200
    assert r.json()["id"] == "r1"
