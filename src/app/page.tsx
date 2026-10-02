"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles,
  BarChart3,
  Lightbulb,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Layers,
  Zap,
  ArrowRight,
  TrendingUp,
  Quote,
  Target,
  ArrowDown,
} from "lucide-react";
import { FeedbackInput } from "@/components/feedback-input";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { ErrorAlert, ErrorType } from "@/components/error-alert";
import {
  SummaryCard,
  SentimentCard,
  TopInsights,
  ProblemsTable,
} from "@/components/results";
import { EvidenceModal } from "@/components/results/evidence-modal";
import { FEEDBACK_PRESETS, FeedbackPreset } from "@/components/presets";
import { AnalysisResponse, ProblemSolutionItem } from "@/types/analyzer";

export default function HomePage() {
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [errorState, setErrorState] = useState<{
    message: string;
    type: ErrorType;
  } | null>(null);

  // Modal state for viewing verbatim quotes
  const [selectedProblemForEvidence, setSelectedProblemForEvidence] =
    useState<ProblemSolutionItem | null>(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    const trimmed = feedbackText.trim();
    if (trimmed.length < 10) {
      setErrorState({
        message:
          "Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak. Iltimos, batafsilroq sharh yozing yoki tayyor namunalardan birini tanlang.",
        type: "validation",
      });
      return;
    }

    setIsLoading(true);
    setErrorState(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Tahlil jarayonida xatolik yuz berdi");
      }

      setAnalysisData(data as AnalysisResponse);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Kutilmagan xatolik yuz berdi";
      setErrorState({
        message: errorMessage,
        type: errorMessage.toLowerCase().includes("network")
          ? "network"
          : "server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: FeedbackPreset) => {
    setFeedbackText(preset.fullText);
    setErrorState(null);
  };

  const handleResetAnalysis = () => {
    setAnalysisData(null);
    setErrorState(null);
  };

  const handleQuickLoadPreset = (presetId: string) => {
    const found = FEEDBACK_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setFeedbackText(found.fullText);
      setErrorState(null);
      // Auto-focus input area
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handleOpenEvidence = (problem: ProblemSolutionItem) => {
    setSelectedProblemForEvidence(problem);
    setIsEvidenceModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-10">
      {/* 1. Founder-First Hero Section (Problem -> Outcome -> Clarity) */}
      <section className="text-center sm:text-left space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-subtle">
          <Target className="h-3.5 w-3.5 text-emerald-600" />
          <span>Product Intelligence &amp; Customer Voice System</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
          Mijoz fikrlari tarqoq bo‘lganda, birinchi bo‘lib nimani tuzatish kerak?
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Support chatlari, ilova sharhlari va e&apos;tirozlardagi shovqinni saralash o&apos;rniga,
          haqiqiy ildiz muammolarni ajrating: aniq mijoz dalillari, biznesga ta&apos;sir qiluvchi xatarlar (churn/daromad)
          va jamoa uchun ustuvorlashtirilgan harakatlar.
        </p>

        {/* Value Pipeline: Feedback -> Problem -> Evidence -> Impact -> Priority -> Action */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">Mahsulot oqimi:</span>
            <span className="rounded bg-white px-2 py-0.5 font-medium border border-slate-200/60 shadow-subtle">
              1. Xom Feedback
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded bg-white px-2 py-0.5 font-medium border border-slate-200/60 shadow-subtle text-amber-700">
              2. Ildiz Muammo
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded bg-white px-2 py-0.5 font-medium border border-slate-200/60 shadow-subtle text-emerald-700">
              3. Mijoz Dalili
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded bg-white px-2 py-0.5 font-medium border border-slate-200/60 shadow-subtle text-rose-700">
              4. Biznes Ta&apos;siri
            </span>
            <span className="text-slate-400">→</span>
            <span className="rounded bg-slate-900 px-2 py-0.5 font-semibold text-white shadow-subtle">
              5. Ustuvor Harakat
            </span>
          </div>
        </div>
      </section>

      {/* 2. Feedback Input & Presets Workspace */}
      <section id="feedback-workspace" className="space-y-4">
        <FeedbackInput
          value={feedbackText}
          onChange={setFeedbackText}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onSelectPreset={handleSelectPreset}
          error={errorState?.type === "validation" ? errorState.message : null}
        />
      </section>

      {/* 3. Error State (Non-validation) */}
      {errorState && errorState.type !== "validation" && (
        <section className="animate-in fade-in duration-200">
          <ErrorAlert
            message={errorState.message}
            type={errorState.type}
            onRetry={handleAnalyze}
            onDismiss={() => setErrorState(null)}
          />
        </section>
      )}

      {/* 4. Loading Shimmer Skeleton State */}
      {isLoading && (
        <section className="animate-in fade-in duration-200 pt-2">
          <SkeletonLoader />
        </section>
      )}

      {/* 5. Analysis Results Dashboard */}
      {analysisData && !isLoading && (
        <section
          ref={resultsRef}
          id="analysis-results"
          className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* Results Action Header Bar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight sm:text-lg">
                Mahsulot Strategik Hisoboti (Customer Intelligence Report)
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleResetAnalysis}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-subtle hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Yangi tahlil boshlash</span>
              </button>
            </div>
          </div>

          {/* Row 1: Executive Summary & Health Score (7 cols) & Sentiment Breakdown (5 cols) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SummaryCard data={analysisData} />
            </div>
            <div className="lg:col-span-5">
              <SentimentCard sentiment={analysisData.sentiment} />
            </div>
          </div>

          {/* Row 2: Top 3 Strategic Insights */}
          <div>
            <TopInsights insights={analysisData.topInsights} />
          </div>

          {/* Row 3: 5-Column Problems Table (Problem | Impact | Evidence | Priority | Action) */}
          <div>
            <ProblemsTable
              problems={analysisData.problems}
              fullAnalysis={analysisData}
              onOpenEvidence={handleOpenEvidence}
            />
          </div>
        </section>
      )}

      {/* 6. Empty State: 3-Step Clear Mental Model */}
      {!analysisData && !isLoading && (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-subtle mb-3">
              <Layers className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Qanday ishlaydi?
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Yuqoridagi maydonga mijozlaringiz bildirgan fikrlarni kiriting yoki bir klik bilan tayyor sanoat keyslaridan birini sinab ko&apos;ring.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                    1
                  </span>
                  <span>Mijozlar ovozini jamlash</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Support chiptalari, do&apos;kon sharhlari va e&apos;tirozlar matnini kiritish yoki sanoat presetini tanlash.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <Zap className="h-3 w-3" />
                <span>4 ta tayyor sanoat keysi</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                    2
                  </span>
                  <span>Ildiz muammolarni ajratish</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Yuzaki shikoyatlar o&apos;rniga tizimli sabablar, mijoz iqtiboslari va biznes xatarlari avtomatik aniqlanadi.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-blue-600 font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Semantik tahlil &amp; 100% oflayn</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                    3
                  </span>
                  <span>Ustuvor harakatlar matritsasi</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  P0/P1/P2 ustuvorliklari, tavsiya etilgan muhandislik yechimlari va Linear/Jira vazifalari formatida eksport.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-indigo-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>CSV, JSON va Linear nusxalash</span>
              </div>
            </div>
          </div>

          {/* Quick Demo CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-500 mr-1">Tezkor sinash:</span>
            <button
              type="button"
              onClick={() => handleQuickLoadPreset("ecommerce")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-subtle hover:bg-slate-100 transition-colors"
            >
              <span>E-commerce do&apos;koni keysi</span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleQuickLoadPreset("b2b-saas")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-subtle hover:bg-slate-100 transition-colors"
            >
              <span>B2B SaaS keysi</span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        </section>
      )}

      {/* Global Evidence Modal */}
      <EvidenceModal
        problem={selectedProblemForEvidence}
        isOpen={isEvidenceModalOpen}
        onClose={() => {
          setIsEvidenceModalOpen(false);
          setSelectedProblemForEvidence(null);
        }}
      />
    </div>
  );
}
