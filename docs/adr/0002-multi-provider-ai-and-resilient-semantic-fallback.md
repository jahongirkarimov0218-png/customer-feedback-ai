# ADR 0002: Ko'p Provayderli AI va Ichki Semantik Fallback Arxitekturasi

## Kontekst
Foydalanuvchilar va portfolio baholovchilari (recruiter, team lead, mijozlar) platformani darhol sinab ko'rishlari kerak. Agar AI API kaliti (Google Gemini yoki OpenAI) kiritilmagan bo'lsa yoki API kvotasi/chegarasi tugasa, platforma xatolik (500 error yoki oq ekran) bermasligi shart.

## Yechim
Server tomonida ko'p darajali arxitektura qurildi:
1. Agar `GEMINI_API_KEY` mavjud bo'lsa -> Google Gemini modelidan structured JSON olinadi.
2. Agar `OPENAI_API_KEY` mavjud bo'lsa -> OpenAI modelidan foydalaniladi.
3. Agar kalitlar bo'lmasa yoki tarmoq/kvota xatosi yuz bersa -> `fallback-engine.ts` (ichki aqlli semantik NLP algoritmi) ishga tushadi.

## Nega (va nimalar rad etildi)
- Rad etildi: Faqat tashqi API ga bog'lanish — API kalitisiz loyiha umuman ishlamas edi va portfolio tomoshabinlari uchun to'siq (friction) yaratardi.
- Rad etildi: Oddiy statik mock JSON — har qanday matnga bir xil soxta javob qaytarish foydalanuvchiga taassurot qoldirmaydi.
- Tanlandi: Dinamik ichki semantik tahlil — matn leksikasi, kalit so'zlari va his-tuyg'ularini real hisoblab, to'liq dinamik natija beradi.

## Oqibatlar
Platforma har qanday sharoitda 100% ishlaydi va Vercel'da ham darhol sinab ko'rishga tayyor.
