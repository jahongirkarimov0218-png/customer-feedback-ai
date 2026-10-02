import React from "react";
import { CheckCircle2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Product & Brand */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              Customer Feedback Intelligence
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-[11px] text-slate-500">v1.0</span>
          </div>
          <p className="text-[11px] text-slate-500">
            © {currentYear} Production-Grade SaaS Platform. Deterministic customer signal analysis &amp; priority discovery.
          </p>
        </div>

        {/* Center: System Architecture Tags */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          <span className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-slate-700">
            Next.js 14
          </span>
          <span className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-slate-700">
            TypeScript 5.6
          </span>
          <span className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-slate-700">
            Tailwind CSS
          </span>
          <span className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-slate-700">
            Playwright QA
          </span>
        </div>

        {/* Right: Operational Status */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Zero Latency Local Engine</span>
            <span className="text-emerald-300">·</span>
            <span>Live System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
