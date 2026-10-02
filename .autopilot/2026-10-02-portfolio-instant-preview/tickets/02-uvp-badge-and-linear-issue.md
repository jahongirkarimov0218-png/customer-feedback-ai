# 02 — Инженерный UVP бейдж, Linear Issue Action Bar и экспорт в Markdown

**Требования:** R08, R09, R10, R11, R12
**Blocked by:** 01
**Зона:** `src/app/page.tsx` · `src/components/results/summary-card.tsx`
**Волна:** 2
**Status:** pending

## Что должно заработать
- Микро-бейдж над Hero H1: `[Shunchaki sentiment emas: Linear va Jira uchun tayyor backlog]` в стиле Linear/Vercel (моноширинный, нейтральный, без эмодзи).
- В блоке «Konkret tavsiya etilgan harakat» (Action Bar) карточки `SummaryCard` четко выделяется формат готовой инженерной задачи: заголовок тикета, приоритет (P0), компонент сбоя и конкретное исправление для спринта.
- Кнопка «Linear vazifa sifatida nusxalash» / «Copy as Linear Issue» копирует задачу в формате Markdown/Linear Issue со статусом подтверждения.
- Все числовые показатели строго в `tabular-nums`, полное отсутствие смайликов и эмодзи.

## Из брифа, дословно
> «Добавь лаконичный бейдж в стиле Linear/Vercel над Hero H1: [Shunchaki sentiment emas: Linear va Jira uchun tayyor backlog]»
> «Стилизация: монохромная субтильная рамка border-slate-200/80 dark:border-neutral-800, моноширинный компактный шрифт, нейтральный фон без ярких неоновых подсветок, без эмодзи»
> «В карточке рекомендаций (Action Bar) явно выделить формат готовой задачи: заголовок тикета, приоритет (P0), компонент сбоя и конкретное исправление для спринта»
> «Добавить кнопку экспорта или копирования задачи в буфер обмена в формате Markdown / Linear Issue (Copy as Linear Issue)»

## Критерии приёмки
- [ ] Над Hero H1 отображается стильный монохромный бейдж без эмодзи.
- [ ] В Action Bar отображается структурированный формат инженерного тикета с приоритетом P0 и компонентом.
- [ ] Кнопка копирования как Linear Issue успешно копирует структурированный Markdown тикет.
- [ ] Числовые показатели используют `tabular-nums`.
