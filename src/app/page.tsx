"use client";

import React, { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
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
import { FeedbackPreset } from "@/components/presets";
import { AnalysisResponse, ProblemSolutionItem } from "@/types/analyzer";

export default function HomePage() {
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [errorState, setErrorState] = useState<{
    message: string;
    type: ErrorType;
  } | null>(null);

  const [selectedProblemForEvidence, setSelectedProblemForEvidence] =
    useState<ProblemSolutionItem | null>(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    const trimmed = feedbackText.trim();
    if (trimmed.length < 10) {
      setErrorState({
        message:
          "Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak. Iltimos, batafsilroq sharh yozing yoki namunalardan birini tanlang.",
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

  const handleOpenEvidence = (problem: ProblemSolutionItem) => {
    setSelectedProblemForEvidence(problem);
    setIsEvidenceModalOpen(true);
  };

  const handleScrollToMatrix = () => {
    document.getElementById("problems-matrix")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* 1. Concise, Outcome-Focused Hero (Raycast & Linear Standard) */}
      <section className="space-y-3 pt-2 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-[1.12]">
          Mijoz fikrlarini ustuvor vazifalarga aylantiring
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
          Tarqoq sharhlardan tizimli muammolarni ajrating, biznesga ta&apos;sirini baholang va keyingi muhandislik qadamini belgilang.
        </p>
      </section>

      {/* 2. Focused Feedback Input & Chip Presets Workspace */}
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

      {/* 3. Error Alert */}
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

      {/* 4. Loading State */}
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
          {/* Header Bar */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-slate-900" />
              <h2 className="text-base font-semibold text-slate-900 tracking-tight sm:text-lg">
                Tahlil natijalari
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleResetAnalysis}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98] transition-transform duration-100 ease-out"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Yangi tahlil</span>
              </button>
            </div>
          </div>

          {/* Row 1: Executive Summary & Sentiment */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SummaryCard
                data={analysisData}
                onScrollToMatrix={handleScrollToMatrix}
              />
            </div>
            <div className="lg:col-span-5">
              <SentimentCard sentiment={analysisData.sentiment} />
            </div>
          </div>

          {/* Row 2: Top 3 Strategic Insights */}
          <div>
            <TopInsights insights={analysisData.topInsights} />
          </div>

          {/* Row 3: Priority Matrix (P0/P1/P2) & Filtered Problem-Solution Table */}
          <div id="problems-matrix">
            <ProblemsTable
              problems={analysisData.problems}
              fullAnalysis={analysisData}
              onOpenEvidence={handleOpenEvidence}
            />
          </div>
        </section>
      )}

      {/* Verbatim Customer Evidence Modal */}
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
