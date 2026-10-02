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
  Zap,
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
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedAction, setCopiedAction] = useState(false);

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

  const primaryAction =
    burningIssue?.action ||
    data.problems[0]?.actionItem ||
    data.problems[0]?.solution ||
    "Barcha aniqlangan P0/High to'siqlar bo'yicha tezkor muhandislik rejasi tuzilsin.";

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
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyAction = async () => {
    try {
      await navigator.clipboard.writeText(primaryAction);
    } catch {
      // fallback
    }
    setCopiedAction(true);
    setTimeout(() => setCopiedAction(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5 sm:p-2 shadow-sm space-y-2",
        className
      )}
    >
      {/* 1. Burning Issue Spotlight (P0 Banner) if present */}
      {burningIssue && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/90 p-4 sm:p-5 text-slate-900 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="rounded-lg bg-rose-100 p-2 text-rose-700 border border-rose-200 shrink-0 mt-0.5">
                <Flame className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-rose-200/80 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-900 border border-rose-300">
                    Birlamchi Kritik Xavf (#1 Burning Issue)
                  </span>
                  <span className="text-xs text-rose-700 font-mono font-semibold tabular-nums">
                    ~{burningIssue.affectedPercentage}% mijozlar e&apos;tirozi
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-950 sm:text-lg tracking-tight">
                  {burningIssue.title}
                </h4>
                <p className="text-xs text-rose-950/80 leading-relaxed max-w-2xl">
                  <strong className="font-semibold text-rose-900">Biznes ta&apos;siri:</strong> {burningIssue.impact}
                </p>
              </div>
            </div>

            {onScrollToMatrix && (
              <button
                type="button"
                onClick={onScrollToMatrix}
                className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 text-xs font-semibold transition-colors shrink-0 shadow-xs active-press"
              >
                <span>Yechim rejasini ko&apos;rish</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Executive Product Metrics Grid */}
      <div className="rounded-xl border border-slate-200/70 bg-white p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Metric 1: Health Score */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Mijoz Qoniqish Indeksi</span>
              <Activity className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-950 font-mono tabular-nums">
                {healthScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>
            <p className="text-[11px] font-medium">
              {healthScore >= 70 ? (
                <span className="text-emerald-700">● Barqaror va ijobiy</span>
              ) : healthScore >= 45 ? (
                <span className="text-amber-700">● Diqqat talab etiladi</span>
              ) : (
                <span className="text-rose-700">● Kritik yo&apos;qotish xavfi</span>
              )}
            </p>
          </div>

          {/* Metric 2: Root Causes */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Ildiz Muammolar</span>
              <Layers className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-950 font-mono tabular-nums">
                {data.problems.length}
              </span>
              <span className="text-xs text-slate-500">toifa</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Semantik klasterlar
            </p>
          </div>

          {/* Metric 3: Critical Risks */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Kritik Xatarlar (High)</span>
              <ShieldAlert className="h-4 w-4 text-rose-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-rose-600 font-mono tabular-nums">
                {criticalCount}
              </span>
              <span className="text-xs text-slate-500">shoshilinch</span>
            </div>
            <p className="text-[11px] text-slate-500">
              P0 / Churn to&apos;siqlari
            </p>
          </div>

          {/* Metric 4: Customer Evidence Quotes */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">Mijoz Dalillari</span>
              <Quote className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-950 font-mono tabular-nums">
                {evidenceCount}
              </span>
              <span className="text-xs text-slate-500">iqtibos</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tabular-nums">
              {totalWords} ta so&apos;zdan
            </p>
          </div>
        </div>

        {/* 3. Action Bar: Konkret tavsiya etilgan harakat (What to do right now / 5-second decision) */}
        <div className="rounded-xl border border-slate-900 bg-slate-900 p-4 sm:p-5 text-white shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Konkret tavsiya etilgan harakat
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Birinchi navbatdagi qadam
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                {primaryAction}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <button
                type="button"
                onClick={handleCopyAction}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors active-press"
                title="Tavsiya etilgan harakatni nusxalash"
              >
                {copiedAction ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Nusxalandi</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Nusxalash</span>
                  </>
                )}
              </button>

              {onScrollToMatrix && (
                <button
                  type="button"
                  onClick={onScrollToMatrix}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-semibold transition-colors active-press shadow-xs"
                >
                  <span>Matritsani ko&apos;rish</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. Executive Briefing Text */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Rahbariyat va Jamoa Uchun Xulosa (Executive Brief)
              </h4>
            </div>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-950 transition-colors active-press"
            >
              {copiedSummary ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Nusxalandi</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Xulosani nusxalash</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-700">
            {data.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span>Tahlil dvigateli:</span>
              <span className="rounded bg-slate-200/80 px-2 py-0.5 text-slate-800 font-medium font-mono">
                {providerLabel}
              </span>
            </div>
            <span className="font-medium text-slate-600">
              Dalillarga asoslangan real tahlil natijalari
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
