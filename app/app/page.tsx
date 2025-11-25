import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="font-semibold text-lg tracking-tight">
          <span className="text-emerald-400">AutoTube</span> Studio
        </div>
        <div className="flex gap-3 text-sm">
          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-400 text-slate-200"
          >
            Dashboard demo
          </Link>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Type a title.
            <span className="block text-emerald-400">
              Get a full YouTube video package.
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            AutoTube Studio simulates an AI pipeline that turns your niche and
            title into scripts, thumbnails, B-roll frames, voiceover sections
            and SEO — ready to upload to your automation channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-medium text-slate-950"
            >
              Open dashboard demo
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl w-full text-sm">
          {[
            {
              title: "Script engine",
              desc: "Cinematic long-form scripts based on your niche and duration."
            },
            {
              title: "Visual package",
              desc: "Thumbnail & B-roll slots to plug in AI image outputs."
            },
            {
              title: "Voice & SEO",
              desc: "Voiceover sections, titles, descriptions, tags & chapters."
            }
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-slate-300 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
