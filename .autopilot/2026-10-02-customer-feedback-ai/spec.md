# Спецификация: Customer Feedback AI Intelligence

## Задача

Mahsulot va xizmat egalari (SaaS, E-commerce, mobil ilova, servislar) har kuni yuzlab mijoz fikrlari, sharhlari va e'tirozlarini oladi. Biroq bu fikrlarni qo'lda o'qib chiqish, saralash, qaysi muammo biznesga ko'proq ziyon yetkazayotganini aniqlash va ustuvor yechimlar ishlab chiqish soatlab vaqt oladi. Natijada muhim xatolar e'tibordan chetda qoladi, mijozlar ketib qoladi va konversiya pasayadi.

## Решение

Zamonaviy, minimal va premium AI SaaS veb-platformasi (Next.js full-stack):
1. Foydalanuvchi mijoz sharhlari va fikrlarini matn shaklida kiritadi yoki 4 xil tayyor real keyslardan birini 1-bosishda yuklaydi.
2. AI semantik tahlil qilib, sentiment ko'rsatkichlarini (Ijobiy, Neytral, Salbiy foizlarda) chiqaradi.
3. Biznes uchun eng muhim **Top 3 xulosa (Top 3 Insights)** beradi.
4. Takrorlanuvchi tizimli muammolarni guruhlab, **Muammo | Ustuvorlik (High / Medium / Low) | Amaliy Yechim** jadvalini tuzadi.
5. Natijalarni filtrlash, nusxalash va eksport qilish imkoniyatini taqdim etadi.

## Пользовательские истории

| # | Метка | История | Приёмка |
|---|-------|---------|---------|
| 1 | R01 | Foydalanuvchi sifatida, men portfolio-darajasidagi professional veb-platformaga kiraman, toza dizayn va aniq ierarxiyani ko'raman | To'liq ishlovchi landing/dashboard, responsive UI |
| 2 | R02 | Foydalanuvchi sifatida, men matn maydoniga mijoz sharhlarini yozaman yoki joylayman | Belgilar soni va matn tozalash imkoniyati |
| 3 | R03 | Foydalanuvchi sifatida, men umumiy sentiment taqsimotini ko'raman | Positive / Neutral / Negative foizlar va vizual barlar |
| 4 | R04 | Foydalanuvchi sifatida, men takrorlanuvchi muammolar guruhlanganini ko'raman | Alohida muammolar semantik guruhlanadi |
| 5 | R05 | Foydalanuvchi sifatida, men 3 asosiy strategik xulosani ko'raman | 3 ta sarlavha va aniq tavsifdan iborat kartalar |
| 6 | R06 | Foydalanuvchi sifatida, men Muammo \| Ustuvorlik \| Yechim jadvalini ko'raman | Jadval ko'rinishida har bir muammoga amaliy yechim |
| 7 | R07 | Foydalanuvchi sifatida, men ustuvorlik darajasini (High / Medium / Low) ko'raman | Rangli badge (Qizil/Sariq/Yashil) va filtrlar |
| 8 | R08 | Foydalanuvchi sifatida, men Roma Rayt videosi asosidagi premium, no-AI-slop dizaynni his qilaman | Toza tipografiya, 1px hoshiyalar, yumshoq soyalar |
| 9 | R09 | Foydalanuvchi sifatida, platformadan mobil, planshet va kompyuterda bemalol foydalanaman | Tailwind orqali 100% moslashuvchan maket |
| 10 | R10 | Foydalanuvchi sifatida, server orqali xavfsiz va tezkor tahlil olaman | `/api/analyze` server route, API kalitlari himoyalangan |
| 11 | R11 | Foydalanuvchi sifatida, bir tugma bilan namunaviy feedbacklarni yuklayman | 4 ta tayyor preset (E-commerce, SaaS, Mobile App, Service) |
| 12 | R12 | Dasturchi/Recruiter sifatida, loyihani Vercel'ga bir klikda deploy qila olaman va local `npm run build` muammosiz o'tadi | Xatosiz production build, Vercel konfiguratsiyasi |

## Решения по реализации

1. **Frontend & Backend**: Next.js 14+ App Router, React 18/19, TypeScript.
   - Bitta full-stack monorepo, ortiqcha murakkabliksiz, Vercel bilan ideal integratsiya.
2. **Dizayn tizimi & CSS**: Tailwind CSS + Lucide Icons + Tailwind typography.
   - Roma Rayt videosidagi qoidalar bo'yicha: neytral slate/zinc ranglar, aniq 16px/24px/32px spacing, Inter/Geist tipografik ierarxiya, zero-slop.
3. **API & AI arxitekturasi**:
   - `/api/analyze` Next.js Route Handler (Edge/Nodejs runtime).
   - Server-side environment variables: `GEMINI_API_KEY` (Google Gemini 1.5 Flash/Pro), `OPENAI_API_KEY` (GPT-4o-mini), `GROQ_API_KEY`.
   - **Smart Semantic Engine Fallback**: agar kalit berilmagan bo'lsa yoki limit tugagan bo'lsa, ichki deterministik semantik tahlil dvigateli ishga tushadi. Bu portfolio namoyishi paytida 500 error yoki oq ekran bo'lmasligini 100% kafolatlaydi!
4. **Validation & Typing**:
   - Kiruvchi JSON qat'iy tekshiriladi: `feedback` maydoni kamida 10 ta belgidan iborat bo'lishi shart.
   - Javob formati qat'iy JSON interfeysi:
   ```ts
   export interface AnalysisResponse {
     summary: string;
     sentiment: {
       positive: number;
       neutral: number;
       negative: number;
     };
     topInsights: Array<{
       title: string;
       description: string;
     }>;
     problems: Array<{
       problem: string;
       priority: "high" | "medium" | "low";
       solution: string;
     }>;
   }
   ```

## Границы и швы

| Модуль | Владеет | Выставляет | Прячет |
|---|---|---|---|
| `analyzer-api` | Tahlil logikasi va AI adapter | `POST /api/analyze` -> `AnalysisResponse` | LLM chaqiruvlari, prompt injection himoyasi, fallback tahlil algoritmlari |
| `feedback-store` | Kiritilgan matn va holat | `text, sampleSelector, status, data, error` | Validatsiya xatolari, yuklash jarayoni |
| `dashboard-ui` | Natijalarni vizuallashtirish | `SummaryCard`, `SentimentCard`, `InsightsList`, `ProblemsTable` | Jadval filtrlari, nusxalash interaksiyalari, animatsiyalar |

### Shov (Test seam)
- `POST /api/analyze` request/response shovi.
- Fallback analyzer funksiyasi `analyzeFeedbackFallback(text)`.

## Вне рамок

| Требование | Почему не сейчас |
|---|---|
| Tashqi ma'lumotlar bazasi (PostgreSQL/Supabase) | Loyiha portfolio va tezkor mijoz tahlili vositasi bo'lib, sessiya ichidagi tahlilga mo'ljallangan. Saqlash funksiyasi JSON/CSV eksport orqali beriladi. |
| Foydalanuvchi ro'yxatdan o'tishi (Auth) | Kirish to'siqsiz (frictionless) bo'lishi va portfolio ko'ruvchilari darhol sinab ko'rishi uchun auth talab etilmaydi. |

## Открытые места

| Placeholder | Где в коде | Что нужно для закрытия |
|---|---|---|
| AI API Kaliti | `.env.local` / `.env.example` | Foydalanuvchi `GEMINI_API_KEY` yoki `OPENAI_API_KEY` kiritadi (kalitsiz ham ichki semantik dvigatel ishlaydi) |

## Покрытие манифеста

| Требование | Раздел спецификации |
|---|---|
| R01 | Задача, Решение, История 1 |
| R02 | Решение §1, История 2 |
| R03 | Решение §2, История 3 |
| R04 | Решение §4, История 4 |
| R05 | Решение §3, История 5 |
| R06 | Решение §4, История 6 |
| R07 | Решение §4, История 7 |
| R08 | Решение, Решения по реализации §2, История 8 |
| R09 | Решения по реализации §1, История 9 |
| R10 | Решения по реализации §3, История 10 |
| R11 | Решение §1, История 11 |
| R12 | Решения по реализации §1, История 12 |
