"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Video {
  id: string;
  title: string;
  status: "READY" | "GENERATING";
  minutes: number;
  createdAt: string;
}

interface ProjectState {
  id: string;
  name: string;
  niche: string;
  defaultMinutes: number;
  videos: Video[];
}

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  const router = useRouter();
  const { projectId } = params;

  // In real app we'd fetch from API. Here we simulate just 1 built-in project + ephemeral new ones.
  const [project, setProject] = useState<ProjectState>(() => {
    const now = new Date().toISOString();
    if (projectId === "p1") {
      return {
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
      };
    }
    return {
      id: projectId || "custom",
      name: "Custom Project",
      niche: "Custom niche",
      defaultMinutes: 20,
      videos: []
    };
  });

  const [titleInput, setTitleInput] = useState("");
  const [minutesInput, setMinutesInput] = useState(project.defaultMinutes);

  function createVideo() {
    if (!titleInput.trim()) return;
    const id = "v" + (project.videos.length + 1);
    const createdAt = new Date().toISOString();
    const video: Video = {
      id,
      title: titleInput.trim(),
      status: "READY",
      minutes: minutesInput || project.defaultMinutes,
      createdAt
    };
    setProject((prev) => ({
      ...prev,
      videos: [video, ...prev.videos]
    }));
    setTitleInput("");
  }

  const humanId = useMemo(() => project.id, [project.id]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">{project.name}</h1>
          <p className="text-xs text-slate-400">
            Niche: {project.niche} • Default {project.defaultMinutes} minutes •
            ID: {humanId}
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-400"
          >
            Back to dashboard
          </button>
        </div>
      </header>

      {/* New video form */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 text-sm">
        <h2 className="font-semibold">Generate a new video (demo)</h2>
        <p className="text-xs text-slate-400">
          In the real SaaS this would trigger the AI pipeline (outline, script,
          SEO, thumbnails, voiceover MP3, chapters). Here we instantly create a
          READY video record so you can see the flow.
        </p>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Video title..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none focus:border-emerald-400"
          />
          <input
            type="number"
            value={minutesInput}
            onChange={(e) => setMinutesInput(Number(e.target.value))}
            className="w-28 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs outline-none focus:border-emerald-400"
          />
          <button
            onClick={createVideo}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Generate (demo)
          </button>
        </div>
      </section>

      {/* Videos */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Videos</h2>
        <div className="space-y-2 text-sm">
          {project.videos.map((v) => (
            <Link
              key={v.id}
              href={`/projects/${project.id}/videos/${v.id}`}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 hover:border-emerald-400"
            >
              <div>
                <div className="font-medium">{v.title}</div>
                <div className="text-[11px] text-slate-500">
                  {v.minutes} minutes •{" "}
                  {new Date(v.createdAt).toLocaleString()}
                </div>
              </div>
              <span
                className={`text-[11px] px-2 py-1 rounded-full ${
                  v.status === "READY"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {v.status}
              </span>
            </Link>
          ))}
          {project.videos.length === 0 && (
            <p className="text-xs text-slate-500">
              No videos yet. Create your first one above.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
