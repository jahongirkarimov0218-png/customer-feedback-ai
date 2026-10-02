/**
 * Data contracts for Customer Feedback Product Intelligence
 * Product-First Architecture: Feedback -> Root Cause -> Evidence -> Impact -> Priority -> Action
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
  impactTag?: string; // masalan: "Revenue Impact", "Churn Risk", "CX Lever"
  evidenceQuote?: string; // mijozning aniq so'zi
}

export interface EvidenceQuote {
  quote: string;
  source: string; // masalan: "App Store Review", "Support Ticket #3892", "Intercom", "Sales Call"
  sentiment?: "positive" | "neutral" | "negative";
  authorTier?: string; // masalan: "Enterprise", "Pro Client", "Yangi foydalanuvchi"
}

export interface ProblemSolutionItem {
  problem: string;
  priority: PriorityLevel;
  solution: string;
  impact?: string; // masalan: "Konversiyaning 18% yo'qotilishi xavfi", "MRR Churn xatari"
  category?: string; // masalan: "To'lov & Billing", "Yetkazib berish", "UI/UX & Crash", "Xizmat sifati"
  actionItem?: string; // Tezkor tavsiya etilgan mahsulot harakati
  evidenceQuotes?: EvidenceQuote[]; // Haqiqiy mijoz iqtiboslari
}

export interface BurningIssue {
  title: string;
  impact: string;
  affectedPercentage: number;
  urgency: "critical" | "high" | "medium";
  action: string;
}

export interface AnalysisResponse {
  summary: string;
  burningIssue?: BurningIssue;
  sentiment: SentimentData;
  topInsights: InsightItem[];
  problems: ProblemSolutionItem[];
  meta?: {
    totalWords?: number;
    provider?: "gemini" | "openai" | "groq" | "built-in-semantic-engine";
    processedAt?: string;
    evidenceCount?: number;
  };
}

export interface AnalysisRequest {
  feedback: string;
}
