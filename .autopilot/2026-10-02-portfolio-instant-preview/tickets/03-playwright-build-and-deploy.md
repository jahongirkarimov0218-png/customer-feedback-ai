# 03 — Playwright E2E тесты, валидация Figma Bridge MCP, чистый build и Vercel deploy

**Требования:** R13, R14, R15, R16, R17
**Blocked by:** 02
**Зона:** `e2e/product-flow.spec.ts` · `playwright.config.ts`
**Волна:** 3
**Status:** pending

## Что должно заработать
- Playwright E2E тесты дополняются сценарием Instant Preview (клик по кнопке, моментальный рендеринг дашборда, проверка отображения карточек, клик по экспорту Linear issue, фильтрация приоритетов).
- Все тесты (5/5+) завершаются успешно в Desktop Chrome и Mobile Chrome.
- Figma Bridge MCP сервер сохраняет валидный статус соединения.
- `npm run build` проходит без единой ошибки TypeScript и линтера.
- Изменения коммитятся и пушатся в `origin main`, проверяется статус 200 OK на Vercel URL.
- В самом конце отчета строго выводится одна строка сводки в требуемом формате.

## Из брифа, дословно
> «Напиши или обнови E2E тест в e2e/product-flow.spec.ts для проверки сценария «Instant Preview»: клик по кнопке «Jonli namunani ko'rish», проверка видимости матрицы проблем и блока Action Bar без сетевых ошибок, проверка работы фильтрации P0/P1/P2. Все тесты должны завершаться со статусом passed (4/4 или более)»
> «Сохраняй валидный статус Figma Bridge MCP. Выполни валидацию сборки (npm run build) без ошибок линтера и TypeScript»
> «Production Build и Vercel Deploy: отправить изменения в origin main и верифицируй ответ production URL через HTTP 200 OK»
> «В самом конце ответа выведи строго одну строку сводки без сопроводительного текста»

## Критерии приёмки
- [ ] Тест `e2e/product-flow.spec.ts` покрывает сценарий Instant Preview и проходит на всех платформах.
- [ ] `npm test` и `npx playwright test` дают 100% pass.
- [ ] `npm run build` завершается с кодом 0.
- [ ] Репозиторий запушен в `origin main`, Vercel production доступен по HTTP 200 OK.
- [ ] Финальная строка отчета строго следует формату.
