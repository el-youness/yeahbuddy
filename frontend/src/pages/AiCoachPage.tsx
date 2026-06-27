import { useState } from "react";
import { getWorkouts } from "../api/workouts";
import { analyzeWorkouts, createRoutine } from "../api/ai";

type Tab = "analyze" | "create";

export function AiCoachPage() {
  const [tab, setTab] = useState<Tab>("analyze");
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const [routinePrompt, setRoutinePrompt] = useState("");
  const [generatedRoutine, setGeneratedRoutine] = useState<string>("");
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState<string>("");

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalysis("");
    setError("");
    try {
      const page = await getWorkouts(1, 10);
      const result = await analyzeWorkouts(page.workouts);
      setAnalysis(result.analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleCreateRoutine() {
    if (!routinePrompt.trim()) return;
    setCreating(true);
    setGeneratedRoutine("");
    setError("");
    try {
      const routine = await createRoutine(routinePrompt, []);
      setGeneratedRoutine(JSON.stringify(routine, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">AI Coach</h1>

      <div className="flex gap-2 mb-8">
        {(["analyze", "create"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
              tab === t
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t === "analyze" ? "Analyze Workouts" : "Create Routine"}
          </button>
        ))}
      </div>

      {tab === "analyze" && (
        <div>
          <p className="text-gray-400 mb-4">
            Claude will analyze your last 10 workouts and give you actionable feedback.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded hover:bg-yellow-300 disabled:opacity-50 transition-colors"
          >
            {analyzing ? "Analyzing..." : "Analyze my workouts"}
          </button>
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
          {analysis && (
            <div className="mt-6 bg-gray-800 rounded-lg p-6 whitespace-pre-wrap text-gray-200 leading-relaxed">
              {analysis}
            </div>
          )}
        </div>
      )}

      {tab === "create" && (
        <div>
          <p className="text-gray-400 mb-4">
            Describe the routine you want and Claude will generate it as JSON ready to use.
          </p>
          <textarea
            value={routinePrompt}
            onChange={(e) => setRoutinePrompt(e.target.value)}
            placeholder="e.g. Create a 4-day upper/lower split for intermediate lifters focused on hypertrophy"
            className="w-full bg-gray-800 rounded-lg p-4 text-gray-200 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={handleCreateRoutine}
            disabled={creating || !routinePrompt.trim()}
            className="mt-3 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded hover:bg-yellow-300 disabled:opacity-50 transition-colors"
          >
            {creating ? "Generating..." : "Generate Routine"}
          </button>
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
          {generatedRoutine && (
            <div className="mt-6 bg-gray-800 rounded-lg p-4 overflow-auto">
              <pre className="text-green-400 text-xs">{generatedRoutine}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
