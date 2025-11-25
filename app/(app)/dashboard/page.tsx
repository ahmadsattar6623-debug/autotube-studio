"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type VideoStatus = "READY" | "GENERATING";

interface Video {
  id: string;
  title: string;
  status: VideoStatus;
  minutes: number;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  niche: string;
  defaultMinutes: number;
  videos: Video[];
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const now = new Date().toISOString();
    return [
      {
        id: "p1",
        name: "Nursing Home Stories",
        niche: "Emotional + Mystery Nursing Home",
        defaultMinutes: 30,
        videos: [
          {
            id: "v1",
            title: "The Nurse Who Hid Her Past from an Entire Nursing Home",
            status: "READY",
            minutes: 30,
            createdAt: now
          }
        ]
      }
    ];
  });

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectNiche, setNewProjectNiche] = useState("");

  const totalVideos = useMemo(
    () => projects.reduce((acc, p) => acc + p.videos.length, 0),
    [projects]
  );

  function createProject() {
    if (!newProjectName.trim()) return;
    const id = "p" + (projects.length + 1);
    const project: Project = {
      id,
      name: newProjectName.trim(),
      niche: newProjectNiche.trim() || "Custom niche",
      defaultMinutes: 20,
      videos: []
    };
    setProjects((prev) => [project, ...prev]);
    setNewProjectName("");
    setNewProjectNiche("");
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
          <p className="text-xs text-slate-400">
            Demo of your AI YouTube automation studio workspace.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-300 hover:text-emerald-400 underline underline-offset-4"
        >
          Back to landing
        </Link>
      </header>

      {/* Stats */}
      <section className="grid gap-3 md:grid-cols-3 text-sm">
        <StatCard label="Projects" value={projects.length} />
        <StatCard label="Videos" value={totalVideos} />
        <StatCard
          label="Sample niche"
          value="Nursing Home Emotional + Mystery"
        />
      </section>

      {/* New project form */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 text-sm">
        <h2 className="font-semibold">Create a new project</h2>
        <p className="text-xs text-slate-400">
          In the real SaaS, this would set your niche, language, voice style and
          duration defaults. Here we keep it simple for the demo.
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name (e.g. Abandoned Science Experiments)"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none focus:border-emerald-400"
          />
          <input
            value={newProjectNiche}
            onChange={(e) => setNewProjectNiche(e.target.value)}
            placeholder="Niche description"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none focus:border-emerald-400"
          />
          <button
            onClick={createProject}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Add project
          </button>
        </div>
      </section>

      {/* Projects list */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Projects</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-400 transition"
            >
              <div className="font-semibold">{p.name}</div>
              <div className="mt-1 text-xs text-slate-400">{p.niche}</div>
              <div className="mt-2 text-[11px] text-slate-500">
                {p.videos.length} video(s) • default {p.defaultMinutes} min
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}
