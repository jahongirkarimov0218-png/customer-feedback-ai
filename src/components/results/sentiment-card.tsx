"use client";

import React from "react";
import {
  BarChart3,
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SentimentData } from "@/types/analyzer";

export interface SentimentCardProps {
  sentiment: SentimentData;
  className?: string;
}

export interface SentimentStatusResult {
  status: "Kuchli ijobiy" | "Balanslashgan" | "Diqqat talab etiladi";
  variant: "positive" | "neutral" | "negative";
  description: string;
}

/**
 * Returns executive assessment badge based on sentiment distribution
 */
export function getSentimentStatus(sentiment: SentimentData): SentimentStatusResult {
  if (!sentiment) {
    return {
      status: "Balanslashgan",
      variant: "neutral",
      description: "Yetarli ma'lumot yo'q",
    };
  }

  const { positive, neutral, negative } = sentiment;

  if (positive >= 60) {
    return {
      status: "Kuchli ijobiy",
      variant: "positive",
      description: "Mijozlarning aksariyati mahsulot va xizmatdan juda mamnun",
    };
  }

  if (negative >= 40) {
    return {
      status: "Diqqat talab etiladi",
      variant: "negative",
      description: "Mijozlar e'tirozlari yuqori, shoshilinch choralar talab etiladi",
    };
  }

  return {
    status: "Balanslashgan",
    variant: "neutral",
    description: "Ijobiy va o'rtacha fikrlar muvozanatda, yaxshilash nuqtalari mavjud",
  };
}

export function SentimentCard({ sentiment, className }: SentimentCardProps) {
  const statusInfo = getSentimentStatus(sentiment);
  const pos = Math.max(0, Math.min(100, sentiment?.positive ?? 0));
  const neu = Math.max(0, Math.min(100, sentiment?.neutral ?? 0));
  const neg = Math.max(0, Math.min(100, sentiment?.negative ?? 0));

  const npsScore = Math.round(pos - neg);

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden flex flex-col justify-between h-full",
        className
      )}
    >
      <div className="p-5 sm:p-6 space-y-5">
        {/* Header bar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-800 border border-slate-200/70 shrink-0">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                Sentiment Taqsimoti
              </h3>
              <p className="text-xs text-slate-500">
                Fikrlar tonalligi balansi va NPS
              </p>
            </div>
          </div>

          {/* NPS and Status Badge */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* NPS Metric Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                NPS
              </span>
              <span
                className={cn(
                  "font-mono tabular-nums text-xs font-semibold",
                  npsScore > 0
                    ? "text-emerald-700"
                    : npsScore < 0
                    ? "text-rose-700"
                    : "text-slate-700"
                )}
              >
                {npsScore > 0 ? `+${npsScore}` : npsScore}
              </span>
            </div>

            {/* Status Badge */}
            <div>
              {statusInfo.variant === "positive" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>{statusInfo.status}</span>
                </span>
              )}
              {statusInfo.variant === "negative" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                  <span>{statusInfo.status}</span>
                </span>
              )}
              {statusInfo.variant === "neutral" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  <span>{statusInfo.status}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* High-density Segmented Stacked Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Segmentlangan ulush:</span>
            <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {pos}%
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-semibold">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                {neu}%
              </span>
              <span className="flex items-center gap-1 text-rose-700 font-semibold">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                {neg}%
              </span>
            </div>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 flex p-0.5 gap-0.5 border border-slate-200/60">
            {pos > 0 && (
              <div
                style={{ width: `${pos}%` }}
                title={`Ijobiy: ${pos}%`}
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              />
            )}
            {neu > 0 && (
              <div
                style={{ width: `${neu}%` }}
                title={`Neytral: ${neu}%`}
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
              />
            )}
            {neg > 0 && (
              <div
                style={{ width: `${neg}%` }}
                title={`Salbiy: ${neg}%`}
                className="h-full rounded-full bg-rose-500 transition-all duration-500"
              />
            )}
          </div>

          <p className="text-[11px] text-slate-500 pt-0.5">
            {statusInfo.description}
          </p>
        </div>

        {/* Clean 3-Column Metric Breakdown Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {/* Positive Metric */}
          <div className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium text-[11px]">
                <Smile className="h-3 w-3 text-emerald-600" />
                Ijobiy
              </span>
            </div>
            <div className="font-mono tabular-nums text-lg font-semibold text-slate-900">
              {pos}%
            </div>
            <div className="h-1 w-full rounded-full bg-slate-200/70 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${pos}%` }}
              />
            </div>
          </div>

          {/* Neutral Metric */}
          <div className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium text-[11px]">
                <Meh className="h-3 w-3 text-amber-600" />
                Neytral
              </span>
            </div>
            <div className="font-mono tabular-nums text-lg font-semibold text-slate-900">
              {neu}%
            </div>
            <div className="h-1 w-full rounded-full bg-slate-200/70 overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${neu}%` }}
              />
            </div>
          </div>

          {/* Negative Metric */}
          <div className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium text-[11px]">
                <Frown className="h-3 w-3 text-rose-600" />
                Salbiy
              </span>
            </div>
            <div className="font-mono tabular-nums text-lg font-semibold text-slate-900">
              {neg}%
            </div>
            <div className="h-1 w-full rounded-full bg-slate-200/70 overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${neg}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentimentCard;
