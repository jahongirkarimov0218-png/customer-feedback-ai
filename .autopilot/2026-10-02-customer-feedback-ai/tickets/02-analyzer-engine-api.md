# 02 — AI Analysis Engine & Server API Route (`/api/analyze`)

**Требования:** R03, R04, R05, R06, R07, R10
**Blocked by:** 01
**Зона:** `src/app/api/analyze/`, `src/lib/analyzer/`
**Волна:** 2
**Status:** ready

## Что должно заработать
Server-side Next.js Route Handler `POST /api/analyze`. Kiruvchi matnni tekshirish, server-side `.env` orqali AI (Gemini / OpenAI / Groq) ga chaqiruv jo'natish, qat'iy JSON formatda javob olish, hamda API kalit bo'lmaganda yoki tarmoq xatolarida ishlovchi aqlli semantik tahlil dvigateli (built-in fallback engine).

## Из брифа, дословно
> «API/backend server-side route orqali»
> «AI API kalitlari faqat serverda va .env orqali»
> «structured JSON AI response»
> «AI faqat berilgan feedback asosida xulosa qilsin; mavjud bo‘lmagan faktlarni uydirmasin»

## Разделы спецификации
Решения по реализации §3, §4, Границы и швы §1.

## Критерии приёмки
- [ ] `POST /api/analyze` server route mavjud
- [ ] Input validation (bo'sh yoki juda qisqa matnga 400 xatosi)
- [ ] Gemini va OpenAI provider integratsiyasi
- [ ] 100% ishonchli Built-in Semantic Fallback Engine (kalitsiz ham tahlil to'liq ishlaydi)
- [ ] Qat'iy structured JSON formati: `{ summary, sentiment, topInsights, problems }`
