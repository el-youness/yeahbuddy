import type { Set } from "../api/workouts";

export function SetTable({ sets }: { sets: Set[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-400 border-b border-gray-700">
          <th className="pb-1 pr-4">#</th>
          <th className="pb-1 pr-4">Weight</th>
          <th className="pb-1 pr-4">Reps</th>
          <th className="pb-1">RPE</th>
        </tr>
      </thead>
      <tbody>
        {sets.map((set) => (
          <tr key={set.index} className="border-b border-gray-800">
            <td className="py-1 pr-4 text-gray-400">{set.index + 1}</td>
            <td className="py-1 pr-4">{set.weight_kg != null ? `${set.weight_kg}kg` : "—"}</td>
            <td className="py-1 pr-4">{set.reps ?? "—"}</td>
            <td className="py-1">{set.rpe != null ? set.rpe : "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
