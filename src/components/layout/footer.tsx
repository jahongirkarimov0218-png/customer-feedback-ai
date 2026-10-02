import React from "react";
import { CheckCircle2, Cpu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Copyright & Title */}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-slate-800">
            Customer Feedback Intelligence
          </p>
          <p className="text-slate-500 text-[11px]">
            © {currentYear} Production-Grade SaaS Platform. Real semantic customer signal analysis.
          </p>
        </div>

        {/* Center: Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 shadow-2xs">
            <Cpu className="h-3 w-3 text-slate-500" />
            Next.js 14
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 shadow-2xs">
            TypeScript
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 shadow-2xs">
            Tailwind CSS
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 shadow-2xs">
            Playwright QA
          </span>
        </div>

        {/* Right: Operational Status */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
