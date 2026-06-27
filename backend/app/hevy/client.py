import httpx
from app.hevy.schemas import (
    WorkoutsPage, Workout, RoutinesPage, Routine,
    ExerciseTemplatesPage, ExerciseHistoryPage,
)


class HevyClient:
    def __init__(self, api_key: str, base_url: str = "https://api.hevyapp.com"):
        self._headers = {"api-key": api_key}
        self._base = base_url

    async def get_workouts(self, page: int = 1, page_size: int = 10) -> WorkoutsPage:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/workouts",
                headers=self._headers,
                params={"page": page, "pageSize": min(page_size, 10)},
            )
            r.raise_for_status()
            return WorkoutsPage.model_validate(r.json())

    async def get_workout(self, workout_id: str) -> Workout:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/workouts/{workout_id}",
                headers=self._headers,
            )
            r.raise_for_status()
            return Workout.model_validate(r.json()["workout"])

    async def get_routines(self, page: int = 1, page_size: int = 10) -> RoutinesPage:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/routines",
                headers=self._headers,
                params={"page": page, "pageSize": min(page_size, 10)},
            )
            r.raise_for_status()
            return RoutinesPage.model_validate(r.json())

    async def get_routine(self, routine_id: str) -> Routine:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/routines/{routine_id}",
                headers=self._headers,
            )
            r.raise_for_status()
            return Routine.model_validate(r.json()["routine"])

    async def get_exercise_templates(self, page: int = 1, page_size: int = 10) -> ExerciseTemplatesPage:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/exercise_templates",
                headers=self._headers,
                params={"page": page, "pageSize": min(page_size, 10)},
            )
            r.raise_for_status()
            return ExerciseTemplatesPage.model_validate(r.json())

    async def get_exercise_history(
        self, template_id: str, page: int = 1, page_size: int = 10
    ) -> ExerciseHistoryPage:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self._base}/v1/exercise_history/{template_id}",
                headers=self._headers,
                params={"page": page, "pageSize": min(page_size, 10)},
            )
            r.raise_for_status()
            return ExerciseHistoryPage.model_validate(r.json())
