"use client";

import React, { useEffect } from "react";
import {
  X,
  Quote,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { ProblemSolutionItem } from "@/types/analyzer";

interface EvidenceModalProps {
  problem: ProblemSolutionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EvidenceModal({
  problem,
  isOpen,
  onClose,
}: EvidenceModalProps) {
  const [copied, setCopied] = React.useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !problem) return null;

  const handleCopyLinearTask = () => {
    const text = `[ISSUE] ${problem.problem}\n\nKategoriya: ${problem.category || "Umumiy"}\nUstuvorlik: ${problem.priority.toUpperCase()}\nBiznes ta'siri: ${problem.impact || "N/A"}\n\nTavsiya etilgan yechim:\n${problem.actionItem || problem.solution}\n\nMijoz dalillari (Quotes):\n${(problem.evidenceQuotes || []).map((q, i) => `${i + 1}. "${q.quote}" — ${q.source || "Mijoz"}`).join("\n")}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quotes = problem.evidenceQuotes || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 sm:p-7 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                <Quote className="h-3 w-3 text-emerald-400" />
                <span>Mijoz Dalillari (Evidence)</span>
              </span>
              {problem.category && (
                <span className="rounded-full border border-slate-700/60 bg-slate-800/40 px-2.5 py-0.5 text-xs text-slate-400">
                  {problem.category}
                </span>
              )}
            </div>
            <h3 id="modal-title" className="text-lg font-bold text-slate-100 sm:text-xl">
              {problem.problem}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1 custom-scrollbar">
          {/* Business Impact Box */}
          {problem.impact && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                    Biznesga Ta&apos;siri va Xavf Darajasi
                  </p>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {problem.impact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quotes Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Haqiqiy Mijoz Iqtiboslari ({quotes.length} ta dalil)
              </h4>
              <span className="text-xs text-slate-500">
                Manba: Support &amp; Review kanallari
              </span>
            </div>

            {quotes.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-6 text-center text-sm text-slate-400">
                Ushbu muammo bo&apos;yicha alohida iqtibos ajratilmadi, umumiy matn tahlili asosida shakllantirilgan.
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition-colors hover:border-slate-700/80"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 text-xs text-slate-400 border-b border-slate-800/60 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-400">
                          {q.source || "Mijoz Sharhi"}
                        </span>
                        {q.authorTier && (
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                            {q.authorTier}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        #Dalil-{idx + 1}
                      </span>
                    </div>

                    <p className="text-sm italic text-slate-200 leading-relaxed">
                      &ldquo;{q.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Action Item */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Tavsiya Etilgan Mahsulot Yechimi (Action Plan)
                </p>
                <p className="text-sm leading-relaxed text-slate-200">
                  {problem.actionItem || problem.solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Jamoa bilan Linear, Jira yoki Slack orqali ulashing
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLinearTask}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-medium transition-colors border border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Vazifa nusxalandi!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Linear/Jira uchun nusxalash</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-medium transition-colors"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
