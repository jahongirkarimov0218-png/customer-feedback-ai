/**
 * Data contracts for Customer Feedback AI Intelligence
 * Specified in interfaces.md and spec.md
 */

export type PriorityLevel = "high" | "medium" | "low";

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface InsightItem {
  title: string;
  description: string;
}

export interface ProblemSolutionItem {
  problem: string;
  priority: PriorityLevel;
  solution: string;
}

export interface AnalysisResponse {
  summary: string;
  sentiment: SentimentData;
  topInsights: InsightItem[];
  problems: ProblemSolutionItem[];
  meta?: {
    totalWords?: number;
    provider?: "gemini" | "openai" | "groq" | "built-in-semantic-engine";
    processedAt?: string;
  };
}

export interface AnalysisRequest {
  feedback: string;
}
