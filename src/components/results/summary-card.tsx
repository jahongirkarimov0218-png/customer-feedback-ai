"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  Copy,
  Check,
  Cpu,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalysisResponse, SentimentData } from "@/types/analyzer";

export interface SummaryCardProps {
  data: AnalysisResponse;
  className?: string;
  onCopy?: () => void;
}

/**
 * Calculates a balanced Overall Health Score from 0 to 100 based on sentiment.
 * Positive counts 1.0, Neutral counts 0.5, Negative counts 0.
 */
export function calculateHealthScore(sentiment: SentimentData): number {
  if (!sentiment) return 50;
  const total = sentiment.positive + sentiment.neutral + sentiment.negative;
  if (total <= 0) return 50;

  const rawScore = ((sentiment.positive + sentiment.neutral * 0.5) / total) * 100;
  return Math.min(100, Math.max(0, Math.round(rawScore)));
}

/**
 * Formats provider key into human-readable label
 */
export function formatProviderName(provider?: string): string {
  switch (provider) {
    case "gemini":
      return "Google Gemini 1.5 Flash";
    case "openai":
      return "OpenAI GPT-4o-mini";
    case "groq":
      return "Groq LLaMA 3.3";
    case "built-in-semantic-engine":
    default:
      return "Built-in Semantic Engine";
  }
}

export function SummaryCard({ data, className, onCopy }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);
  const healthScore = calculateHealthScore(data.sentiment);
  const providerLabel = formatProviderName(data.meta?.provider);
  const totalWords = data.meta?.totalWords || 0;
  const processedAt = data.meta?.processedAt
    ? new Date(data.meta.processedAt).toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Hozirgina";

  const handleCopySummary = async () => {
    if (onCopy) {
      onCopy();
    } else {
      try {
        await navigator.clipboard.writeText(data.summary);
      } catch {
        // fallback
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Health Score status badge
  const isHealthy = healthScore >= 70;
  const isWarning = healthScore < 50;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white p-5 shadow-card transition-all sm:p-6",
        className
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100/80">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Executive AI Xulosasi
            </h3>
            <p className="text-xs text-slate-500">
              Mijozlar fikrlari bo&apos;yicha umumiy strategik konsolidatsiya
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-subtle hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
            title="Xulosani nusxalash"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Nusxalandi</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Nusxalash</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content & Health Score Grid */}
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left 3 columns: Summary text */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base font-normal">
            {data.summary}
          </p>

          {/* Meta footer badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5">
              <Cpu className="h-3 w-3 text-slate-400" />
              <span>{providerLabel}</span>
            </span>

            {totalWords > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5">
                <FileText className="h-3 w-3 text-slate-400" />
                <span>{totalWords} ta so&apos;z tahlil qilindi</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5">
              <Clock className="h-3 w-3 text-slate-400" />
              <span>{processedAt}</span>
            </span>
          </div>
        </div>

        {/* Right 1 column: Health Score Widget */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-center">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-2">
            <Activity className="h-3.5 w-3.5 text-slate-400" />
            <span>Health Score</span>
          </div>

          <div className="flex items-baseline justify-center gap-1">
            <span
              className={cn(
                "font-mono text-3xl font-extrabold tracking-tight sm:text-4xl",
                isHealthy
                  ? "text-emerald-600"
                  : isWarning
                  ? "text-rose-600"
                  : "text-amber-600"
              )}
            >
              {healthScore}
            </span>
            <span className="text-xs text-slate-400">/100</span>
          </div>

          {/* Mini status indicator */}
          <div className="mt-2">
            {isHealthy ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                <TrendingUp className="h-3 w-3" />
                Barqaror
              </span>
            ) : isWarning ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/80 px-2 py-0.5 text-[11px] font-medium text-rose-800">
                <AlertTriangle className="h-3 w-3" />
                Xavf mavjud
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                O&apos;rtacha
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
