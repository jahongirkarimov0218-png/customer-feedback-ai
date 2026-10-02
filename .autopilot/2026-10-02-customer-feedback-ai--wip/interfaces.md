# Границы и швы (Interfaces & Contracts)

## Qoidalar va cheklovlar
- **Framework**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Buyruqlar**:
  - O'rnatish: `npm install`
  - Dev server: `npm run dev`
  - Test: `npm test`
  - Production build: `npm run build`
- **Taqiqlangan**: API kalitlarni mijoz (client) tomoniga chiqarish (`NEXT_PUBLIC_` prefiksi bilan AI kalit saqlanmaydi).
- **Bog'liqliklar**: Lucide React iconlar, Tailwind CSS.

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `analyzer-api` (`src/app/api/analyze/`, `src/lib/analyzer/`) | Tahlil logikasi va AI adapter | `POST /api/analyze` -> `AnalysisResponse` | LLM chaqiruvlari, prompt injection himoyasi, fallback tahlil algoritmlari |
| `feedback-store` (`src/components/feedback-input.tsx`) | Kiritilgan matn va holat | `text, sampleSelector, status, data, error` | Validatsiya xatolari, yuklash jarayoni |
| `dashboard-ui` (`src/components/results/`) | Natijalarni vizuallashtirish | `SummaryCard`, `SentimentCard`, `InsightsList`, `ProblemsTable` | Jadval filtrlari, nusxalash interaksiyalari, animatsiyalar |

## Ma'lumotlar turlari (TypeScript Contracts)

```ts
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

## Из таска 01 — Каркас и дизайн-токены
- `src/types/analyzer.ts`: `PriorityLevel`, `SentimentData`, `InsightItem`, `ProblemSolutionItem`, `AnalysisResponse`, `AnalysisRequest`
- `src/lib/utils.ts`: `cn(...inputs)` yordamchi funksiyasi
- `src/components/layout/header.tsx`: `<Header />`
- `src/components/layout/footer.tsx`: `<Footer />`
- Dizayn tizimi: Tailwind font-sans Geist/Inter, slate-900 surface, border-slate-800, emerald/amber/rose semantik ranglar
- Test komandasi: `npm test` (Vitest), `npm run build` (Next.js build)

```
