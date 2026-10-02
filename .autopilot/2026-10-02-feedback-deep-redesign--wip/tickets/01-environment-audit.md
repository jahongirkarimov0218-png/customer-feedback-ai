# 01 — Аудит окружения и честная верификация инструментов

**Требования:** R01, R02, R03, R04, R05
**Blocked by:** []
**Зона:** `.autopilot/`
**Волна:** 1
**Status:** ready

## Что должно заработать
Честная инструментальная инспекция 5 компонентов:
1. Emil Kowalski Design skill — проверен в `C:\Users\user\.gemini\config\skills\emil-design-eng` (INSTALLED)
2. Impeccable Design skill — проверен в `C:\Users\user\.gemini\config\skills\impeccable` (INSTALLED)
3. Taste / Inspiration skill — проверен в `design-taste-frontend` и `high-end-visual-design` (INSTALLED)
4. Figma MCP — проверен в `C:\Users\user\.gemini\antigravity\mcp` (UNAVAILABLE / NOT INSTALLED)
5. Playwright — проверен через `npx playwright --version` (v1.63.0, INSTALLED)

## Из брифа, дословно
> «Инспекция инструментов и скиллов: Emil Kowalski Design skill, Impeccable Design skill, Taste / Inspiration skill, Figma MCP, Playwright»
> «Запрещено утверждать, что инструмент, MCP-сервер или скилл установлен, если не выполнены команды проверки его наличия в системе»
> «Если инструмент физически отсутствует в среде или внешний MCP недоступен, строго зафиксируй статус: UNAVAILABLE / NOT INSTALLED. Не имитируй его работу.»

## Разделы спецификации
Спецификация §2, §3 (#1-#3), §4.

## Критерии приёмки
- [ ] Выполнены физические команды проверки файловой системы и CLI
- [ ] Figma MCP честно зафиксирован как `UNAVAILABLE / NOT INSTALLED`
- [ ] Подтверждена готовность компенсации отсутствия внешнего Figma MCP через кодовые токены
