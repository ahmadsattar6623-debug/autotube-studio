import Link from "next/link";
import React from "react";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="hidden md:flex md:w-60 flex-col border-r border-slate-800 bg-slate-950/90 px-4 py-6 gap-4">
        <div className="font-semibold text-lg">
          <span className="text-emerald-400">AutoTube</span> Studio
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            href="/dashboard"
            className="rounded-md px-2 py-1 hover:bg-slate-900"
          >
            Dashboard
          </Link>
        </nav>
        <div className="mt-auto text-[11px] text-slate-500">
          Demo UI — no login required.
        </div>
      </aside>
      <main className="flex-1 px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
