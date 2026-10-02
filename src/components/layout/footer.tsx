import React from "react";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Brand & Statement */}
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="font-semibold text-slate-900">
            Customer Feedback AI
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <p className="text-[11px] text-slate-500">
            © {currentYear} Deterministic customer voice intelligence &amp; priority discovery.
          </p>
        </div>

        {/* Right: Clean Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/jahongirkarimov0218-png/customer-feedback-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Github className="h-3 w-3" />
            <span>GitHub repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
