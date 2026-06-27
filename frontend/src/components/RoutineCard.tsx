import { Link } from "react-router-dom";
import type { Routine } from "../api/routines";

export function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <Link
      to={`/routines/${routine.id}`}
      className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">{routine.title}</h3>
        <span className="text-sm text-gray-400">{routine.exercises.length} exercises</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Updated {new Date(routine.updated_at).toLocaleDateString()}
      </p>
    </Link>
  );
}
