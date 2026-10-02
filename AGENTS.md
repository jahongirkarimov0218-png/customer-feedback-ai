<!-- autopilot:start -->
# Customer Feedback AI Intelligence

Mijozlarning matnli fikrlarini (feedback) sun'iy intellekt yordamida chuqur semantik tahlil qiluvchi, sentiment, takrorlanuvchi muammolar, 3 ta top insight va ustuvor yechimlar jadvalini ishlab chiquvchi production-ready Next.js SaaS platformasi.

## Ko'rsatmalar va buyruqlar

| Buyruq | Maqsadi |
|--------|---------|
| `npm install` | Bog'liqliklarni o'rnatish |
| `npm run dev` | Mahalliy dev-serverni ishga tushirish (http://localhost:3000) |
| `npm test` | Vitest orqali barcha avtomatlashtirilgan testlarni ishga tushirish (33 ta test) |
| `npm run build` | Next.js production build qilish |

## Loyiha tuzilmasi

```
d:/portfolio/
├── src/
│   ├── app/                    # Next.js App Router (layout, page, globals.css)
│   │   └── api/analyze/        # Server-side Route Handler POST /api/analyze
│   ├── components/             # UI komponentlari
│   │   ├── feedback-input.tsx  # Matn kiritish, belgilar hisoblagichi, CTA
│   │   ├── presets.tsx         # 4 ta sanoat keysi (E-commerce, SaaS, Fintech, Service)
│   │   ├── skeleton-loader.tsx # Shimmer yuklanish animatsiyalari
│   │   ├── error-alert.tsx     # Xatoliklar banneri va retry
│   │   ├── layout/             # Header va Footer
│   │   └── results/            # Natijalar paneli
│   │       ├── summary-card.tsx    # Executive Summary & Health Score
│   │       ├── sentiment-card.tsx  # Positive/Neutral/Negative progress barlar
│   │       ├── top-insights.tsx    # Top 3 ta strategik xulosa
│   │       └── problems-table.tsx  # Muammo | Ustuvorlik | Yechim jadvali (filter, export)
│   ├── lib/
│   │   ├── analyzer/           # AI tahlil arxitekturasi (Gemini, OpenAI, Fallback Engine)
│   │   └── utils.ts            # clsx va twMerge yordamchilari
│   └── types/
│       └── analyzer.ts         # Qat'iy TypeScript interfeyslari
├── test/                       # Vitest test to'plami (unit, integration, e2e)
├── docs/adr/                   # Arxitektura qarorlari qaydlari (ADR 0001, 0002, 0003)
├── vercel.json                 # Vercel deployment konfiguratsiyasi
└── .env.example                # Server muhit o'zgaruvchilari namunasi
```

## Arxitektura va Ma'lumotlar oqimi

1. **Kirish**: Foydalanuvchi matn kiritadi yoki 4 ta presetdan birini tanlaydi.
2. **So'rov**: Client Next.js serveriga `POST /api/analyze` so'rovini yuboradi.
3. **Validatsiya**: Server matn uzunligi va formatini tekshiradi (kamida 10 ta belgi).
4. **AI Tahlil**:
   - `GEMINI_API_KEY` mavjud bo'lsa -> Google Gemini 1.5 modeli.
   - `OPENAI_API_KEY` mavjud bo'lsa -> OpenAI GPT modeli.
   - Kalitsiz yoki xatolikda -> `fallback-engine.ts` (100% oflayn aqlli semantik tahlil).
5. **Chiqish**: Qat'iy JSON formatdagi `AnalysisResponse` mijozga qaytariladi va interaktiv dashboardda render qilinadi.

## Muhit o'zgaruvchilari (Environment Variables)

- `GEMINI_API_KEY`: Google Gemini API kaliti (ixtiyoriy)
- `OPENAI_API_KEY`: OpenAI API kaliti (ixtiyoriy)
- `GROQ_API_KEY`: Groq API kaliti (ixtiyoriy)
*Eslatma: API kalitisiz ham ichki semantik dvigatel tufayli platforma to'liq ishlaydi.*

## Kodlash qoidalari va Dizayn tizimi
- Roma Rayt referensi asosida: No AI-slop, ortiqcha neonlar va keraksiz gradientlarsiz.
- Slate neytral foni, 1px subtle hoshiyalar, Geist/Inter shrift ierarxiyasi.
- Status ranglari: Emerald (ijobiy / low priority), Amber (neytral / medium priority), Rose (salbiy / high priority).

## Autopilot ishlash tartibi
Sборка ведётся навыком `/autopilot`. Требования, спецификация и таски — в `.autopilot/`.
Прогресс — `.autopilot/dashboard.html`. Правило: требование из `manifest.md`
может снять только пользователь.

Если работа продолжается — скажи «продолжи автопилот»: состояние поднимется
из `.autopilot/state.js`, переспрашивать ничего не нужно.
<!-- autopilot:end -->
