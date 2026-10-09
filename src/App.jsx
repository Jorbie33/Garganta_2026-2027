import { useState } from "react";
import { Outlet, useNavigate } from "react-router";


export default function App() {
  const nav = useNavigate();
 

  return (
    <main className="min-h-screen bg-white text-slate-800">
      

      <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <h1 className="text-lg font-bold uppercase tracking-[0.2em] text-slate-800">
            My Portfolio
          </h1>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <button onClick={() => nav("/")} className="px-3 py-2 text-slate-700 hover:text-slate-900">
              Dashboard
            </button>
            <button onClick={() => nav("/dashboard")} className="px-3 py-2 text-slate-700 hover:text-slate-900">
              About Me
            </button>
            <button onClick={() => nav("/hobby/1")} className="px-3 py-2 text-slate-700 hover:text-slate-900">
              Guitar
            </button>
            <button onClick={() => nav("/hobby/2")} className="px-3 py-2 text-slate-700 hover:text-slate-900">
              Drums
            </button>
            <button onClick={() => nav("/hobby/3")} className="px-3 py-2 text-slate-700 hover:text-slate-900">
              Bass
            </button>
          </nav>
        </div>
      </header>

      <Outlet />
    </main>
  );
}
