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
import { FEEDBACK_PRESETS, FeedbackPreset } from "@/components/presets";
import { AnalysisResponse } from "@/types/analyzer";

export default function HomePage() {
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [errorState, setErrorState] = useState<{
    message: string;
    type: ErrorType;
  } | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    const trimmed = feedbackText.trim();
    if (trimmed.length < 10) {
      setErrorState({
        message: "Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak. Iltimos, batafsilroq sharh yozing yoki tayyor namunalardan birini tanlang.",
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
        type: errorMessage.toLowerCase().includes("network") ? "network" : "server",
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-10">
      {/* 1. Hero Section */}
      <section className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-subtle">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Semantic AI Intelligence • Roma Rayt Pattern</span>
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Mijozlaringiz nima deyayotganini chuqur tushuning
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Mijozlar sharhlari va e&apos;tirozlarini bir zumda tahlil qiling: aniq sentiment taqsimoti,
          3 ta eng muhim strategik insight va amaliy yechimlar jadvali.
        </p>

        {/* Value Prop Feature Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
            <span>Sentiment Tahlili</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <span>Top 3 Xulosalar</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span>Ustuvor Yechimlar Matritsasi</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Smart Fallback Engine</span>
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
                Tahlil Natijalari (AI Intelligence Report)
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

          {/* Row 1: Executive Summary (60%) & Sentiment Breakdown (40%) */}
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

          {/* Row 3: Problems, Priority & Solutions Matrix Table */}
          <div>
            <ProblemsTable
              problems={analysisData.problems}
              fullAnalysis={analysisData}
            />
          </div>
        </section>
      )}

      {/* 6. Empty State: Educational & Quick Guidance (shown before first analysis) */}
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
                  <span>Fikrlarni yuklash</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real mijoz sharhlari, e&apos;tirozlari va takliflari kiritiladi yoki preset tanlanadi.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <Zap className="h-3 w-3" />
                <span>4 ta tayyor namuna mavjud</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                    2
                  </span>
                  <span>Semantik tahlil</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Google Gemini / GPT-4o yoki ichki Smart Fallback dvigateli orqali chuqur semantik sintez.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-blue-600 font-medium">
                <Sparkles className="h-3 w-3" />
                <span>100% oflayn kafolat</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]">
                    3
                  </span>
                  <span>Yechimlar Matritsasi</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Muammolar ustuvorlik (High/Medium/Low) bo&apos;yicha saralanadi va CSV/JSON eksport qilinadi.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-indigo-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>Eksport va nusxalash</span>
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
    </div>
  );
}
