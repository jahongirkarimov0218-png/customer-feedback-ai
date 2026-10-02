# Манифест требований

Источник: `2026-10-02-brief.md`. Строку из этого списка может снять **только пользователь**.

| ID | Из брифа (дословно) | Статус | Основание | Где |
|----|---------------------|--------|-----------|-----|
| R01 | «Добавь рядом с кнопкой отправки (или непосредственно под основным заголовком) кнопку быстрого действия: «Jonli namunani ko'rish ->»» | done | — | src/components/feedback-input.tsx, src/app/page.tsx |
| R02 | «Кнопка должна обладать тактильным откликом по физике Emil Kowalski (active:scale-[0.98] transition-transform duration-100 ease-out)» | done | — | src/components/feedback-input.tsx |
| R03 | «В 1 клик без задержек и ожидания сети подставляет эталонный мок-датасет в состояние приложения» | done | — | src/app/page.tsx, src/lib/benchmark-data.ts |
| R04 | «Мгновенно отображает полный рабочий дэшборд: матрицу проблем с фильтрами P0/P1/P2, NPS/Health Score, 3 ключевых инсайта, модальное окно с цитатами и Action Bar с инженерной рекомендацией» | done | — | src/app/page.tsx, src/lib/benchmark-data.ts |
| R05 | «Выполняет плавный программный скролл (behavior: 'smooth') к блоку результатов, фокусируя пользователя на аналитике» | done | — | src/app/page.tsx |
| R06 | «Ручной ввод текста и пресеты индустрий остаются полностью рабочими» | done | — | src/components/feedback-input.tsx, src/app/page.tsx |
| R07 | «При наличии сгенерированных результатов кнопка позволяет мгновенно сбросить или перезагрузить демонстрационные данные» | done | — | src/app/page.tsx |
| R08 | «Добавь лаконичный бейдж в стиле Linear/Vercel над Hero H1: [Shunchaki sentiment emas: Linear va Jira uchun tayyor backlog]» | done | — | src/app/page.tsx |
| R09 | «Стилизация: монохромная субтильная рамка border-slate-200/80, моноширинный компактный шрифт, нейтральный фон без ярких неоновых подсветок, без эмодзи» | done | — | src/app/page.tsx |
| R10 | «В карточке рекомендаций (Action Bar) явно выделить формат готовой задачи: заголовок тикета, приоритет (P0), компонент сбоя и конкретное исправление для спринта» | done | — | src/components/results/summary-card.tsx |
| R11 | «Добавить кнопку экспорта или копирования задачи в буфер обмена в формате Markdown / Linear Issue (Copy as Linear Issue)» | done | — | src/components/results/summary-card.tsx |
| R12 | «Стек шрифтов: Geist Sans / Inter. Все числовые индикаторы, проценты и счетчики строго в tabular-nums. Полное отсутствие смайликов и эмодзи» | done | — | src/components/results/summary-card.tsx, src/app/page.tsx |
| R13 | «Напиши или обнови E2E тест в e2e/product-flow.spec.ts для проверки сценария «Instant Preview»: клик, видимость матрицы, Action Bar, фильтрация P0/P1/P2, все тесты passed» | done | — | e2e/product-flow.spec.ts (6/6 passed) |
| R14 | «Сохранять валидный статус Figma Bridge MCP» | done | — | figma-bridge MCP active (WebSocket :1994) |
| R15 | «Выполни валидацию сборки (npm run build) без ошибок линтера и TypeScript» | done | — | next build (100% clean) |
| R16 | «Production Build и Vercel Deploy: отправить изменения в origin main и верифицируй ответ production URL через HTTP 200 OK» | done | — | git push origin main, HTTP 200 OK |
| R17 | «В самом конце ответа выведи строго одну строку сводки без сопроводительного текста: Skills: ... | Issues: ...» | done | — | final response format |
