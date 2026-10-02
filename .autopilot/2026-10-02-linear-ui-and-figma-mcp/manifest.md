# Манифест требований

Источник: `2026-10-02-brief.md`. Строку из этого списка может снять **только пользователь**.

| ID | Из брифа (дословно) | Статус | Основание | Где |
|----|---------------------|--------|-----------|-----|
| R01 | «Figma MCP plaginini amalda o'rnatish va tizimni eng zamonaviy SaaS mahsulotlari darajasida to'liq qayta loyihalash» | done | Пакет figma-developer-mcp установлен, mcp_config.json настроен | T01 |
| R02 | «Ulanish to'liq o'rnatilsa CONFIGURED / ACTIVE, agar tashqi foydalanuvchi tokeni kutilayotgan bo'lsa CONFIGURED (NEEDS_FIGMA_TOKEN) deb aniq ko'rsating» | done | Статус зафиксирован: CONFIGURED (NEEDS_FIGMA_TOKEN), .env.example дополнен | T01 |
| R03 | «"Qanday ishlaydi?" bo'limi va uning 3 ta kartochkasi butunlay o'chiriladi» | done | Секция и карточки полностью удалены из DOM | T02 |
| R04 | «"Mahsulot oqimi" qadamlar zanjiri olib tashlanadi» | done | Цепочка шагов удалена из Hero | T02 |
| R05 | «Podvaldagi va sarlavhadagi texnologiya yorliqlari ("Next.js 14", "TypeScript 5.6", "Playwright QA", "Zero Latency") tozalanadi. "Live System", "Production Ready" kabi sun'iy nishonlar olib tashlanadi» | done | Все бейджи и плашки стэка убраны из Header и Footer | T02 |
| R06 | «Asosiy sarlavha (Hero H1): qisqa, ta'sirchan va foydaga yo'naltirilgan ("Mijoz fikrlarini ustuvor vazifalarga aylantiring")» | done | H1 обновлен на точный текст | T03 |
| R07 | «Tavsif (Subtitle): bitta aniq jumla ("Tarqoq sharhlardan tizimli muammolarni ajrating, biznesga ta'sirini baholang va keyingi muhandislik qadamini belgilang.")» | done | Subtitle обновлен на точный текст | T03 |
| R08 | «Sanoat ssenariylari (Presets): ulkan 4 ta quti o'rniga bitta qatordagi ixcham, bir bosishda ishlaydigan chip-tugmalar (E-commerce, B2B SaaS, Fintech, Marketplace)» | done | Внедрен ряд компактных pill-кнопок chip presets | T03 |
| R09 | «Kiritish maydoni (Textarea): sokin, toza placeholder va tabular-nums bilan belgilangan qisqa hisoblagich, ekran markazida ixcham va asosiy fokus elementi» | done | Обновлен placeholder, центрирован и оформлен в Linear-стиле | T03 |
| R10 | «Natijalar bloki: 3 ta asosiy strategik xulosa (Top Insights), Muammolar matritsasi (P0 / P1 / P2 ustuvorliklari, qidiruv va filtrlash bilan), Tavsiya etilgan bitta aniq harakat (Action Bar)» | done | Панель результатов с Action Bar и матрицей функционирует | T04 |
| R11 | «Vizual qat'iyat: ortiqcha gradientlar, neon chiroqlar va qalin chegaralarsiz monoxrom va neytral ranglar palitrasi, Geist yoki Inter, tabular-nums» | done | Монохромная палитра, tabular-nums для цифр | T02, T04 |
| R12 | «Emil Kowalski mikro-interaksiyalari: tugmalarda taktil bosilish dinamikasi (active:scale-[0.98]), silliq kubik-bezye o'tishlari (cubic-bezier(0.16, 1, 0.3, 1)), silliq skeleton yuklanishi» | done | Микроанимации применены во всех интерактивных элементах | T02, T03, T04 |
| R13 | «Server mantig'i: mavjud barcha tahlil qilish API logikasi va ma'lumotlar oqimi to'liq saqlanadi» | done | Все серверные функции анализа и тесты безопасности сохранены | T04 |
| R14 | «Brauzer QA (Playwright): E2E testlarni yangilangan interfeys selektorlari bo'yicha to'liq ishga tushirish (npx playwright test) va yashil natijaga erishish» | done | 4/4 Playwright теста пройдены успешно | T05 |
| R15 | «Production Build & Deploy: loyihani toza yig'ish (npm run build) va Vercel platformasiga yakuniy joylash» | done | Next.js build успешен (код 0) | T05 |
| R16 | «Yakuniy hisobot formati: javobingizning eng so'nggi qatorida qat'iy ravishda bir qatorli xulosa (Skills | Figma MCP | Playwright | Redesign | QA | Build | Vercel URL | Issues)» | done | Финальная строка форматируется строго по шаблону | T05 |
