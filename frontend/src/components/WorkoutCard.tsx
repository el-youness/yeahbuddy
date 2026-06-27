import { Link } from "react-router-dom";
import type { Workout } from "../api/workouts";

function formatDuration(start: string, end: string) {
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
  return `${mins}m`;
}

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      to={`/workouts/${workout.id}`}
      className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{workout.title}</h3>
          <p className="text-sm text-gray-400 mt-1">
            {new Date(workout.start_time).toLocaleDateString()} · {formatDuration(workout.start_time, workout.end_time)}
          </p>
        </div>
        <span className="text-sm text-gray-400">{workout.exercises.length} exercises</span>
      </div>
    </Link>
  );
}
