import { apiFetch } from "./client";
import type { Workout } from "./workouts";

export const analyzeWorkouts = (workouts: Workout[]) =>
  apiFetch<{ analysis: string }>("/ai/analyze", {
    method: "POST",
    body: JSON.stringify({ workouts }),
  });

export const createRoutine = (prompt: string, exerciseTemplates: unknown[]) =>
  apiFetch<{ title: string; exercises: unknown[] }>("/ai/create-routine", {
    method: "POST",
    body: JSON.stringify({ prompt, exercise_templates: exerciseTemplates }),
  });
