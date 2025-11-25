"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface VideoViewModel {
  id: string;
  title: string;
  minutes: number;
  status: "READY" | "GENERATING";
  script: string;
  description: string;
  tags: string[];
  chapters: { title: string; time: string }[];
}

export default function VideoDetailPage() {
  const params = useParams<{
    projectId: string;
    videoId: string;
  }>();
  const router = useRouter();
  const [video, setVideo] = useState<VideoViewModel | null>(null);

  useEffect(() => {
    const { projectId, videoId } = params;

    // Demo data. In real app we'd fetch from API by IDs.
    if (projectId === "p1" && videoId === "v1") {
      const baseTitle =
        "The Nurse Who Hid Her Past from an Entire Nursing Home";
      setVideo({
        id: "v1",
        title: baseTitle,
        minutes: 30,
        status: "READY",
        script:
          "Narrator: In a quiet corner of the nursing home, between the humming lights and the ticking clocks, Nurse Evelyn carried a past she hoped no one would ever discover...\n\n[Demo script only — real app would generate full 20–40 minute script via AI.]",
        description:
          "In this emotional nursing home story, we follow Nurse Evelyn — a calm professional on the outside, but hiding a history that could change everything for her patients.",
        tags: [
          "nursing home story",
          "emotional story",
          "nurse secret",
          "elderly care",
          "sad story"
        ],
        chapters: [
          { title: "Cold open — the quiet shift", time: "00:00" },
          { title: "A new resident arrives", time: "03:10" },
          { title: "Suspicious familiarity", time: "08:40" },
          { title: "The hidden file", time: "14:05" },
          { title: "The confrontation", time: "23:30" },
          { title: "Bitter truth & soft forgiveness", time: "28:55" }
        ]
      });
    } else {
      setVideo({
        id: (params.videoId as string) || "v-demo",
        title: "Demo AI-generated video",
        minutes: 20,
        status: "READY",
        script:
          "Narrator: This is a demo script block. In the real AutoTube Studio, your full AI-generated script would appear here based on your niche, title and runtime.",
        description:
          "Demo description — the real system would build SEO-optimized descriptions around your title and audience.",
        tags: ["autotube", "ai youtube automation", "demo"],
        chapters: [
          { title: "Hook", time: "00:00" },
          { title: "Build-up", time: "04:15" },
          { title: "Reveal", time: "11:30" }
        ]
      });
    }
  }, [params]);

  if (!video) {
    return (
      <p className="text-sm text-slate-400">Loading video details (demo)...</p>
    );
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">{video.title}</h1>
          <p className="text-xs text-slate-400">
            Status: {video.status} • {video.minutes} minutes • ID: {video.id}
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() =>
              router.push(`/projects/${params.projectId as string}`)
            }
            className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-400"
          >
            Back to project
          </button>
        </div>
      </header>

      {/* SEO & script */}
      <section className="grid gap-4 md:grid-cols-[1.4fr,1.6fr]">
        {/* SEO card */}
        <div className="space-y-3 text-xs">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Title</span>
              <button
                onClick={() => copy(video.title)}
                className="text-[11px] text-emerald-300 hover:text-emerald-200"
              >
                Copy
              </button>
            </div>
            <p className="text-slate-100">{video.title}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Description</span>
              <button
                onClick={() => copy(video.description)}
                className="text-[11px] text-emerald-300 hover:text-emerald-200"
              >
                Copy
              </button>
            </div>
            <p className="text-slate-100 whitespace-pre-wrap max-h-40 overflow-auto">
              {video.description}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Tags</span>
              <button
                onClick={() => copy(video.tags.join(", "))}
                className="text-[11px] text-emerald-300 hover:text-emerald-200"
              >
                Copy all
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {video.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <span className="font-semibold text-sm">Chapters</span>
            <ul className="space-y-1">
              {video.chapters.map((c) => (
                <li
                  key={c.title + c.time}
                  className="flex items-center justify-between"
                >
                  <span>{c.title}</span>
                  <span className="text-[11px] text-slate-400">
                    {c.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Script card */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Script (demo)</h2>
            <button
              onClick={() => copy(video.script)}
              className="text-[11px] text-emerald-300 hover:text-emerald-200"
            >
              Copy script
            </button>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 max-h-80 overflow-auto">
            <pre className="whitespace-pre-wrap text-[11px] leading-relaxed">
              {video.script}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-[11px] text-slate-400 space-y-1">
            <p>
              In the full SaaS, this page would also show:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Generated thumbnail images</li>
              <li>Extra B-roll frames</li>
              <li>Voiceover MP3 player + download</li>
              <li>Download all assets as ZIP</li>
            </ul>
            <p className="pt-1">
              Here we keep it front-end only so it deploys easily on Vercel with
              no database or API keys required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
