import { apiFetch } from "./client";

export interface Set {
  index: number;
  type: string;
  weight_kg: number | null;
  reps: number | null;
  duration_seconds: number | null;
  rpe: number | null;
}

export interface Exercise {
  index: number;
  title: string;
  notes: string;
  exercise_template_id: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  title: string;
  routine_id: string | null;
  description: string;
  start_time: string;
  end_time: string;
  exercises: Exercise[];
}

export interface WorkoutsPage {
  page: number;
  page_count: number;
  workouts: Workout[];
}

export const getWorkouts = (page = 1, pageSize = 10) =>
  apiFetch<WorkoutsPage>(`/workouts?page=${page}&page_size=${pageSize}`);

export const getWorkout = (id: string) =>
  apiFetch<Workout>(`/workouts/${id}`);
