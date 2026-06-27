import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { WorkoutDetailPage } from "./pages/WorkoutDetailPage";
import { RoutinesPage } from "./pages/RoutinesPage";
import { RoutineDetailPage } from "./pages/RoutineDetailPage";
import { AiCoachPage } from "./pages/AiCoachPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
            <Route path="/routines" element={<RoutinesPage />} />
            <Route path="/routines/:id" element={<RoutineDetailPage />} />
            <Route path="/ai" element={<AiCoachPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
