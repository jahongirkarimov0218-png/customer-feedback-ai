# Границы и интерфейсы проекта

## Правила проекта
- **Стек:** Next.js 14.2 (App Router), React 18, TypeScript 5.6, Tailwind CSS 3.4, Lucide React.
- **Команды:**
  * Тесты: `npm test` (Vitest, все 44 теста должны быть зелеными)
  * E2E тесты: `npx playwright test`
  * Сборка: `npm run build`
- **Что не трогать:**
  * Серверная бизнес-логика в `src/app/api/analyze/route.ts` и `src/lib/analyzer/`
  * Модуль безопасности `src/lib/security.ts` (Rate Limiting, Sanitize, CSV injection defense)
  * Не ломать существующие контракты в `src/types/analyzer.ts`
- **Запрет:** Никаких AI-маркетинговых бейджей («AI-powered»), кислотных неоновых градиентов, избыточного размытия блюром.

## Границы, решённые в спецификации

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `ui/layout` | Оболочка, навигация, футер | `<Header />`, `<Footer />` | Внутреннее позиционирование, адаптивные отступы |
| `ui/input` | Ввод текста и пресеты | `<FeedbackInput />`, `<PresetsBar />` | Внутренние тексты пресетов, валидацию длины |
| `ui/results` | Визуализация аналитики | `<SummaryCard />`, `<SentimentCard />`, `<TopInsights />`, `<ProblemsTable />` | Фильтрацию строк, форматирование CSV |
| `engine/analyzer` | Tahlil va AI integratsiya | `analyzeFeedback(text)` | Gemini REST, OpenAI REST, Fallback NLP, Rate limiting |

## Швы для тестирования
- **Шов 1:** API Route `POST /api/analyze` (проверка статус-кодов 200, 400, 413, 429).
- **Шов 2:** Playwright E2E UI Flow (`e2e/product-flow.spec.ts`).
