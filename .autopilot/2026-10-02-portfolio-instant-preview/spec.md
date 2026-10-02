# Спецификация: Senior Portfolio Polish, Instant Preview & Linear Issue UVP

## 1. Обзор и цели

Цель спецификации — трансформация проекта Customer Feedback AI в эталонный кейс для портфолио Senior AI Product Designer / Full-Stack Engineer, обеспечивающий моментальную 5-секундную конверсию для технических лидеров и HR.

---

## 2. Архитектура и компонентная модель

### §1. Instant Preview Trigger (`src/components/feedback-input.tsx` & `src/app/page.tsx`)
- Кнопка действия: «Jonli namunani ko'rish ->» («Посмотреть живой пример ->») размещается в контрольной панели ввода рядом с кнопкой отправки или непосредственно под блоком пресетов.
- Физика Emil Kowalski: `active:scale-[0.98] transition-all duration-100 ease-out`, тонкая рамка `border-slate-200/90`, фоновый hover-эффект `hover:bg-slate-50`.
- Поведение при клике: функция `handleInstantPreview` подставляет эталонный `BENCHMARK_ANALYSIS_DATA` в состояние `analysisData`, минуя сетевое ожидание.
- Плавный программный скролл: `resultsRef.current?.scrollIntoView({ behavior: 'smooth' })`.
- При уже отображенных результатах кнопка позволяет мгновенно перезагрузить демонстрационные данные.

### §2. Инженерный UVP и Micro-Badge (`src/app/page.tsx`)
- Над Hero H1 внедряется лаконичный бейдж:
  `[Shunchaki sentiment emas: Linear va Jira uchun tayyor backlog]`
- Стиль Linear / Vercel:
  - Монохромная рамка: `border border-slate-200/80 bg-slate-50/70`.
  - Моноширинный компактный шрифт: `font-mono text-[11px] font-medium text-slate-700`.
  - Полное отсутствие смайликов и эмодзи (используется лаконичная SVG иконка `Terminal` / `Cpu` / статусная точка).

### §3. Linear Issue Export & Action Card (`src/components/results/summary-card.tsx`)
- В блоке «Konkret tavsiya etilgan harakat» (Action Bar) явно структурируется формат готовой инженерной задачи:
  - Ticket: `[P0] To'lov gateway xatosi va kassa qotib qolishi`
  - Priority: `P0 (Critical Churn Risk)`
  - Component: `PaymentGateway / CheckoutService`
  - Sprint Action: `Idempotency-Key qo'shish va 3D-Secure timeoutlarini qayta ko'rib chiqish`
- Добавляется кнопка «Linear vazifa sifatida nusxalash» / «Copy as Linear Issue»:
  - Копирует отформатированный Markdown тикет с цитатами клиентов и решением в буфер обмена.
  - Показывает визуальное подтверждение `Nusxalandi` с иконкой `Check`.

---

## 3. Требования к верификации и тестам

### §4. Браузерные E2E тесты (`e2e/product-flow.spec.ts`)
- Добавить полноценный E2E тест на сценарий «Instant Preview»:
  - Загрузка страницы → поиск кнопки «Jonli namunani ko'rish».
  - Клик по кнопке → мгновенное появление `#analysis-results`.
  - Проверка отображения бейджа UVP, матрицы проблем, блока Action Bar.
  - Клик по кнопке «Linear vazifa sifatida nusxalash».
  - Проверка фильтров P0/P1/P2.
- Запуск тестов в Playwright на Desktop Chrome и Mobile Chrome — 100% pass (5/5 или более).

---

## 4. Карта требований к таскам

- **Таск 01 (T01)**: Внедрение Instant Preview и эталонного датасета (R01, R02, R03, R04, R05, R06, R07).
- **Таск 02 (T02)**: Инженерный UVP бейдж, Linear Issue Action Bar и экспорт в Markdown (R08, R09, R10, R11, R12).
- **Таск 03 (T03)**: Playwright E2E тесты, валидация Figma Bridge MCP, чистый build и Vercel deploy (R13, R14, R15, R16, R17).
