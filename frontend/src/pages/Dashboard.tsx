import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWorkouts, type Workout } from "../api/workouts";
import { getRoutines, type Routine } from "../api/routines";
import { WorkoutCard } from "../components/WorkoutCard";
import { APP_NAME } from "../config";

export function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getWorkouts(1, 5), getRoutines(1, 5)])
      .then(([wp, rp]) => {
        setWorkouts(wp.workouts);
        setRoutines(rp.routines);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome to {APP_NAME}</h1>
      <p className="text-gray-400 mb-8">Your personal workout command center.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Workouts</h2>
            <Link to="/workouts" className="text-yellow-400 text-sm hover:underline">View all →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Routines</h2>
            <Link to="/routines" className="text-yellow-400 text-sm hover:underline">View all →</Link>
          </div>
          <div className="flex flex-col gap-3">
            {routines.map((r) => (
              <Link
                key={r.id}
                to={`/routines/${r.id}`}
                className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{r.title}</span>
                  <span className="text-sm text-gray-400">{r.exercises.length} ex</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
        <p className="text-yellow-400 font-medium">✨ Try the AI Coach</p>
        <p className="text-gray-400 text-sm mt-1">Analyze your workouts or generate a new routine with Claude.</p>
        <Link to="/ai" className="mt-3 inline-block bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition-colors text-sm">
          Open AI Coach →
        </Link>
      </div>
    </div>
  );
}
