"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProblemSolutionItem, PriorityLevel, AnalysisResponse } from "@/types/analyzer";

export interface ProblemsTableProps {
  problems: ProblemSolutionItem[];
  fullAnalysis?: AnalysisResponse;
  className?: string;
}

export type PriorityFilterType = "all" | PriorityLevel;

/**
 * Filter problems by priority level
 */
export function filterProblemsByPriority(
  problems: ProblemSolutionItem[],
  filter: PriorityFilterType
): ProblemSolutionItem[] {
  if (!problems) return [];
  if (filter === "all") return problems;
  return problems.filter((p) => p.priority === filter);
}

/**
 * Generate CSV representation of problems
 */
export function exportProblemsToCSV(problems: ProblemSolutionItem[]): string {
  const header = "Muammo,Ustuvorlik,Yechim";
  const rows = (problems || []).map((p) => {
    const escapedProblem = `"${(p.problem || "").replace(/"/g, '""')}"`;
    const escapedPriority = `"${p.priority || ""}"`;
    const escapedSolution = `"${(p.solution || "").replace(/"/g, '""')}"`;
    return `${escapedProblem},${escapedPriority},${escapedSolution}`;
  });

  return [header, ...rows].join("\n");
}

/**
 * Generate formatted JSON representation
 */
export function exportAnalysisToJSON(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

export function ProblemsTable({
  problems = [],
  fullAnalysis,
  className,
}: ProblemsTableProps) {
  const [activeFilter, setActiveFilter] = useState<PriorityFilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCSV, setCopiedCSV] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [copiedSolutionIndex, setCopiedSolutionIndex] = useState<number | null>(null);

  // Counts by priority
  const counts = useMemo(() => {
    return {
      all: problems.length,
      high: problems.filter((p) => p.priority === "high").length,
      medium: problems.filter((p) => p.priority === "medium").length,
      low: problems.filter((p) => p.priority === "low").length,
    };
  }, [problems]);

  // Filtered & searched problems
  const displayedProblems = useMemo(() => {
    const byPriority = filterProblemsByPriority(problems, activeFilter);
    if (!searchQuery.trim()) return byPriority;

    const q = searchQuery.toLowerCase().trim();
    return byPriority.filter(
      (p) =>
        p.problem.toLowerCase().includes(q) ||
        p.solution.toLowerCase().includes(q)
    );
  }, [problems, activeFilter, searchQuery]);

  const handleDownloadCSV = () => {
    const csvContent = exportProblemsToCSV(problems);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `customer-problems-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCSV = async () => {
    const csv = exportProblemsToCSV(problems);
    try {
      await navigator.clipboard.writeText(csv);
    } catch {
      // fallback
    }
    setCopiedCSV(true);
    setTimeout(() => setCopiedCSV(false), 2000);
  };

  const handleCopyJSON = async () => {
    const payload = fullAnalysis || { problems };
    const jsonStr = exportAnalysisToJSON(payload);
    try {
      await navigator.clipboard.writeText(jsonStr);
    } catch {
      // fallback
    }
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const handleCopySolution = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setCopiedSolutionIndex(index);
    setTimeout(() => setCopiedSolutionIndex(null), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white shadow-card overflow-hidden",
        className
      )}
    >
      {/* Header Bar */}
      <div className="border-b border-slate-100 p-5 sm:p-6 bg-slate-50/40">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-100">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Muammo | Ustuvorlik | Yechim Matritsasi
                </h3>
                <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-700">
                  {problems.length} ta
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Aniqlangan tizimli to&apos;siqlar va ularni bartaraf etish rejalari
              </p>
            </div>
          </div>

          {/* Export & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-subtle hover:bg-slate-50 active:scale-95 transition-all"
              title="CSV matnini buferga nusxalash"
            >
              {copiedCSV ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">CSV Nusxalandi</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-3.5 w-3.5 text-slate-400" />
                  <span>CSV Nusxalash</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyJSON}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-subtle hover:bg-slate-50 active:scale-95 transition-all"
              title="To'liq JSON natijasini buferga nusxalash"
            >
              {copiedJSON ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">JSON Nusxalandi</span>
                </>
              ) : (
                <>
                  <FileCode className="h-3.5 w-3.5 text-slate-400" />
                  <span>JSON Nusxalash</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-subtle hover:bg-slate-800 active:scale-95 transition-all"
              title="CSV faylini yuklab olish"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Eksport (.csv)</span>
            </button>
          </div>
        </div>

        {/* Filter Buttons & Search row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-slate-200/60">
          {/* Priority filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="h-3 w-3" />
              Filtr:
            </span>

            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150",
                activeFilter === "all"
                  ? "bg-slate-900 text-white shadow-subtle"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
            >
              Barchasi ({counts.all})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("high")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150",
                activeFilter === "high"
                  ? "bg-rose-600 text-white shadow-subtle"
                  : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
              )}
            >
              Yuqori ({counts.high})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("medium")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150",
                activeFilter === "medium"
                  ? "bg-amber-500 text-white shadow-subtle"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              )}
            >
              O&apos;rta ({counts.medium})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("low")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150",
                activeFilter === "low"
                  ? "bg-emerald-600 text-white shadow-subtle"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              )}
            >
              Past ({counts.low})
            </button>
          </div>

          {/* Search box */}
          <div className="relative min-w-[200px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800/10 shadow-subtle"
            />
          </div>
        </div>
      </div>

      {/* Interactive Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider">
              <th scope="col" className="py-3 px-5 w-4/12">
                Muammo
              </th>
              <th scope="col" className="py-3 px-4 w-2/12">
                Ustuvorlik
              </th>
              <th scope="col" className="py-3 px-5 w-6/12">
                Yechim / Amaliy Qadam
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedProblems.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-10 text-center text-slate-400 text-xs">
                  {searchQuery ? "Qidiruv bo'yicha hech qanday muammo topilmadi" : "Bu filtr bo'yicha ma'lumot yo'q"}
                </td>
              </tr>
            ) : (
              displayedProblems.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Column 1: Muammo */}
                  <td className="py-3.5 px-5 align-top">
                    <p className="font-medium text-slate-900 leading-snug">
                      {item.problem}
                    </p>
                  </td>

                  {/* Column 2: Ustuvorlik Badge */}
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">
                    {item.priority === "high" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 shadow-subtle">
                        <AlertTriangle className="h-3 w-3 text-rose-500" />
                        <span>Yuqori (High)</span>
                      </span>
                    )}
                    {item.priority === "medium" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 shadow-subtle">
                        <AlertCircle className="h-3 w-3 text-amber-500" />
                        <span>O&apos;rta (Medium)</span>
                      </span>
                    )}
                    {item.priority === "low" && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 shadow-subtle">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span>Past (Low)</span>
                      </span>
                    )}
                  </td>

                  {/* Column 3: Yechim */}
                  <td className="py-3.5 px-5 align-top">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-slate-700 leading-relaxed">
                        {item.solution}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleCopySolution(item.solution, idx)}
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 shrink-0"
                        title="Yechimni nusxalash"
                      >
                        {copiedSolutionIndex === idx ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemsTable;
