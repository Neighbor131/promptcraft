// src/App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import PromptCraftApp from "./PromptCraftApp.jsx";
import PromptBuilder from "./components/PromptBuilder.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0C0F]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-black font-bold">
              P
            </span>
            <span className="font-semibold">PromptCraft</span>
          </div>

          {/* Right-side nav */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
              }
            >
              Builder (Main)
            </NavLink>

            {/* NEW: Model Builder page */}
            <NavLink
              to="/model"
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm ${
                  isActive ? "bg-lime-400 text-black" : "bg-white/10 hover:bg-white/20"
                }`
              }
              title="E-commerce Model Prompt Builder"
            >
              Model Builder
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Routes */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<PromptCraftApp />} />
          <Route path="/model" element={<PromptBuilder />} />
        </Routes>
      </main>
    </div>
  );
}
