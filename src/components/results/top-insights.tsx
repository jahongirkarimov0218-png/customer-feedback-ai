"use client";

import React from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertOctagon,
  Sparkles,
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

export function TopInsights({ insights, className }: TopInsightsProps) {
  const items = insights || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Top 3 Strategik Xulosalar
            </h3>
            <p className="text-xs text-slate-500">
              Biznes uchun eng yuqori ta&apos;sirga ega harakat nuqtalari
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Sparkles className="h-3 w-3 text-amber-500" />
          AI Semantik Sintez
        </span>
      </div>

      {/* 3 Grid Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.slice(0, 3).map((insight, idx) => {
          const numberLabel = `#0${idx + 1}`;
          const impact = getInsightImpactTag(insight, idx);
          const ImpactIcon = impact.icon;

          return (
            <div
              key={idx}
              className={cn(
                "group relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 shadow-card transition-all duration-150",
                "hover:border-slate-300 hover:shadow-md"
              )}
            >
              <div>
                {/* Top badges: Index & Impact */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center justify-center rounded-md bg-slate-900 px-2 py-0.5 text-xs font-mono font-bold text-white shadow-subtle">
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

                {/* Insight Title */}
                <h4 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                  {insight.title}
                </h4>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {insight.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Ustuvor vazifa</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
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
