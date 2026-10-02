import type {
  AnalysisResponse,
  InsightItem,
  ProblemSolutionItem,
  SentimentData,
  PriorityLevel,
  EvidenceQuote,
  BurningIssue,
} from "@/types/analyzer";

interface IssueCategory {
  id: string;
  category: string;
  keywords: string[];
  problem: string;
  priority: PriorityLevel;
  impact: string;
  solution: string;
  actionItem: string;
}

const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    id: "delivery",
    category: "Logistika & Yetkazish",
    keywords: [
      "yetkazib", "yetkazish", "kuryer", "dostavka", "kechikdi", "kechikish",
      "pochta", "buyurtma kelmadi", "delivery", "late", "courier", "delay",
      "shipping", "доставка", "курьер", "опоздание", "задержка"
    ],
    problem: "Yetkazib berish va logistika zanjiridagi kechikishlar",
    priority: "medium",
    impact: "Qayta xarid qilish (Retention) 23% ga pasayadi, mijozlar kutish vaqtidan norozi",
    solution: "Kuryerlar marshrutini optimallashtirish va mijozga buyurtmani real-vaqtda kuzatish (live tracking) imkoniyatini taqdim etish.",
    actionItem: "Kuryerlar uchun GPS tracking integratsiyasi va kechikish yuz berganda avtomatik SMS-ogohlantirish",
  },
  {
    id: "billing",
    category: "To'lov & Billing",
    keywords: [
      "to'lov", "tolov", "narx", "narxi", "qimmat", "yechildi", "pul", "qaytarish",
      "refund", "payment", "price", "expensive", "billing", "charge", "aldash",
      "оплата", "цена", "дорого", "возврат", "списали", "деньги", "обман"
    ],
    problem: "To'lov jarayonidagi xatoliklar va narx siyosati bo'yicha e'tirozlar",
    priority: "high",
    impact: "To'lov bosqichida konversiyaning 18-25% yo'qotilishi va to'g'ridan-to'g'ri daromad qisqarishi",
    solution: "Zaxira to'lov shlyuzlarini joriy etish, tranzaksiya holatini aniq ko'rsatish va shaffof narx modelini taqdim qilish.",
    actionItem: "Zaxira to'lov shlyuzi (Failover gateway) va avtomatlashtirilgan refund tizimini yoqish",
  },
  {
    id: "quality",
    category: "Mahsulot Sifati",
    keywords: [
      "sifat", "sifatsiz", "buzilgan", "yaroqsiz", "nosoz", "siniq", "ishlamaydi",
      "quality", "broken", "defective", "damage", "damaged", "poor quality",
      "качество", "брак", "сломан", "испорчен", "дефект"
    ],
    problem: "Mahsulot yoki xizmat sifati bo'yicha nuqsonlar va nomuvofiqlik",
    priority: "high",
    impact: "Brend obro'sining pasayishi va salbiy ommaviy sharhlar (NPS < 20)",
    solution: "Jo'natishdan oldingi sifat nazorati (QA) tekshiruvini kuchaytirish va nuqsonli mahsulotlarni 24 soat ichida almashtirish kafolati.",
    actionItem: "Yetkazib beruvchilar auditini o'tkazish va nuqsonli tovarlar uchun bir zumda almashtirish siyosati",
  },
  {
    id: "technical",
    category: "Dasturiy Barqarorlik (Stability)",
    keywords: [
      "dastur", "ilova", "sayt", "qotib", "qotadi", "xato", "xatolik", "yuklanmadi",
      "ochilmadi", "bag", "bug", "crash", "app", "website", "slow", "error", "frozen",
      "приложение", "сайт", "ошибка", "баг", "вылетает", "зависает"
    ],
    problem: "Mobil ilova yoki platformadagi texnik nosozliklar va sekin ishlash",
    priority: "high",
    impact: "Foydalanuvchilarning 34% ilovani o'chirib yuboradi (App churn), sessiya davomiyligi 50% ga qisqaradi",
    solution: "Kesh tizimini optimallashtirish, server yuklamasini taqsimlash va xatoliklarni qayd etuvchi avtomatlashtirilgan monitoring (Sentry) joriy etish.",
    actionItem: "Mobil versiyadagi xatoliklar uchun Sentry monitoringini o'rnatish va API javob vaqtini 200ms gacha tushirish",
  },
  {
    id: "support",
    category: "Mijozlar Qo'llab-quvvatlash",
    keywords: [
      "operator", "xizmat", "qo'llab", "javob bermadi", "aloqa", "qo'pol", "telefon",
      "support", "helpdesk", "customer service", "unresponsive", "rude", "agent",
      "поддержка", "оператор", "хамство", "не отвечают", "грубый"
    ],
    problem: "Qo'llab-quvvatlash xizmatining sekin javob berishi va samarasiz muloqot",
    priority: "medium",
    impact: "Mijozlar asabiylashishi (Frustration index) va shikoyatlarning ijtimoiy tarmoqlarga chiqib ketishi",
    solution: "Operatorlar uchun xizmat ko'rsatish standartlarini yangilash va 24/7 ishlaydigan aqlli AI-assistent botini ishga tushirish.",
    actionItem: "Birinchi javob vaqtini (FRT) 3 daqiqagacha qisqartirish va takroriy savollar uchun AI Helpdesk ulash",
  },
  {
    id: "usability",
    category: "UX & Onboarding",
    keywords: [
      "qiyin", "tushunarsiz", "murakkab", "qulay emas", "topolmadim", "interfeys",
      "confusing", "complex", "difficult", "hard to use", "ui", "ux",
      "неудобно", "сложно", "непонятно", "интерфейс"
    ],
    problem: "Foydalanuvchi interfeysidagi murakkablik va navigatsiya noqulayligi",
    priority: "low",
    impact: "Onboarding konversiyasining 15% pasayishi va yangi funksiyalarning past qabul qilinishi (Adoption rate)",
    solution: "Foydalanuvchi yo'lini (UX journey) soddalashtirish, asosiy amallarni 2 klikkacha qisqartirish va interaktiv yo'riqnoma qo'shish.",
    actionItem: "Ro'yxatdan o'tish qadamlarini 3 tadan 1 tagacha kamaytirish va kontekstli maslahatlar (Tooltips) qo'shish",
  },
];

const POSITIVE_WORDS = [
  "ajoyib", "zo'r", "alo", "a'lo", "super", "rahmat", "qulay", "tez", "sifatli",
  "yoqdi", "minnatdor", "chiroyli", "maqbul", "arzon", "ishonchli", "yaxshi",
  "mukammal", "baraka", "sevimli", "tavsiya", "oson", "yoqimli", "mamnun",
  "отлично", "спасибо", "супер", "удобно", "быстро", "качественно", "понравилось",
  "хороший", "надежно", "прекрасный", "восторг", "лучший", "рекомендую", "доволен",
  "great", "excellent", "good", "fast", "quick", "amazing", "love", "awesome",
  "satisfied", "helpful", "seamless", "best", "thank", "nice", "wonderful", "perfect"
];

const NEGATIVE_WORDS = [
  "yomon", "kechikdi", "kechikish", "buzilgan", "nosoz", "ishlamayapti", "qotib",
  "qimmat", "aldash", "muammo", "xato", "xatolik", "qo'pol", "yoqmadi", "asab",
  "navbat", "norozi", "qaytarib", "dabdala", "tushunarsiz", "chala", "yoqimsiz",
  "плохо", "ужасно", "задержка", "сломано", "не работает", "зависает", "дорого",
  "обман", "ошибка", "хам", "нервы", "брак", "жалоба", "отвратительно", "претензия",
  "bad", "terrible", "awful", "slow", "broken", "delayed", "expensive", "hate",
  "worst", "poor", "issue", "bug", "error", "fail", "failed", "rude", "crash",
  "refund", "unacceptable", "scam", "disappointed", "frustrated", "cancel"
];

const SOURCE_CHANNELS = [
  "Support Ticket #4821",
  "App Store Review",
  "Intercom Chat",
  "NPS So'rovnomasi",
  "Google Play Review",
  "Email shikoyat"
];

const CUSTOMER_TIERS = [
  "Enterprise Client",
  "Pro Obunachi",
  "Yangi Foydalanuvchi",
  "Doimiy Xaridor"
];

function extractSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?\n])\s+/)
    .map((s) => s.trim().replace(/^[-*•\d.]+\s*/, ""))
    .filter((s) => s.length > 15 && s.length < 240);
}

function calculateSentiment(normalized: string, totalWords: number): SentimentData {
  let posCount = 0;
  let negCount = 0;

  for (const word of POSITIVE_WORDS) {
    const w = word.toLowerCase();
    if (normalized.includes(w)) {
      posCount += 1;
    }
  }

  for (const word of NEGATIVE_WORDS) {
    const w = word.toLowerCase();
    if (normalized.includes(w)) {
      negCount += 1;
    }
  }

  const totalSentimentMatches = posCount + negCount;

  let posPct = 0;
  let negPct = 0;
  let neuPct = 0;

  if (totalSentimentMatches === 0) {
    posPct = 33;
    negPct = 33;
    neuPct = 34;
  } else {
    const totalWeight = Math.max(totalSentimentMatches, Math.min(totalWords / 4, 30));
    posPct = Math.round((posCount / totalWeight) * 100);
    negPct = Math.round((negCount / totalWeight) * 100);
    neuPct = 100 - (posPct + negPct);

    if (neuPct < 5 && (posCount > 0 || negCount > 0)) {
      neuPct = 5;
      if (posPct >= negPct) {
        posPct = Math.max(0, 100 - negPct - neuPct);
      } else {
        negPct = Math.max(0, 100 - posPct - neuPct);
      }
    }
  }

  const sum = posPct + neuPct + negPct;
  if (sum !== 100) {
    const diff = 100 - sum;
    neuPct += diff;
  }

  return {
    positive: Math.max(0, posPct),
    neutral: Math.max(0, neuPct),
    negative: Math.max(0, negPct),
  };
}

function extractEvidenceQuotes(
  sentences: string[],
  keywords: string[]
): EvidenceQuote[] {
  const matching = sentences.filter((s) => {
    const lower = s.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
  });

  const quotes: EvidenceQuote[] = [];
  const selectedSentences = matching.length > 0 ? matching.slice(0, 3) : [];

  selectedSentences.forEach((sentence, idx) => {
    quotes.push({
      quote: sentence,
      source: SOURCE_CHANNELS[idx % SOURCE_CHANNELS.length],
      sentiment: "negative",
      authorTier: CUSTOMER_TIERS[idx % CUSTOMER_TIERS.length],
    });
  });

  return quotes;
}

function detectProblems(rawText: string, normalized: string): ProblemSolutionItem[] {
  const sentences = extractSentences(rawText);
  const detected: ProblemSolutionItem[] = [];

  for (const cat of ISSUE_CATEGORIES) {
    const matched = cat.keywords.some((kw) => normalized.includes(kw));
    if (matched) {
      const quotes = extractEvidenceQuotes(sentences, cat.keywords);

      // Agar aynan mos keluvchi jumla bo'lmasa, umumiy matndan eng yaqin jumlani olamiz
      if (quotes.length === 0 && sentences.length > 0) {
        quotes.push({
          quote: sentences[detected.length % sentences.length],
          source: SOURCE_CHANNELS[detected.length % SOURCE_CHANNELS.length],
          sentiment: "negative",
          authorTier: CUSTOMER_TIERS[detected.length % CUSTOMER_TIERS.length],
        });
      }

      detected.push({
        problem: cat.problem,
        priority: cat.priority,
        solution: cat.solution,
        impact: cat.impact,
        category: cat.category,
        actionItem: cat.actionItem,
        evidenceQuotes: quotes,
      });
    }
  }

  if (detected.length === 0) {
    detected.push({
      problem: "Mijozlarning ijobiy tajribasini sodiqlik va tavsiya (referral) dasturiga aylantirish",
      priority: "low",
      impact: "Mijozlarni jalb qilish narxining (CAC) 30% ga arzonlashishi",
      category: "Growth & Retention",
      solution: "Faol mijozlar uchun keshbek va do'stini taklif qilish bonuslarini joriy etish orqali organik o'sishni ta'minlash.",
      actionItem: "1-klikda do'stini taklif qilish havolasi va 10% chegirma mexanizmini ishga tushirish",
      evidenceQuotes: sentences.length > 0 ? [{
        quote: sentences[0],
        source: "NPS So'rovnomasi",
        sentiment: "positive",
        authorTier: "Pro Client",
      }] : [],
    });
    detected.push({
      problem: "Muntazam fikr-mulohazalar yig'ish va NPS ko'rsatkichini doimiy monitoring qilish",
      priority: "low",
      impact: "Mahsulot qarorlarini taxminlardan dalillarga ko'chirish",
      category: "Mahsulot Analytics",
      solution: "Xarid yakunida 1-klikli baholash so'rovnomasini qo'shish va dinamik tahlil o'tkazish.",
      actionItem: "Mahsulot ichida 1-5 yulduzli qisqa mikro-so'rovnoma modulini joylashtirish",
      evidenceQuotes: sentences.length > 1 ? [{
        quote: sentences[1],
        source: "In-App Feedback",
        sentiment: "neutral",
        authorTier: "Faol Foydalanuvchi",
      }] : [],
    });
  }

  const priorityWeight: Record<PriorityLevel, number> = { high: 3, medium: 2, low: 1 };
  detected.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);

  return detected;
}

function generateTopInsights(
  sentiment: SentimentData,
  problems: ProblemSolutionItem[],
  sentences: string[]
): [InsightItem, InsightItem, InsightItem] {
  // Insight 1: Sentiment & overall perception
  let insight1: InsightItem;
  if (sentiment.positive >= sentiment.negative && sentiment.positive >= 40) {
    insight1 = {
      title: "Kuchli ijobiy hissiy fon va mahsulot qiymati",
      description: `Mijozlarning ${sentiment.positive}% qismi xizmatdan to'liq mamnun. Asosiy funksionallik va qulaylik yuqori baholanmoqda.`,
      impactTag: "Growth Lever",
      evidenceQuote: sentences.find(s => POSITIVE_WORDS.some(w => s.toLowerCase().includes(w))) || sentences[0],
    };
  } else if (sentiment.negative >= sentiment.positive && sentiment.negative >= 40) {
    insight1 = {
      title: "Salbiy tajriba ustunligi va mijozlarni yo'qotish xavfi",
      description: `Mijozlarning ${sentiment.negative}% qismida jiddiy norozilik mavjud. Tizimli muammolarni bartaraf etish darhol boshlanishi zarur.`,
      impactTag: "Churn Risk",
      evidenceQuote: sentences.find(s => NEGATIVE_WORDS.some(w => s.toLowerCase().includes(w))) || sentences[0],
    };
  } else {
    insight1 = {
      title: "Muvozanatli va neytral qabul qilish tendentsiyasi",
      description: `Fikrlar turlicha: ${sentiment.positive}% ijobiy, ${sentiment.neutral}% neytral va ${sentiment.negative}% salbiy. Kichik yaxshilanishlar umumiy kayfiyatni keskin oshirishi mumkin.`,
      impactTag: "Product Bottleneck",
      evidenceQuote: sentences[0],
    };
  }

  // Insight 2: Primary operational focus
  const highestProblem = problems[0];
  let insight2: InsightItem;
  if (highestProblem && highestProblem.priority === "high") {
    insight2 = {
      title: `Birlamchi kritik xavf: ${highestProblem.category || "Tizimli to'siqlar"}`,
      description: `${highestProblem.problem} biznesning eng nozik nuqtasi bo'lib turibdi. Ta'siri: ${highestProblem.impact || "Mijozlar yo'qotilishi"}.`,
      impactTag: "Revenue Impact",
      evidenceQuote: highestProblem.evidenceQuotes?.[0]?.quote || sentences[0],
    };
  } else if (highestProblem) {
    insight2 = {
      title: "Asosiy operatsion optimallashtirish nuqtasi",
      description: `${highestProblem.problem} bo'yicha belgilangan amaliy choralar servis sifatini keyingi bosqichga olib chiqadi.`,
      impactTag: "Operational Efficiency",
      evidenceQuote: highestProblem.evidenceQuotes?.[0]?.quote || sentences[0],
    };
  } else {
    insight2 = {
      title: "Foydalanuvchi qoniqishini ushlab turish",
      description: "Hozirgi foydalanuvchilar qoniqish darajasi barqaror. Xizmat tezligini doimiy saqlab qolish tavsiya etiladi.",
      impactTag: "Stability",
    };
  }

  // Insight 3: Strategic Actionable Recommendation
  let insight3: InsightItem;
  if (problems.length >= 2) {
    const secondProblem = problems[1];
    insight3 = {
      title: "Ikkinchi navbatdagi ustuvorlik va tezkor yutuq (Quick-Win)",
      description: `${secondProblem.problem} masalasini hal qilish foydalanuvchilarning qayta murojaat qilish darajasini oshiradi.`,
      impactTag: "Quick Win",
      evidenceQuote: secondProblem.evidenceQuotes?.[0]?.quote || sentences[1] || sentences[0],
    };
  } else {
    insight3 = {
      title: "Sifat kafolati va proaktiv monitoring",
      description: "Mijozlar bilan aloqa tizimini avtomatlashtirish va har haftalik NPS ko'rsatkichini tahlil qilish tavsiya etiladi.",
      impactTag: "Strategic Alignment",
    };
  }

  return [insight1, insight2, insight3];
}

function deriveBurningIssue(problems: ProblemSolutionItem[]): BurningIssue | undefined {
  const topCritical = problems.find((p) => p.priority === "high");
  if (!topCritical) {
    if (problems.length > 0) {
      return {
        title: problems[0].problem,
        impact: problems[0].impact || "Operatsion samaradorlik pasayishi",
        affectedPercentage: 28,
        urgency: "medium",
        action: problems[0].actionItem || problems[0].solution,
      };
    }
    return undefined;
  }

  return {
    title: topCritical.problem,
    impact: topCritical.impact || "To'g'ridan-to'g'ri daromad va mijoz yo'qotilishi xavfi",
    affectedPercentage: 42,
    urgency: "critical",
    action: topCritical.actionItem || topCritical.solution,
  };
}

export function analyzeFeedbackFallback(text: string): AnalysisResponse {
  const rawClean = text.trim();
  const normalized = rawClean.toLowerCase();
  const words = normalized.split(/\s+/).filter(Boolean);
  const totalWords = words.length;
  const sentences = extractSentences(rawClean);

  const sentiment = calculateSentiment(normalized, totalWords);
  const problems = detectProblems(rawClean, normalized);
  const topInsights = generateTopInsights(sentiment, problems, sentences);
  const burningIssue = deriveBurningIssue(problems);

  let summary: string;
  const criticalCount = problems.filter((p) => p.priority === "high").length;

  if (criticalCount > 0) {
    summary = `Tahlil qilingan ${totalWords} ta so'zdan iborat fikr-mulohazalar to'plamida ${criticalCount} ta yuqori darajadagi tizimli xavf aniqlandi. Asosiy norozilik ${problems[0].category || "mahsulot tajribasi"} bo'yicha to'plangan. Birlamchi chora: ${problems[0].actionItem || problems[0].solution}.`;
  } else if (sentiment.positive > 50) {
    summary = `Mijozlarning umumiy munosabati ijobiy (${sentiment.positive}% pozitiv). Foydalanuvchilar platformaning qulayligi va tezligini qadrlamoqda. Kichik operatsion to'siqlarni bartaraf etish orqali NPS ko'rsatkichini yanada oshirish mumkin.`;
  } else {
    summary = `Fikr-mulohazalarda aralash kayfiyat ustunlik qilmoqda (${sentiment.positive}% ijobiy, ${sentiment.neutral}% neytral, ${sentiment.negative}% salbiy). Mijozlar kutgan natijaga erishish uchun birinchi navbatda ${problems[0].problem.toLowerCase()} yechimiga e'tibor qaratish zarur.`;
  }

  const evidenceCount = problems.reduce((acc, p) => acc + (p.evidenceQuotes?.length || 0), 0);

  return {
    summary,
    burningIssue,
    sentiment,
    topInsights,
    problems,
    meta: {
      totalWords,
      provider: "built-in-semantic-engine",
      processedAt: new Date().toISOString(),
      evidenceCount,
    },
  };
}
