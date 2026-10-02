"use client";

import React, { useState } from "react";
import {
  Activity,
  Copy,
  Check,
  Flame,
  ArrowRight,
  ShieldAlert,
  Layers,
  Quote,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalysisResponse, SentimentData } from "@/types/analyzer";

export interface SummaryCardProps {
  data: AnalysisResponse;
  className?: string;
  onCopy?: () => void;
  onScrollToMatrix?: () => void;
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
      return "Ichki Semantik Dvigatel";
  }
}

export function SummaryCard({
  data,
  className,
  onCopy,
  onScrollToMatrix,
}: SummaryCardProps) {
  const [copied, setCopied] = useState(false);
  const healthScore = calculateHealthScore(data.sentiment);
  const providerLabel = formatProviderName(data.meta?.provider);
  const totalWords = data.meta?.totalWords || 0;
  const criticalCount = data.problems.filter((p) => p.priority === "high").length;
  const evidenceCount =
    data.meta?.evidenceCount ||
    data.problems.reduce((acc, p) => acc + (p.evidenceQuotes?.length || 0), 0);

  const burningIssue =
    data.burningIssue ||
    (criticalCount > 0
      ? {
          title: data.problems[0].problem,
          impact: data.problems[0].impact || "Mijozlar ketishi va daromad yo'qotilishi xavfi",
          affectedPercentage: 42,
          urgency: "critical" as const,
          action: data.problems[0].actionItem || data.problems[0].solution,
        }
      : undefined);

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

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      {/* 1. Burning Issue Spotlight (P0 Banner) if present */}
      {burningIssue && (
        <div className="border-b border-rose-500/30 bg-rose-950/40 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="rounded-xl bg-rose-500/20 p-2 text-rose-400 border border-rose-500/30 shrink-0 mt-0.5">
                <Flame className="h-5 w-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-300 border border-rose-500/30">
                    Birlamchi Kritik Xavf (#1 Burning Issue)
                  </span>
                  <span className="text-xs text-rose-300/80 font-medium">
                    ~{burningIssue.affectedPercentage}% mijozlar e&apos;tirozi
                  </span>
                </div>
                <h4 className="text-base font-bold text-white sm:text-lg">
                  {burningIssue.title}
                </h4>
                <p className="text-xs text-rose-200/90 leading-relaxed max-w-2xl">
                  <strong className="font-semibold text-rose-300">Ta&apos;siri:</strong> {burningIssue.impact}
                </p>
              </div>
            </div>

            {onScrollToMatrix && (
              <button
                onClick={onScrollToMatrix}
                className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-3.5 py-2 text-xs font-semibold transition-colors shrink-0 shadow-sm"
              >
                <span>Yechim rejasini ko&apos;rish</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Executive Product Metrics Grid */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Metric 1: Health Score */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Mijoz Qoniqish Indeksi</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-white font-mono">
                {healthScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              {healthScore >= 70 ? (
                <span className="text-emerald-400">● Barqaror va ijobiy</span>
              ) : healthScore >= 45 ? (
                <span className="text-amber-400">● Diqqat talab etiladi</span>
              ) : (
                <span className="text-rose-400">● Kritik yo&apos;qotish xavfi</span>
              )}
            </p>
          </div>

          {/* Metric 2: Root Causes */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Ildiz Muammolar</span>
              <Layers className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-white font-mono">
                {data.problems.length}
              </span>
              <span className="text-xs text-slate-500">ta toifa</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Semantik guruhlangan
            </p>
          </div>

          {/* Metric 3: Critical Risks */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Kritik Xatarlar (High)</span>
              <ShieldAlert className="h-4 w-4 text-rose-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-rose-400 font-mono">
                {criticalCount}
              </span>
              <span className="text-xs text-slate-500">ta shoshilinch</span>
            </div>
            <p className="text-[11px] text-slate-400">
              P0 / Churn to&apos;siqlari
            </p>
          </div>

          {/* Metric 4: Customer Evidence Quotes */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Mijoz Dalillari</span>
              <Quote className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-white font-mono">
                {evidenceCount}
              </span>
              <span className="text-xs text-slate-500">ta iqtibos</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {totalWords} ta so&apos;zdan
            </p>
          </div>
        </div>

        {/* 3. Executive Briefing Text */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-950/40 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Rahbariyat va Jamoa Uchun Xulosa (Executive Brief)
              </h4>
            </div>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Nusxalandi</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Xulosani nusxalash</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-200">
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span>Tahlil usuli:</span>
              <span className="rounded bg-slate-800/80 px-2 py-0.5 text-slate-300 font-medium font-mono">
                {providerLabel}
              </span>
            </div>
            <span>
              Real vaqtda dalillarga asoslangan tahlil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
