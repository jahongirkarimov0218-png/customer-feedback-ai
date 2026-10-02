# Швы и границы (Interfaces)

## Границы, решённые в спецификации

### 1. `src/components/feedback-input.tsx`
- Экспортирует компонент `FeedbackInput`.
- Пропсы:
  ```ts
  export interface FeedbackInputProps {
    onSubmit: (feedback: string) => void;
    isLoading?: boolean;
    initialValue?: string;
    onInstantPreview?: () => void; // New trigger
    hasResults?: boolean;         // New state indicator
  }
  ```
- Кнопка «Jonli namunani ko'rish ->»:
  - Стилизация: `active:scale-[0.98] transition-all duration-100 ease-out border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-medium`.

### 2. `src/app/page.tsx`
- Инженерный бейдж над Hero H1:
  - `[Shunchaki sentiment emas: Linear va Jira uchun tayyor backlog]`
  - Моноширинный компактный стиль без эмодзи.
- Константа `BENCHMARK_ANALYSIS_DATA`:
  - Полный эталонный ответ `AnalysisResponse` с детальными проблемами, P0/P1/P2, цитатами клиентов и решением.
- Обработчик `handleInstantPreview`:
  - Мгновенная установка `analysisData = BENCHMARK_ANALYSIS_DATA`.
  - Плавный скролл `resultsRef.current?.scrollIntoView({ behavior: 'smooth' })`.

### 3. `src/components/results/summary-card.tsx`
- Структурированный формат готовой инженерной задачи (Action Bar):
  - Ticket ID / Название тикета, приоритет (P0), компонент, конкретное действие для спринта.
- Кнопка «Linear vazifa sifatida nusxalash» / «Copy as Linear Issue»:
  - Копирует Markdown представление тикета:
    ```markdown
    [P0] To'lov gateway xatosi va kassa qotib qolishi
    Priority: P0 Critical
    Component: PaymentGateway / CheckoutService
    Action: Idempotency-Key qo'shish va 3D-Secure timeoutlarini qayta ko'rib chiqish
    Customer Quote: "Karta orqali to'lov qilganda pul yechildi, lekin buyurtma tasdiqlanmadi..."
    ```

### 4. Тесты:
- `npm test`: 44/44 unit test pass.
- `npx playwright test`: 5/5+ E2E test pass (включая проверку Instant Preview и копирования в буфер обмена).
