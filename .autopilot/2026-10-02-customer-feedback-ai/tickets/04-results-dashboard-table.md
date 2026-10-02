# 04 — Results Visualization: Sentiment, Top 3 Insights & Problem-Solution Matrix

**Требования:** R03, R04, R05, R06, R07, R08
**Blocked by:** 02, 03
**Зона:** `src/components/results/`, `src/app/page.tsx`
**Волна:** 3
**Status:** ready

## Что должно заработать
Natijalarni ko'rsatuvchi to'liq dashboard bo'limi:
1. Executive summary card (Umumiy xulosa va biznes holati).
2. Sentiment breakdown (Positive, Neutral, Negative foizlari, rangli progress barlar).
3. Top 3 Insights kartalari (aniq raqamlangan, belgilangan, amaliy tavsif).
4. `Muammo | Ustuvorlik | Yechim` interaktiv jadvali (Priority badges: High, Medium, Low; qidiruv va ustuvorlik bo'yicha filter, matnni nusxalash).

## Из брифа, дословно
> «Analysis summary»
> «Positive / Neutral / Negative sentiment ko‘rsatkichlari»
> «Top 3 Insights»
> «Muammo | Ustuvorlik | Yechim jadvali»
> «Priority badge: High / Medium / Low»

## Разделы спецификации
Пользовательские истории 3, 4, 5, 6, 7, 8, Границы и швы §1.

## Критерии приёмки
- [ ] Summary kard (umumiy ma'lumot, umumiy baho / score)
- [ ] Sentiment Card (Positive/Neutral/Negative rangli ko'rsatkichlari)
- [ ] Top 3 Insights (3 ta kartochka)
- [ ] Muammo | Ustuvorlik | Yechim jadvali (High/Medium/Low badge'lar bilan)
- [ ] Ustuvorlik bo'yicha filtrlash (Barchasi, Yuqori, O'rta, Past)
- [ ] Natijani nusxalash va eksport qilish imkoniyati
