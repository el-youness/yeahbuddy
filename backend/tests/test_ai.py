import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_analyze_workouts(client):
    with patch("app.routers.ai.analyze_workouts", new_callable=AsyncMock) as mock_analyze:
        mock_analyze.return_value = "You trained chest 3x this week. Consider adding more pull work."
        r = client.post("/api/ai/analyze", json={"workouts": []})
    assert r.status_code == 200
    assert "analysis" in r.json()


def test_create_routine(client):
    expected_routine = {
        "title": "Push Day A",
        "folder_id": None,
        "exercises": [],
    }
    with patch("app.routers.ai.create_routine_from_prompt", new_callable=AsyncMock) as mock_create:
        mock_create.return_value = expected_routine
        r = client.post("/api/ai/create-routine", json={
            "prompt": "Create a push day for intermediate lifters",
            "exercise_templates": [],
        })
    assert r.status_code == 200
    assert r.json()["title"] == "Push Day A"
