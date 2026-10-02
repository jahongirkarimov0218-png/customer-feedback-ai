import React from "react";
import { Layers, Github, ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & System Status */}
        <div className="flex items-center gap-3.5">
          <a
            href="/"
            className="group flex items-center gap-2.5 rounded-md focus-ring"
            aria-label="Feedback Intelligence Home"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 text-white shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95 ease-emil">
              <Layers className="h-3.5 w-3.5 text-slate-100" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-slate-800">
              Feedback Intelligence
            </span>
          </a>

          {/* System Status Pill (Linear/Raycast style) */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-slate-900">Live System</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Zero Latency Local Engine</span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>v1.0</span>
            <span className="text-slate-300">·</span>
            <span>Production Ready</span>
          </div>

          <a
            href="https://github.com/jahongirkarimov0218-png/customer-feedback-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-md border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active-press focus-ring"
          >
            <Github className="h-3.5 w-3.5 text-slate-600" />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
