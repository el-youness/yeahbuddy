from __future__ import annotations
from pydantic import BaseModel
from typing import Optional


class Set(BaseModel):
    index: int
    type: str
    weight_kg: Optional[float] = None
    reps: Optional[int] = None
    distance_meters: Optional[float] = None
    duration_seconds: Optional[int] = None
    rpe: Optional[float] = None
    custom_metric: Optional[float] = None


class Exercise(BaseModel):
    index: int
    title: str
    notes: str = ""
    exercise_template_id: str
    supersets_id: Optional[int] = None
    sets: list[Set] = []


class Workout(BaseModel):
    id: str
    title: str
    routine_id: Optional[str] = None
    description: str = ""
    start_time: str
    end_time: str
    updated_at: str
    created_at: str
    exercises: list[Exercise] = []


class WorkoutsPage(BaseModel):
    page: int
    page_count: int
    workouts: list[Workout]


class RoutineSet(BaseModel):
    type: str
    weight_kg: Optional[float] = None
    reps: Optional[int] = None
    distance_meters: Optional[float] = None
    duration_seconds: Optional[int] = None
    custom_metric: Optional[float] = None
    rep_range: Optional[str] = None


class RoutineExercise(BaseModel):
    exercise_template_id: str
    superset_id: Optional[int] = None
    rest_seconds: Optional[int] = None
    notes: str = ""
    sets: list[RoutineSet] = []


class Routine(BaseModel):
    id: str
    title: str
    folder_id: Optional[str] = None
    updated_at: str
    created_at: str
    exercises: list[RoutineExercise] = []


class RoutinesPage(BaseModel):
    page: int
    page_count: int
    routines: list[Routine]


class ExerciseTemplate(BaseModel):
    id: str
    title: str
    type: str
    primary_muscle_group: str
    secondary_muscle_groups: list[str] = []
    is_custom: bool = False


class ExerciseTemplatesPage(BaseModel):
    page: int
    page_count: int
    exercise_templates: list[ExerciseTemplate]


class ExerciseHistoryEntry(BaseModel):
    workout_id: str
    workout_title: str
    workout_start_time: str
    workout_end_time: str
    exercise_template_id: str
    weight_kg: Optional[float] = None
    reps: Optional[int] = None
    distance_meters: Optional[float] = None
    duration_seconds: Optional[int] = None
    rpe: Optional[float] = None
    custom_metric: Optional[float] = None
    set_type: str


class ExerciseHistoryPage(BaseModel):
    page: int
    page_count: int
    history: list[ExerciseHistoryEntry]
