import React from "react";
import { Sparkles, Github, Layers, ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
            <a
              href="/"
              className="text-base font-semibold tracking-tight text-slate-900 hover:text-slate-700"
            >
              FeedbackAI
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100/80 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI-Powered Feedback Intelligence
            </span>
          </div>
        </div>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-subtle">
            <Layers className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Portfolio</span> Showcase
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Github className="h-3.5 w-3.5 text-slate-600" />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
