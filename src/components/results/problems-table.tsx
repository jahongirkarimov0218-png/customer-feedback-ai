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
  Quote,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ProblemSolutionItem,
  PriorityLevel,
  AnalysisResponse,
} from "@/types/analyzer";
import { EvidenceModal } from "./evidence-modal";

export interface ProblemsTableProps {
  problems: ProblemSolutionItem[];
  fullAnalysis?: AnalysisResponse;
  className?: string;
  onOpenEvidence?: (problem: ProblemSolutionItem) => void;
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
 * Safe CSV Cell Sanitizer preventing Formula Injection (CWE-1236).
 * Prepend single quote (') if the field starts with =, +, -, @, \t, \r, or %
 */
export function sanitizeCSVCell(value: string | undefined | null): string {
  if (!value) return '""';
  let escaped = String(value).replace(/"/g, '""');
  if (/^[=+\-@\t\r%]/.test(escaped)) {
    escaped = `'${escaped}`;
  }
  return `"${escaped}"`;
}

/**
 * Generate CSV representation of problems with formula injection defense
 */
export function exportProblemsToCSV(problems: ProblemSolutionItem[]): string {
  const header = "Muammo,Ustuvorlik,Yechim,Biznes Ta'siri,Tavsiya";
  const rows = (problems || []).map((p) => {
    const escapedProblem = sanitizeCSVCell(p.problem);
    const escapedPriority = sanitizeCSVCell(p.priority);
    const escapedSolution = sanitizeCSVCell(p.solution);
    const escapedImpact = sanitizeCSVCell(p.impact);
    const escapedAction = sanitizeCSVCell(p.actionItem || p.solution);
    return `${escapedProblem},${escapedPriority},${escapedSolution},${escapedImpact},${escapedAction}`;
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
  onOpenEvidence,
}: ProblemsTableProps) {
  const [activeFilter, setActiveFilter] = useState<PriorityFilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCSV, setCopiedCSV] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [copiedActionIndex, setCopiedActionIndex] = useState<number | null>(null);

  // Internal modal state if onOpenEvidence not controlled by parent
  const [selectedProblem, setSelectedProblem] = useState<ProblemSolutionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Counts by priority with tabular numerals
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
        p.solution.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.impact && p.impact.toLowerCase().includes(q)) ||
        (p.actionItem && p.actionItem.toLowerCase().includes(q))
    );
  }, [problems, activeFilter, searchQuery]);

  const handleOpenEvidenceModal = (item: ProblemSolutionItem) => {
    if (onOpenEvidence) {
      onOpenEvidence(item);
    } else {
      setSelectedProblem(item);
      setIsModalOpen(true);
    }
  };

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

  const handleCopyAction = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
    }
    setCopiedActionIndex(index);
    setTimeout(() => setCopiedActionIndex(null), 2000);
  };

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden",
          className
        )}
      >
        {/* Header Bar */}
        <div className="border-b border-slate-100 p-5 sm:p-6 bg-slate-50/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-800 border border-slate-200/70 shrink-0">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Muammo | Ta&apos;sir | Dalil | Ustuvorlik | Tavsiya
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-600 border border-slate-200/80 tabular-nums">
                    {problems.length} ta ildiz muammo
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Aniqlangan to&apos;siqlar, mijoz dalillari va tavsiya etilgan muhandislik qarorlari
                </p>
              </div>
            </div>

            {/* Export & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCSV}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                title="CSV matnini buferga nusxalash (CWE-1236 himoyalangan)"
              >
                {copiedCSV ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">CSV Nusxalandi</span>
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-[0.98] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                title="To'liq JSON natijasini buferga nusxalash"
              >
                {copiedJSON ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">JSON Nusxalandi</span>
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
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-2xs hover:bg-slate-800 active:scale-[0.98] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                title="Xavfsiz CSV faylini yuklab olish"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Eksport (.csv)</span>
              </button>
            </div>
          </div>

          {/* Filter Buttons & Search row */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-slate-200/60">
            {/* Priority filter pills (High / Medium / Low) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
                <Filter className="h-3 w-3" />
                Filtr:
              </span>

              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-[0.98] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  activeFilter === "all"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
              >
                Barchasi / All ({counts.all})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("high")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-[0.98] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  activeFilter === "high"
                    ? "bg-rose-600 text-white shadow-2xs"
                    : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-50"
                )}
              >
                Yuqori / High ({counts.high})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("medium")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-[0.98] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  activeFilter === "medium"
                    ? "bg-amber-500 text-white shadow-2xs"
                    : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
                )}
              >
                O&apos;rta / Medium ({counts.medium})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("low")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-[0.98] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  activeFilter === "low"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
                )}
              >
                Past / Low ({counts.low})
              </button>
            </div>

            {/* Search box */}
            <div className="relative min-w-[200px] max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Muammo yoki yechim bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white py-1 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800/10 shadow-2xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* 5-Column Responsive Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 text-slate-500 font-medium">
                <th scope="col" className="py-3 px-4 w-3/12">
                  Ildiz Muammo
                </th>
                <th scope="col" className="py-3 px-3 w-2/12">
                  Biznes Ta&apos;siri
                </th>
                <th scope="col" className="py-3 px-3 w-2/12">
                  Mijoz Dalili
                </th>
                <th scope="col" className="py-3 px-3 w-2/12">
                  Ustuvorlik
                </th>
                <th scope="col" className="py-3 px-4 w-3/12">
                  Tavsiya &amp; Harakat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedProblems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 text-xs">
                    {searchQuery
                      ? "Qidiruv bo'yicha hech qanday muammo topilmadi"
                      : "Bu filtr bo'yicha ma'lumot yo'q"}
                  </td>
                </tr>
              ) : (
                displayedProblems.map((item, idx) => {
                  const quotesCount = item.evidenceQuotes?.length || 0;
                  const actionText = item.actionItem || item.solution;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Column 1: Ildiz Muammo + Category */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900 leading-snug">
                            {item.problem}
                          </p>
                          {item.category && (
                            <span className="inline-block rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 2: Biznes Ta'siri (Clean Linear metadata, not screaming pink boxes) */}
                      <td className="py-3.5 px-3 align-top">
                        {item.impact ? (
                          <div className="text-[11px] text-slate-700 leading-relaxed">
                            <span className="text-slate-400 mr-1">·</span>
                            <span>{item.impact}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">
                            O&apos;rtacha ta&apos;sir
                          </span>
                        )}
                      </td>

                      {/* Column 3: Mijoz Dalili (Evidence) Button */}
                      <td className="py-3.5 px-3 align-top">
                        <button
                          type="button"
                          onClick={() => handleOpenEvidenceModal(item)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group/btn"
                        >
                          <Quote className="h-3 w-3 text-slate-500" />
                          <span>
                            {quotesCount > 0
                              ? `${quotesCount} ta dalil`
                              : "Dalillarni ko'rish"}
                          </span>
                          <ArrowRight className="h-2.5 w-2.5 text-slate-400 group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                        </button>
                      </td>

                      {/* Column 4: Ustuvorlik Badge */}
                      <td className="py-3.5 px-3 align-top whitespace-nowrap">
                        {item.priority === "high" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium text-rose-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            <span>Yuqori (High)</span>
                          </span>
                        )}
                        {item.priority === "medium" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span>O&apos;rta (Medium)</span>
                          </span>
                        )}
                        {item.priority === "low" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>Past (Low)</span>
                          </span>
                        )}
                      </td>

                      {/* Column 5: Tavsiya / Harakat + Quick Copy */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-700 leading-relaxed">
                            {actionText}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleCopyAction(actionText, idx)}
                            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 shrink-0 active:scale-[0.98] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            title="Tavsiyani nusxalash"
                          >
                            {copiedActionIndex === idx ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Evidence Modal */}
      {!onOpenEvidence && (
        <EvidenceModal
          problem={selectedProblem}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProblem(null);
          }}
        />
      )}
    </>
  );
}

export default ProblemsTable;
