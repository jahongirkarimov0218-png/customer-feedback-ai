"use client";

import React, { useState } from "react";
import {
  Activity,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Layers,
  Quote,
  Target,
  AlertTriangle,
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
  const [copiedLinearIssue, setCopiedLinearIssue] = useState(false);

  const healthScore = calculateHealthScore(data.sentiment);
  const totalWords = data.meta?.totalWords || 0;
  const criticalCount = data.problems.filter((p) => p.priority === "high").length;
  const evidenceCount =
    data.meta?.evidenceCount ||
    data.problems.reduce((acc, p) => acc + (p.evidenceQuotes?.length || 0), 0);

  const primaryProblem = data.problems[0];
  const burningIssue =
    data.burningIssue ||
    (criticalCount > 0
      ? {
          title: primaryProblem?.problem || "Kritik tizim xatosi",
          impact: primaryProblem?.impact || "Mijozlar ketishi va daromad yo'qotilishi xavfi",
          affectedPercentage: 42,
          urgency: "critical" as const,
          action: primaryProblem?.actionItem || primaryProblem?.solution,
        }
      : undefined);

  const ticketTitle = burningIssue?.title || primaryProblem?.problem || "Kritik tizim xatosi";
  const primaryComponent = primaryProblem?.category || "Core Platform";
  const primaryAction =
    burningIssue?.action ||
    primaryProblem?.actionItem ||
    primaryProblem?.solution ||
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

  const handleCopyLinearIssue = async () => {
    const evidenceQuote = primaryProblem?.evidenceQuotes?.[0]?.quote || "";
    const linearMarkdown = `### [P0] ${ticketTitle}
- **Priority:** P0 (Critical Churn Risk)
- **Component:** \`${primaryComponent}\`
- **Recommended Sprint Action:** ${primaryAction}
- **Impact:** ${burningIssue?.impact || primaryProblem?.impact || "Mijozlar ketishi va daromad yo'qotilishi xavfi"}${evidenceQuote ? `\n- **Customer Quote:** "${evidenceQuote}"` : ""}`;

    try {
      await navigator.clipboard.writeText(linearMarkdown);
    } catch {
      // fallback
    }
    setCopiedLinearIssue(true);
    setTimeout(() => setCopiedLinearIssue(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden",
        className
      )}
    >
      {/* 1. Header: Executive Brief & Direct Actions */}
      <div className="border-b border-slate-100 p-5 sm:p-6 bg-slate-50/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-800 border border-slate-200/70 shrink-0">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Executive Brief
                </h3>
                {criticalCount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                    P0 Diqqat markazida
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Mijoz fikrlari tahlili va strategik xulosalar
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-950 transition-all active:scale-[0.98] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
            title="Xulosani nusxalash"
          >
            {copiedSummary ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Nusxalandi</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Nusxalash</span>
              </>
            )}
          </button>
        </div>

        {/* Executive Brief Text */}
        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          {data.summary}
        </p>

        {/* 2. Primary Recommended Engineering Task (Linear Issue Format) */}
        <div className="mt-4 rounded-lg border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-rose-700">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                P0 Engineering Task
              </span>
              <span className="text-xs text-slate-500 font-mono">
                · {primaryComponent}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLinearIssue}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] duration-100 ease-out shadow-2xs"
                title="Linear va Jira uchun Markdown formatida nusxalash"
              >
                {copiedLinearIssue ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Linear task nusxalandi</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Linear vazifa sifatida nusxalash</span>
                  </>
                )}
              </button>

              {onScrollToMatrix && (
                <button
                  type="button"
                  onClick={onScrollToMatrix}
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 text-white px-2.5 py-1 text-xs font-medium hover:bg-slate-800 transition-all active:scale-[0.98] duration-100 ease-out shadow-2xs"
                >
                  <span>Matritsani ko&apos;rish</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-950 tracking-tight leading-snug">
              {ticketTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="font-medium text-slate-900">Sprint yechimi:</strong> {primaryAction}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Executive Metrics Grid (Linear style 4-column strip) */}
      <div className="grid grid-cols-2 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0 sm:divide-x border-t border-slate-100 bg-slate-50/30">
        {/* Metric 1: Health Score */}
        <div className="p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Mijoz Qoniqish Indeksi</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-semibold tracking-tight text-slate-950 font-mono tabular-nums">
              {healthScore}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <p className="text-[11px] font-medium pt-0.5">
            {healthScore >= 70 ? (
              <span className="text-emerald-700">Barqaror va ijobiy</span>
            ) : healthScore >= 45 ? (
              <span className="text-amber-700">Diqqat talab etiladi</span>
            ) : (
              <span className="text-rose-700">Kritik xavf</span>
            )}
          </p>
        </div>

        {/* Metric 2: Root Causes */}
        <div className="p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Ildiz Muammolar</span>
            <Layers className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-semibold tracking-tight text-slate-950 font-mono tabular-nums">
              {data.problems.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">toifa</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            Semantik klasterlar
          </p>
        </div>

        {/* Metric 3: Critical Risks */}
        <div className="p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Kritik Xatarlar</span>
            <ShieldAlert className={cn("h-4 w-4", criticalCount > 0 ? "text-rose-600" : "text-slate-400")} />
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span
              className={cn(
                "text-2xl font-semibold tracking-tight font-mono tabular-nums",
                criticalCount > 0 ? "text-rose-600" : "text-slate-950"
              )}
            >
              {criticalCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">P0 shoshilinch</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            {criticalCount > 0 ? "Daromad / Churn xavfi" : "Kritik to'siq yo'q"}
          </p>
        </div>

        {/* Metric 4: Customer Evidence Quotes */}
        <div className="p-4 sm:p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Mijoz Dalillari</span>
            <Quote className="h-4 w-4 text-slate-600" />
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-semibold tracking-tight text-slate-950 font-mono tabular-nums">
              {evidenceCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">iqtibos</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5 font-mono tabular-nums">
            {totalWords} ta so&apos;zdan
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
