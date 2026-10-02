import { AnalysisResponse } from "@/types/analyzer";

export const BENCHMARK_ANALYSIS_DATA: AnalysisResponse = {
  summary:
    "Mijozlarning 64% i to'lov jarayonidagi texnik uzilishlar va 3D-Secure sekinligi tufayli buyurtmani yakunlay olmaganini bildirgan. Shuningdek, kuryer tracking bildirishnomalari kechikishi qayd etilgan, biroq mahsulot sifati va qidiruv tizimi yuqori baholangan.",
  sentiment: {
    positive: 58,
    neutral: 14,
    negative: 28,
  },
  topInsights: [
    {
      title: "To'lov bosqichidagi texnik to'siqlar bekor qilishlar sonini oshirmoqda",
      description:
        "Foydalanuvchilar kartadan pul yechilgani, ammo buyurtma tasdiqlanmagani tufayli xizmatdan voz kechish xavfi (churn) yuqori darajada.",
      evidenceQuote:
        "Karta orqali to'lov qilganda pul yechildi, lekin buyurtma tasdiqlanmadi va xatolik berdi. Ikki marta to'lashimga to'g'ri keldi.",
    },
    {
      title: "Kuryer kuzatuv bildirishnomalarining uzilishi support yuklamasini 35% ga oshirgan",
      description:
        "Buyurtma holati bo'yicha real vaqtda xabarlar yetib bormasligi sababli qo'llab-quvvatlash markaziga takroriy murojaatlar oqimi yuzaga kelgan.",
      evidenceQuote:
        "Buyurtma berganimdan keyin 3 soat davomida holat o'zgarmadi, kuryer qayerdaligini bilolmay sarson bo'ldik.",
    },
    {
      title: "Katalog qidiruvi va mahsulot sifati bo'yicha NPS yuqori va barqaror",
      description:
        "Assortiment va interfeys tezligi mijozlar tomonidan eng qulay deb topilgan, bu esa organik o'sish poydevoridir.",
      evidenceQuote:
        "Mahsulotlar sifati juda yaxshi, qidiruv tizimi qulay va kerakli narsani topish oson.",
    },
  ],
  problems: [
    {
      problem: "To'lov gateway uzilishi va 3D-Secure timeout xatolari",
      category: "PaymentGateway / CheckoutService",
      impact: "Konversiyaning 12% ga pasayishi va tranzaksiya yo'qotilishi",
      evidenceQuotes: [
        {
          quote:
            "Karta orqali to'lov qilganda pul yechildi, lekin buyurtma tasdiqlanmadi va xatolik berdi.",
          source: "Mobil ilova sharhi",
          authorTier: "Doimiy xaridor",
        },
        {
          quote:
            "3D-Secure kodi kiritilgandan so'ng sahifa qotib qoldi, qayta to'lashga majbur bo'ldim.",
          source: "Support dialogi",
          authorTier: "Yangi mijoz",
        },
      ],
      priority: "high",
      solution:
        "To'lov provayderi bilan idempotency-key va avtomatik retry mexanizmini joriy qilish",
      actionItem:
        "PaymentGateway mikroservisida idempotency-key kiritish, timeoutni 15s ga oshirish va fallback to'lov usulini ulash",
    },
    {
      problem: "Buyurtma yetkazib berish holati statuslarining kechikishi",
      category: "Logistics / TrackingAPI",
      impact: "Call-centerga takroriy murojaatlar va mijoz ishonchsizligi",
      evidenceQuotes: [
        {
          quote:
            "Buyurtma qayerdaligini bilolmay operatorga 3 marta telefon qildim.",
          source: "Telegram bot sharhi",
          authorTier: "Standard",
        },
      ],
      priority: "medium",
      solution:
        "Webhooklar orqali kuryer geo-joylashuvini har 60 soniyada yangilash",
      actionItem:
        "Kuryer ilovasidan Webhook oqimini Redis orqali real-vaqtda mijoz tracking ekraniga ulash",
    },
    {
      problem: "Filtrlarda o'lcham va rang parametrlari mos kelmasligi",
      category: "Search / CatalogFilter",
      impact: "Mahsulot qidirish vaqtining uzayishi",
      evidenceQuotes: [
        {
          quote:
            "Faqat mavjud o'lchamlarni ko'rsatuvchi filtr to'g'ri ishlamayapti.",
          source: "Veb-sayt fikri",
          authorTier: "Mehmon",
        },
      ],
      priority: "low",
      solution:
        "Elasticsearch / Postgres filtr indekslarini keshni tozalash bilan optimallashtirish",
      actionItem:
        "Inventar qoldig'i nol bo'lgan o'lchamlarni qidiruv fasetlaridan avtomatik yashirish",
    },
  ],
  burningIssue: {
    title: "To'lov gateway uzilishi va kassa qotib qolishi (#1 Churn Blocker)",
    impact: "Daromadning 12% ga pasayishi va mijozlar ishonchi yo'qolishi",
    affectedPercentage: 64,
    urgency: "critical",
    action:
      "PaymentGateway mikroservisida idempotency-key kiritish, timeoutni 15s ga oshirish va fallback to'lov usulini ulash",
  },
  meta: {
    totalWords: 184,
    evidenceCount: 4,
    provider: "built-in-semantic-engine",
    processedAt: new Date().toISOString(),
  },
};
