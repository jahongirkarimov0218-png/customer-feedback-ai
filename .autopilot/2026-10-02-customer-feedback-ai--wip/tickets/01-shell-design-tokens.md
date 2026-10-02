# 01 — Next.js Shell, Design System & Data Contracts

**Требования:** R01, R08, R09, R12
**Blocked by:** —
**Зона:** `src/types/`, `src/app/`, `tailwind.config.ts`, `package.json`
**Волна:** 1
**Status:** ready

## Что должно заработать
Next.js 14+ TypeScript loyihasi, Tailwind CSS konfiguratsiyasi va dizayn tokenlari (Roma Rayt referensiga mos toza zamonaviy SaaS layout, crisp borders, subtle shadows, responsive container). Asosiy layout, header, footer va TypeScript interfeyslari tayyor bo'lishi kerak.

## Из брифа, дословно
> «Portfolio uchun production-ready “Mijoz fikrlarini AI orqali tahlil qilish” web-platformasini noldan yarating»
> «Next.js full-stack, TypeScript, Tailwind CSS, zamonaviy reusable UI components»
> «Dizayn va UX uchun ushbu videoni vizual reference sifatida tahlil qiling: https://youtu.be/-WDP_-MH3uI»

## Разделы спецификации
Решения по реализации §1, §2, Границы и швы §1.

## Критерии приёмки
- [ ] Next.js 14/15 App Router va TypeScript to'liq sozlangan
- [ ] Tailwind CSS sozlangan (ranglar, spacing, shriftlar, micro-interaction klasslari)
- [ ] TypeScript interfeyslari `src/types/analyzer.ts` da yozilgan
- [ ] Premium Header va Footer komponentlari yaratilgan
- [ ] `npm run dev` va `npm run build` muammosiz ishga tushadi
