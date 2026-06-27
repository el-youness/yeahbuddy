import { useEffect, useState } from "react";
import { getWorkouts, type WorkoutsPage as WPage } from "../api/workouts";
import { WorkoutCard } from "../components/WorkoutCard";

export function WorkoutsPage() {
  const [data, setData] = useState<WPage | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWorkouts(page).then(setData).finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Workouts</h1>
      {loading && <p className="text-gray-400">Loading...</p>}
      {data && (
        <>
          <div className="flex flex-col gap-3">
            {data.workouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
          <div className="flex gap-4 mt-6 items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40 hover:bg-gray-600"
            >
              Previous
            </button>
            <span className="text-gray-400">Page {data.page} of {data.page_count}</span>
            <button
              onClick={() => setPage((p) => Math.min(data.page_count, p + 1))}
              disabled={page === data.page_count}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40 hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
