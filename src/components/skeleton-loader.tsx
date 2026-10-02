import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, BarChart3, Lightbulb, ShieldAlert } from "lucide-react";

export interface SkeletonProps {
  className?: string;
}

export function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-slate-200/80 dark:bg-slate-800",
        className
      )}
    />
  );
}

/**
 * 1. Executive Summary Skeleton
 */
export function SummarySkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-5 rounded bg-slate-200/90 animate-pulse" />
        <SkeletonBox className="h-4 w-36" />
      </div>
      <div className="space-y-2 mt-2">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-11/12" />
        <SkeletonBox className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * 2. Sentiment Breakdown Skeleton
 */
export function SentimentSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-slate-300" />
          <SkeletonBox className="h-4 w-32" />
        </div>
        <SkeletonBox className="h-4 w-20" />
      </div>

      {/* Progress Bar Skeleton */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 flex gap-1 p-0.5">
        <div className="h-full w-3/5 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-full w-1/5 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-full w-1/5 rounded-full bg-slate-200 animate-pulse" />
      </div>

      {/* Sentiment metric pills */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-center"
          >
            <SkeletonBox className="mx-auto h-3 w-14 mb-1.5" />
            <SkeletonBox className="mx-auto h-5 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 3. Top 3 Insights Cards Skeleton
 */
export function InsightsSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-slate-300" />
        <SkeletonBox className="h-4 w-28" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-card"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-6 w-6 rounded-md bg-slate-200 animate-pulse" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <div className="space-y-1.5 mt-2">
              <SkeletonBox className="h-3 w-full" />
              <SkeletonBox className="h-3 w-5/6" />
              <SkeletonBox className="h-3 w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. Problems & Solutions Table Skeleton
 */
export function ProblemsSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-card overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-slate-300" />
          <SkeletonBox className="h-4 w-44" />
        </div>
        <SkeletonBox className="h-4 w-20" />
      </div>

      {/* Table rows */}
      <div className="divide-y divide-slate-100">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="sm:w-1/3">
              <SkeletonBox className="h-4 w-4/5" />
            </div>
            <div className="sm:w-1/6">
              <SkeletonBox className="h-5 w-16 rounded-full" />
            </div>
            <div className="sm:w-1/2">
              <SkeletonBox className="h-4 w-11/12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Master Skeleton Loader Component
 */
export function SkeletonLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Notice bar */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-slate-50/90 px-4 py-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium">AI semantik tahlil qilmoqda...</span>
        </div>
        <span className="text-[11px] text-slate-400">Taxminan 1-3 soniya</span>
      </div>

      {/* Summary */}
      <SummarySkeleton />

      {/* Sentiment */}
      <SentimentSkeleton />

      {/* Top Insights */}
      <InsightsSkeleton />

      {/* Problems Matrix */}
      <ProblemsSkeleton />
    </div>
  );
}

export default SkeletonLoader;
