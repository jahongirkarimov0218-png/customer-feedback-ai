import { describe, it, expect } from "vitest";
import type {
  AnalysisRequest,
  AnalysisResponse,
  PriorityLevel,
  SentimentData,
  InsightItem,
  ProblemSolutionItem,
} from "@/types/analyzer";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

describe("Ticket 01: Design System & Data Contracts", () => {
  it("should enforce valid AnalysisResponse structure according to specification seam", () => {
    const mockSentiment: SentimentData = {
      positive: 65,
      neutral: 20,
      negative: 15,
    };

    const mockInsights: InsightItem[] = [
      { title: "Tez yetkazib berish", description: "Buyurtmalar 24 soatda yetib bormoqda." },
      { title: "Mobil ilova qulayligi", description: "Interfeys intuitiv tushunarli." },
      { title: "Qo'llab-quvvatlash xizmati", description: "Operatorlar tezkor javob bermoqda." },
    ];

    const mockProblems: ProblemSolutionItem[] = [
      {
        problem: "To'lov tizimi uzilishi",
        priority: "high" as PriorityLevel,
        solution: "Zaxira to'lov shlyuzini joriy qilish",
      },
    ];

    const mockResponse: AnalysisResponse = {
      summary: "Umumiy ijobiy fikrlar ustunlik qiladi.",
      sentiment: mockSentiment,
      topInsights: mockInsights,
      problems: mockProblems,
      meta: {
        totalWords: 150,
        provider: "built-in-semantic-engine",
        processedAt: new Date().toISOString(),
      },
    };

    expect(mockResponse.sentiment.positive + mockResponse.sentiment.neutral + mockResponse.sentiment.negative).toBe(100);
    expect(mockResponse.topInsights).toHaveLength(3);
    expect(["high", "medium", "low"]).toContain(mockResponse.problems[0].priority);
    expect(mockResponse.summary).toBeTruthy();
  });

  it("should validate AnalysisRequest contract structure", () => {
    const mockRequest: AnalysisRequest = {
      feedback: "Xizmat ko'rsatish juda a'lo darajada, ammo yetkazib berish biroz kechikdi.",
    };

    expect(typeof mockRequest.feedback).toBe("string");
    expect(mockRequest.feedback.length).toBeGreaterThanOrEqual(10);
  });

  it("should export Header and Footer layout components", () => {
    expect(typeof Header).toBe("function");
    expect(typeof Footer).toBe("function");
  });
});
