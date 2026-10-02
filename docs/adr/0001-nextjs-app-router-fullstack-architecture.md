# ADR 0001: Next.js App Router Full-Stack Arxitekturasi

## Kontekst
Portfolio uchun "Mijoz fikrlarini AI orqali tahlil qilish" platformasi ishlab chiqilmoqda. Talablar: zamonaviy full-stack veb-platforma, Vercel platformasiga 1 klikda deploy bo'lishi, frontend va backend bitta repozitoriyda qulay boshqarilishi, server-side API orqali maxfiy kalitlarni himoya qilish.

## Yechim
Next.js 14+ (App Router) + TypeScript + Tailwind CSS steki tanlandi. API so'rovlari `src/app/api/analyze/route.ts` Route Handler orqali amalga oshiriladi.

## Nega (va nimalar rad etildi)
- Rad etildi: Alohida Express/FastAPI serveri — qo'shimcha infratuzilma, 2 ta alohida deploy (backend + frontend) talab qiladi, portfolioni ishga tushirishni sekinlashtiradi.
- Rad etildi: Client-side to'g'ridan-to'g'ri AI so'rovlari — API kalitlari brauzerda fosh bo'ladi (xavfsizlik talabiga zid).
- Tanlandi: Next.js App Router — yagona kod bazasi, server-side xavfsizlik, Vercel bilan tabiy integratsiya, tezkor SSR va statik optimallashtirish.

## Oqibatlar
Barcha backend logikasi server runtime muhitida ishlaydi. Vercel serverless function chegaralariga (timeout va payload hajmi) e'tibor qaratilishi kerak.
