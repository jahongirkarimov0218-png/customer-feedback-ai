# 03 — Hero-копирайтинг, Chip-пресеты и чистое поле ввода

**Требования:** R06, R07, R08, R09, R12
**Blocked by:** ["02"]
**Зона:** `src/app/page.tsx`, `src/components/presets.tsx`, `src/components/feedback-input.tsx`
**Волна:** 2
**Status:** done

## Что должно заработать
- Hero H1: `Mijoz fikrlarini ustuvor vazifalarga aylantiring`
- Subtitle: `Tarqoq sharhlardan tizimli muammolarni ajrating, biznesga ta'sirini baholang va keyingi muhandislik qadamini belgilang.`
- Presets: единый горизонтальный ряд аккуратных chip-кнопок `[E-commerce] [B2B SaaS] [Fintech] [Marketplace]` вместо 4 громоздких боксов.
- Textarea: центрированное, спокойное поле ввода, чистый placeholder, счетчик символов с `tabular-nums`.

## Критерии приёмки
- [x] Точный H1 и Subtitle на странице
- [x] Пресеты отображаются компактными чипами в один ряд
- [x] Клик по чипу мгновенно подставляет текст отзыва
- [x] Кнопка CTA работает с микроанимацией `:active` scale 0.98
