"use client";

import React from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertOctagon,
  Zap,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InsightItem } from "@/types/analyzer";

export interface TopInsightsProps {
  insights: InsightItem[];
  className?: string;
}

export interface ImpactTagInfo {
  tag: string;
  badgeClass: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface RiskLevelInfo {
  label: string;
  badgeClass: string;
}

/**
 * Derives strategic impact category from insight content or index
 */
export function getInsightImpactTag(
  insight: InsightItem,
  index: number
): ImpactTagInfo {
  const text = `${insight?.title || ""} ${insight?.description || ""}`.toLowerCase();

  if (
    text.includes("ketib") ||
    text.includes("churn") ||
    text.includes("yo'qotish") ||
    text.includes("bekor") ||
    text.includes("uchet") ||
    text.includes("norozilik")
  ) {
    return {
      tag: "Churn Risk",
      badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
      icon: AlertOctagon,
    };
  }

  if (
    text.includes("daromad") ||
    text.includes("revenue") ||
    text.includes("savdo") ||
    text.includes("narx") ||
    text.includes("konversiya") ||
    text.includes("conversion")
  ) {
    return {
      tag: "Revenue Impact",
      badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: TrendingUp,
    };
  }

  if (
    text.includes("cx") ||
    text.includes("mijoz") ||
    text.includes("tajriba") ||
    text.includes("experience") ||
    text.includes("xizmat") ||
    text.includes("support")
  ) {
    return {
      tag: "CX Opportunity",
      badgeClass: "border-blue-200 bg-blue-50 text-blue-700",
      icon: Target,
    };
  }

  // Fallback rotation by index for guaranteed 3 diverse strategic perspectives
  const defaults: ImpactTagInfo[] = [
    {
      tag: "Revenue & Growth",
      badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: TrendingUp,
    },
    {
      tag: "CX Opportunity",
      badgeClass: "border-blue-200 bg-blue-50 text-blue-700",
      icon: Target,
    },
    {
      tag: "Product Reliability",
      badgeClass: "border-purple-200 bg-purple-50 text-purple-700",
      icon: Zap,
    },
  ];

  return defaults[index % defaults.length];
}

/**
 * Derives priority and risk tier tag for insight
 */
export function getInsightRiskLevel(
  insight: InsightItem,
  index: number
): RiskLevelInfo {
  const text = `${insight?.title || ""} ${insight?.description || ""}`.toLowerCase();

  if (
    text.includes("ketib") ||
    text.includes("churn") ||
    text.includes("yo'qotish") ||
    text.includes("xavf") ||
    text.includes("norozilik") ||
    index === 0
  ) {
    return {
      label: "Yuqori xavf (P0)",
      badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    };
  }

  if (
    text.includes("daromad") ||
    text.includes("revenue") ||
    text.includes("narx") ||
    text.includes("sekin") ||
    index === 1
  ) {
    return {
      label: "O'rta xavf (P1)",
      badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Past xavf (P2)",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
}

export function TopInsights({ insights, className }: TopInsightsProps) {
  const items = insights || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Top 3 Strategik Xulosalar
            </h3>
            <p className="text-xs text-slate-500">
              Biznes uchun eng yuqori ta&apos;sirga ega harakat nuqtalari
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Strategik Klasterlar
        </span>
      </div>

      {/* 3 Bento Cards with Double-Bezel Containment */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.slice(0, 3).map((insight, idx) => {
          const numberLabel = `#0${idx + 1}`;
          const impact = getInsightImpactTag(insight, idx);
          const risk = getInsightRiskLevel(insight, idx);
          const ImpactIcon = impact.icon;

          return (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-200/90 bg-slate-100/70 p-1.5 shadow-sm transition-all duration-150 hover:bg-slate-200/60"
            >
              <div className="h-full rounded-xl border border-slate-200/70 bg-white p-5 flex flex-col justify-between shadow-xs">
                <div>
                  {/* Top badges: Index, Category, Priority/Risk */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center rounded-md bg-slate-950 px-2 py-0.5 text-xs font-mono font-bold text-white shadow-2xs tabular-nums">
                        {numberLabel}
                      </span>

                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-tight",
                          impact.badgeClass
                        )}
                      >
                        <ImpactIcon className="h-3 w-3" />
                        <span>{impact.tag}</span>
                      </span>
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold font-mono",
                        risk.badgeClass
                      )}
                    >
                      {risk.label}
                    </span>
                  </div>

                  {/* Insight Title */}
                  <h4 className="text-sm font-bold text-slate-950 leading-snug tracking-tight">
                    {insight.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {insight.description}
                  </p>

                  {/* Customer Verbatim Quote if available */}
                  {insight.evidenceQuote && (
                    <div className="mt-3.5 rounded-lg border border-slate-200/70 bg-slate-50/90 p-3 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900 mr-1 not-italic">
                        Mijoz iqtibosi:
                      </span>
                      &ldquo;{insight.evidenceQuote}&rdquo;
                    </div>
                  )}
                </div>

                {/* Bottom Strategic Action Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Strategik tavsiya</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Alias to satisfy both interfaces.md and ticket
export const InsightsList = TopInsights;

export default TopInsights;
