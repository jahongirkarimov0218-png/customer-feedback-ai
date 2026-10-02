# ADR 0003: Dizayn Tizimi va Anti-Slop Tamoyillari

## Kontekst
Foydalanuvchi Roma Rayt videosi (`https://youtu.be/-WDP_-MH3uI` "Как я убил ИИ-СЛОП в своих сайтах на Claude Code") asosida no-AI-slop, premium SaaS dashboard dizaynini talab qildi.

## Yechim
1. Aniq ranglar palitrasi: chuqur neytrallar (`slate-950`, `slate-900`, `slate-800`), nozik 1px chegaralar (`border-slate-800`), yumshoq soyalar (`shadow-sm`, `shadow-md`).
2. Semantik status ranglari:
   - High Priority / Salbiy: Rose/Red (`rose-500/10` fon, `rose-400` matn)
   - Medium Priority / Neytral: Amber (`amber-500/10` fon, `amber-400` matn)
   - Low Priority / Ijobiy: Emerald (`emerald-500/10` fon, `emerald-400` matn)
3. Tipografik ierarxiya: Geist/Inter shriftlari, aniq o'lcham va og'irliklar (500, 600, 700), yetarli va ritmik bo'shliqlar (whitespace).
4. No-AI-Slop qoidalari: ortiqcha binafsharang gradientlar yo'q, chalkash kartalar yo'q, noaniq tugmalar yo'q.

## Nega (va nimalar rad etildi)
- Rad etildi: AI vositalari tez-tez generatsiya qiladigan ko'zni charchatuvchi neon va gradient fonlar.
- Tanlandi: Linear, Vercel va Stripe uslubidagi professional B2B SaaS estetikasi.

## Oqibatlar
Dastur qat'iy va ishonchli taassurot qoldiradi, portfolio uchun ko'rkam va zamonaviy ko'rinishga ega.
