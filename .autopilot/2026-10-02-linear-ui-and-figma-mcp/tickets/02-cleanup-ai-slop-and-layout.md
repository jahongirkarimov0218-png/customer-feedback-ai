# 02 — Удаление AI-slop, очистка Header, Footer и Layout

**Требования:** R03, R04, R05, R11, R12
**Blocked by:** []
**Зона:** `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/app/page.tsx`
**Волна:** 1
**Status:** done

## Что должно заработать
- Полное удаление секции «Qanday ishlaydi?» и 3 карточек.
- Полное удаление цепочки «Mahsulot oqimi».
- Очистка Header и Footer от любых бейджей стэка («Next.js 14», «TypeScript 5.6», «Playwright QA», «Zero Latency», «Live System», «Production Ready»).
- Минималистичный премиальный вид уровня Linear.

## Критерии приёмки
- [x] Секция «Qanday ishlaydi?» отсутствует в DOM
- [x] Цепочка «Mahsulot oqimi» отсутствует в DOM
- [x] В хедере и футере нет технологических бейджей
- [x] Все тесты `npm test` остаются зелеными
