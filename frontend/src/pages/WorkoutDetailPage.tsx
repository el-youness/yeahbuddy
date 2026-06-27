import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWorkout, type Workout } from "../api/workouts";
import { SetTable } from "../components/SetTable";

function formatDuration(start: string, end: string) {
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
  return `${mins} min`;
}

export function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getWorkout(id).then(setWorkout).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!workout) return <p className="text-red-400">Workout not found.</p>;

  return (
    <div>
      <Link to="/workouts" className="text-yellow-400 text-sm mb-4 block hover:underline">
        ← Back to workouts
      </Link>
      <h1 className="text-2xl font-bold">{workout.title}</h1>
      <p className="text-gray-400 mt-1 mb-6">
        {new Date(workout.start_time).toLocaleString()} · {formatDuration(workout.start_time, workout.end_time)}
      </p>
      <div className="flex flex-col gap-6">
        {workout.exercises.map((ex) => (
          <div key={ex.index} className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">{ex.title}</h3>
            {ex.notes && <p className="text-sm text-gray-400 mb-3">{ex.notes}</p>}
            <SetTable sets={ex.sets} />
          </div>
        ))}
      </div>
    </div>
  );
}
