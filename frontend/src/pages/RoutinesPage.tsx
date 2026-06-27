import { useEffect, useState } from "react";
import { getRoutines, type RoutinesPage as RPage } from "../api/routines";
import { RoutineCard } from "../components/RoutineCard";

export function RoutinesPage() {
  const [data, setData] = useState<RPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoutines(1, 10).then(setData).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Routines</h1>
      {loading && <p className="text-gray-400">Loading...</p>}
      {data && (
        <div className="flex flex-col gap-3">
          {data.routines.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </div>
      )}
    </div>
  );
}
