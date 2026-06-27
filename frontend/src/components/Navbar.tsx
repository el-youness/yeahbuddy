import { Link } from "react-router-dom";
import { APP_NAME } from "../config";

export function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center gap-8">
      <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
      <Link to="/" className="hover:text-yellow-400 transition-colors">Dashboard</Link>
      <Link to="/workouts" className="hover:text-yellow-400 transition-colors">Workouts</Link>
      <Link to="/routines" className="hover:text-yellow-400 transition-colors">Routines</Link>
      <Link to="/ai" className="hover:text-yellow-400 transition-colors">AI Coach</Link>
    </nav>
  );
}
