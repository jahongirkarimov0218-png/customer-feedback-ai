# 01 — Конфигурация и верификация Figma MCP

**Требования:** R01, R02
**Blocked by:** []
**Зона:** `C:\Users\user\.gemini\config\mcp_config.json`, `C:\Users\user\.gemini\antigravity\mcp\figma`, `.env.example`
**Волна:** 1
**Status:** done

## Что должно заработать
- Установка и доступность CLI `figma-developer-mcp` (v0.13.2).
- Конфигурация MCP в `mcp_config.json`.
- Схемы инструментов и инструкции в `C:\Users\user\.gemini\antigravity\mcp\figma/`.
- Документирование `FIGMA_ACCESS_TOKEN` в `.env.example`.
- Статус: `CONFIGURED (NEEDS_FIGMA_TOKEN)`.

## Критерии приёмки
- [x] CLI `figma-developer-mcp` выполняется без ошибок
- [x] `mcp_config.json` содержит валидный блок `figma`
- [x] Схемы созданы в каталоге antigravity
- [x] Переменная документирована в `.env.example`
