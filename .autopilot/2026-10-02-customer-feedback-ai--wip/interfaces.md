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

## Из таска 02 — Движок анализа и серверный API
- `src/lib/analyzer/fallback-engine.ts`: `analyzeFeedbackFallback(text: string): AnalysisResponse` (100% oflayn aqlli semantik tahlil)
- `src/lib/analyzer/gemini.ts`: `analyzeWithGemini(text: string): Promise<AnalysisResponse | null>`
- `src/lib/analyzer/openai.ts`: `analyzeWithOpenAI(text: string): Promise<AnalysisResponse | null>`
- `src/lib/analyzer/index.ts`: `analyzeFeedback(text: string): Promise<AnalysisResponse>` (ko'p provayderli, fallback bilan kafolatlangan)
- `src/app/api/analyze/route.ts`: `POST /api/analyze` Route Handler (400 bad request, 200 AnalysisResponse)

## Из таска 03 — Ввод отзывов, пресеты и скелетоны

- `src/components/presets.tsx`: `FeedbackPreset`, `FEEDBACK_PRESETS` (4 ta real sanoat keysi), `<Presets />`
- `src/components/feedback-input.tsx`: `<FeedbackInput />`, `getFeedbackStats(text)`
- `src/components/skeleton-loader.tsx`: `<SkeletonLoader />`, `<SummarySkeleton />`, `<SentimentSkeleton />`, `<InsightsSkeleton />`, `<ProblemsSkeleton />`
- `src/components/error-alert.tsx`: `<ErrorAlert />`

## Из таска 04 — Визуализация результатов и дашборд
- `src/components/results/summary-card.tsx`: `<SummaryCard />`, `calculateHealthScore(sentiment)`
- `src/components/results/sentiment-card.tsx`: `<SentimentCard />`, `getSentimentStatus(sentiment)`
- `src/components/results/top-insights.tsx`: `<TopInsights />`, `getInsightImpactTag(insight, index)`
- `src/components/results/problems-table.tsx`: `<ProblemsTable />`, `filterProblemsByPriority()`, `exportProblemsToCSV()`, `exportAnalysisToJSON()`
- `src/components/results/index.ts`: Barcha natija komponentlari eksporti
- `src/app/page.tsx`: Asosiy Next.js sahifasi, to'liq end-to-end integratsiya

## Из таска 05 — Тестирование, Vercel и документация
- `vercel.json`: Vercel deploy konfiguratsiyasi
- `.env.example`: Server muhit o'zgaruvchilari bo'yicha qo'llanma
- `test/e2e-workflow.test.ts`: E2E integratsion testlar (33 ta umumiy test)
- `README.md`: To'liq foydalanish va deploy qo'llanmasi




```
