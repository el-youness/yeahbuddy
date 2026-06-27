import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRoutine, type Routine } from "../api/routines";

export function RoutineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getRoutine(id).then(setRoutine).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!routine) return <p className="text-red-400">Routine not found.</p>;

  return (
    <div>
      <Link to="/routines" className="text-yellow-400 text-sm mb-4 block hover:underline">
        ← Back to routines
      </Link>
      <h1 className="text-2xl font-bold mb-6">{routine.title}</h1>
      <div className="flex flex-col gap-4">
        {routine.exercises.map((ex, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm text-gray-300">{ex.exercise_template_id}</p>
              {ex.rest_seconds && (
                <span className="text-xs text-gray-500">{ex.rest_seconds}s rest</span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {ex.sets.map((set, j) => (
                <span
                  key={j}
                  className="text-xs bg-gray-700 rounded px-2 py-1 text-gray-300"
                >
                  {set.rep_range ?? set.reps ?? "—"} reps
                  {set.weight_kg ? ` @ ${set.weight_kg}kg` : ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
