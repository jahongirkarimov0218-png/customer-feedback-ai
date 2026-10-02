# 03 — Interactive Feedback Input, Presets & Dashboard Components

**Требования:** R02, R08, R11
**Blocked by:** 01
**Зона:** `src/components/`, `src/app/page.tsx`
**Волна:** 2
**Status:** ready

## Что должно заработать
Mijoz fikrlarini kiritish uchun interaktiv, qulay textarea: belgilar hisoblagichi, matnni tozalash tugmasi, kamida 4 xil real namuna (E-commerce, SaaS, Mobile App, Cafe/Service) preset tugmalari, "Analyze Feedback" CTA tugmasi, yuklanish holatidagi skeletonlar va xatolik xabarlari.

## Из брифа, дословно
> «Platformaga foydalanuvchi mijoz fikrlarini matn ko‘rinishida kiritadi»
> «Sample feedback yuklash»
> «Analyze Feedback CTA»
> «empty/loading skeleton/error states»

## Разделы спецификации
Пользовательские истории 2, 8, 11, Границы и швы §1.

## Критерии приёмки
- [ ] Textarea komponenti (auto-grow yoki aniq o'lcham, placeholder, character counter)
- [ ] Kamida 4 ta real tayyor feedback presetlari (o'zbek va ingliz tillarida boy kontent)
- [ ] "Analyze Feedback" CTA (yuklanish spinneri, disabled holati)
- [ ] Skeleton loading (shimmer animatsiyasi bilan zamonaviy placeholderlar)
- [ ] Xatolik holati (chiroyli ogohlantirish banneri va "Qayta urinish" tugmasi)
