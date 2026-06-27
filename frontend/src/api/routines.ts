import { apiFetch } from "./client";

export interface RoutineSet {
  type: string;
  weight_kg: number | null;
  reps: number | null;
  rep_range: string | null;
}

export interface RoutineExercise {
  exercise_template_id: string;
  rest_seconds: number | null;
  notes: string;
  sets: RoutineSet[];
}

export interface Routine {
  id: string;
  title: string;
  folder_id: string | null;
  updated_at: string;
  exercises: RoutineExercise[];
}

export interface RoutinesPage {
  page: number;
  page_count: number;
  routines: Routine[];
}

export const getRoutines = (page = 1, pageSize = 10) =>
  apiFetch<RoutinesPage>(`/routines?page=${page}&page_size=${pageSize}`);

export const getRoutine = (id: string) =>
  apiFetch<Routine>(`/routines/${id}`);
