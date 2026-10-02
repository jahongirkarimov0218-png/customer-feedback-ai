# Спецификация: Полная очистка от AI-slop, интеграция Figma MCP и UI уровня Linear/Raycast

## 1. Контекст и архитектурная цель
Устранить коренную причину (root cause) интерфейсного шума: превратить платформу из «обучающего демо с карточками "как это работает"» в рабочий, строгий инструмент уровня Linear и Raycast. Подтвердить реальную конфигурацию Figma MCP.

## 2. Инструменты и окружение
- **Figma MCP:**
  - Пакет: `figma-developer-mcp` v0.13.2 установлен глобально.
  - Конфигурация: `C:\Users\user\.gemini\config\mcp_config.json` содержит секцию `figma`.
  - Схемы Antigravity: `C:\Users\user\.gemini\antigravity\mcp\figma/` с `instructions.md`, `get_figma_data.json`, `download_figma_images.json`.
  - Переменная окружения: `FIGMA_ACCESS_TOKEN` документирована в `.env.example`.
  - Статус: `CONFIGURED (NEEDS_FIGMA_TOKEN)`.
- **Playwright:** v1.63.0 активен, E2E тесты проверяют реальный браузерный сценарий без моков верстки.

## 3. Копирайтинг и удаление AI-slop
- **Удаляемые сущности:**
  - Секция «Qanday ishlaydi?» (How it works) и 3 карточки с шагами.
  - Цепочка «Mahsulot oqimi: 1. Xom Feedback -> 2. Korneviy...».
  - Технологические плашки: «Next.js 14», «TypeScript 5.6», «Playwright QA», «Zero Latency Local Engine».
  - Декоративные бейджи: «v1.0 · Production Ready», «Live System».
- **Новые тексты:**
  - Hero H1: `Mijoz fikrlarini ustuvor vazifalarga aylantiring`
  - Hero Subtitle: `Tarqoq sharhlardan tizimli muammolarni ajrating, biznesga ta'sirini baholang va keyingi muhandislik qadamini belgilang.`
  - Presets: Горизонтальный ряд чипов `[E-commerce] [B2B SaaS] [Fintech] [Marketplace]`.
  - Input: Placeholder `Mijozlarning xom fikrlari, app store sharhlari yoki intervyu qaydlarini kiriting...`

## 4. Компоненты UI и дизайн-система
- `src/components/layout/header.tsx`:
  - Только минималистичный логотип «Customer Feedback AI», статус готовности и переключатель темы (или чистый монохромный акцент).
  - Никаких плашек стэка или баннеров.
- `src/components/layout/footer.tsx`:
  - Лаконичный копирайт и ссылки. Без технического шума.
- `src/components/presets.tsx`:
  - Горизонтальный ряд аккуратных кнопок-чипов (Linear/Raycast style) с активным состоянием.
- `src/components/feedback-input.tsx`:
  - Текстовое поле с субтильной 1px рамкой `border-slate-200 dark:border-slate-800`.
  - Кнопка CTA «Tahlil qilish» с физикой Emil Kowalski `active:scale-[0.98]`.
- `src/app/page.tsx`:
  - Прямой чистый путь: Hero → Чипы → Поле ввода → Результаты (Insights, Priority Matrix, Action Bar).
  - Никаких обучающих секций или длинных промежуточных блоков.

## 5. Тестирование и верификация
- Vitest: все 44 юнит-теста зеленые.
- Playwright: E2E тесты обновлены под селекторы H1, чипы и экшены.
- Next.js Build: чистая компиляция с exit code 0.
