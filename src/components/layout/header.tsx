import React from "react";
import { Layers, Github, ArrowUpRight, Terminal, Activity } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Product Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white shadow-xs">
            <Layers className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="/"
              className="text-sm font-bold tracking-tight text-slate-950 hover:text-slate-800 transition-colors"
            >
              Feedback Intelligence
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Customer Voice Engine
            </span>
          </div>
        </div>

        {/* Navigation & Status */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/60 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <Activity className="h-3 w-3 text-emerald-600" />
            <span className="font-mono text-slate-500">v1.0</span>
            <span className="text-slate-300">·</span>
            <span>Production Ready</span>
          </div>

          <a
            href="https://github.com/jahongirkarimov0218-png/customer-feedback-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-950 active-press"
          >
            <Github className="h-3.5 w-3.5 text-slate-600" />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
