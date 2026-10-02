import type {
  AnalysisResponse,
  InsightItem,
  ProblemSolutionItem,
  SentimentData,
  PriorityLevel,
} from "@/types/analyzer";

interface IssueCategory {
  id: string;
  keywords: string[];
  problem: string;
  priority: PriorityLevel;
  solution: string;
}

const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    id: "delivery",
    keywords: [
      "yetkazib", "yetkazish", "kuryer", "dostavka", "kechikdi", "kechikish",
      "pochta", "buyurtma kelmadi", "delivery", "late", "courier", "delay",
      "shipping", "доставка", "курьер", "опоздание", "задержка"
    ],
    problem: "Yetkazib berish va logistika zanjiridagi kechikishlar",
    priority: "medium",
    solution: "Kuryerlar marshrutini optimallashtirish va mijozga buyurtmani real-vaqtda kuzatish (live tracking) imkoniyatini taqdim etish.",
  },
  {
    id: "billing",
    keywords: [
      "to'lov", "tolov", "narx", "narxi", "qimmat", "yechildi", "pul", "qaytarish",
      "refund", "payment", "price", "expensive", "billing", "charge", "aldash",
      "оплата", "цена", "дорого", "возврат", "списали", "деньги", "обман"
    ],
    problem: "To'lov jarayonidagi noaniqliklar va narx siyosati bo'yicha e'tirozlar",
    priority: "high",
    solution: "Zaxira to'lov shlyuzlarini joriy etish, tranzaksiya holatini aniq ko'rsatish va shaffof narx modelini taqdim qilish.",
  },
  {
    id: "quality",
    keywords: [
      "sifat", "sifatsiz", "buzilgan", "yaroqsiz", "nosoz", "siniq", "ishlamaydi",
      "quality", "broken", "defective", "damage", "damaged", "poor quality",
      "качество", "брак", "сломан", "испорчен", "дефект"
    ],
    problem: "Mahsulot yoki xizmat sifati bo'yicha nuqsonlar va nomuvofiqlik",
    priority: "high",
    solution: "Jo'natishdan oldingi sifat nazorati (QA) tekshiruvini kuchaytirish va nuqsonli mahsulotlarni 24 soat ichida almashtirish kafolati.",
  },
  {
    id: "technical",
    keywords: [
      "dastur", "ilova", "sayt", "qotib", "qotadi", "xato", "xatolik", "yuklanmadi",
      "ochilmadi", "bag", "bug", "crash", "app", "website", "slow", "error", "frozen",
      "приложение", "сайт", "ошибка", "баг", "вылетает", "зависает"
    ],
    problem: "Mobil ilova yoki platformadagi texnik nosozliklar va sekin ishlash",
    priority: "high",
    solution: "Kesh tizimini optimallashtirish, server yuklamasini taqsimlash va xatoliklarni qayd etuvchi avtomatlashtirilgan monitoring (Sentry) joriy etish.",
  },
  {
    id: "support",
    keywords: [
      "operator", "xizmat", "qo'llab", "javob bermadi", "aloqa", "qo'pol", "telefon",
      "support", "helpdesk", "customer service", "unresponsive", "rude", "agent",
      "поддержка", "оператор", "хамство", "не отвечают", "грубый"
    ],
    problem: "Mijozlarni qo'llab-quvvatlash xizmatining kechikishi yoki samarasiz muloqot",
    priority: "medium",
    solution: "Operatorlar uchun xizmat ko'rsatish standartlarini yangilash va 24/7 ishlaydigan aqlli AI-assistent botini ishga tushirish.",
  },
  {
    id: "usability",
    keywords: [
      "qiyin", "tushunarsiz", "murakkab", "qulay emas", "topolmadim", "interfeys",
      "confusing", "complex", "difficult", "hard to use", "ui", "ux",
      "неудобно", "сложно", "непонятно", "интерфейс"
    ],
    problem: "Foydalanuvchi interfeysidagi murakkablik va navigatsiya noqulayligi",
    priority: "low",
    solution: "Foydalanuvchi yo'lini (UX journey) soddalashtirish, asosiy amallarni 2 klikkacha qisqartirish va interaktiv yo'riqnoma qo'shish.",
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
  "обман", "ошибка", "грубый", "разочарован", "возврат", "медленно", "проблема",
  "bad", "terrible", "delay", "late", "broken", "crash", "error", "slow",
  "expensive", "scam", "rude", "disappointed", "refund", "issue", "bug", "worst", "fail"
];

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/['ʼ`’]/g, "'");
}

function calculateSentiment(normalized: string, words: string[]): SentimentData {
  let posCount = 0;
  let negCount = 0;

  for (const word of words) {
    if (POSITIVE_WORDS.some((pw) => word.includes(pw))) {
      posCount++;
    }
    if (NEGATIVE_WORDS.some((nw) => word.includes(nw))) {
      negCount++;
    }
  }

  // Also check multi-word or substring matches
  for (const pw of POSITIVE_WORDS) {
    if (pw.includes(" ") && normalized.includes(pw)) {
      posCount += 2;
    }
  }
  for (const nw of NEGATIVE_WORDS) {
    if (nw.includes(" ") && normalized.includes(nw)) {
      negCount += 2;
    }
  }

  const totalHits = posCount + negCount;

  let posPct: number;
  let negPct: number;
  let neuPct: number;

  if (totalHits === 0) {
    posPct = 33;
    neuPct = 34;
    negPct = 33;
  } else {
    // Determine raw fractions with baseline neutral weight
    const neutralBaseline = Math.max(1, Math.round(words.length * 0.15));
    const totalWeight = posCount + negCount + neutralBaseline;

    posPct = Math.round((posCount / totalWeight) * 100);
    negPct = Math.round((negCount / totalWeight) * 100);
    neuPct = 100 - (posPct + negPct);

    // Safeguard bounds
    if (neuPct < 5 && (posCount > 0 || negCount > 0)) {
      neuPct = 5;
      if (posPct >= negPct) {
        posPct = Math.max(0, 100 - negPct - neuPct);
      } else {
        negPct = Math.max(0, 100 - posPct - neuPct);
      }
    }
  }

  // Exact 100% normalization
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

function detectProblems(normalized: string): ProblemSolutionItem[] {
  const detected: ProblemSolutionItem[] = [];

  for (const cat of ISSUE_CATEGORIES) {
    const matched = cat.keywords.some((kw) => normalized.includes(kw));
    if (matched) {
      detected.push({
        problem: cat.problem,
        priority: cat.priority,
        solution: cat.solution,
      });
    }
  }

  // If no problem detected, supply growth optimization solutions
  if (detected.length === 0) {
    detected.push({
      problem: "Mijozlarning ijobiy tajribasini sodiqlik va tavsiya (referral) dasturiga aylantirish",
      priority: "low",
      solution: "Faol mijozlar uchun keshbek va do'stini taklif qilish bonuslarini joriy etish orqali organik o'sishni ta'minlash.",
    });
    detected.push({
      problem: "Muntazam fikr-mulohazalar yig'ish va NPS ko'rsatkichini doimiy monitoring qilish",
      priority: "low",
      solution: "Xarid yakunida 1-klikli baholash so'rovnomasini qo'shish va dinamik tahlil o'tkazish.",
    });
  }

  // Sort by priority: high first, then medium, then low
  const priorityWeight: Record<PriorityLevel, number> = { high: 3, medium: 2, low: 1 };
  detected.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);

  return detected;
}

function generateTopInsights(
  sentiment: SentimentData,
  problems: ProblemSolutionItem[],
  totalWords: number
): [InsightItem, InsightItem, InsightItem] {
  // Insight 1: Sentiment & overall perception
  let insight1: InsightItem;
  if (sentiment.positive >= sentiment.negative && sentiment.positive >= 40) {
    insight1 = {
      title: "Kuchli ijobiy hissiy fon va mahsulot qiymati",
      description: `Mijozlarning ${sentiment.positive}% qismi xizmatdan to'liq mamnun. Asosiy funksionallik va qulaylik yuqori baholanmoqda.`,
    };
  } else if (sentiment.negative >= sentiment.positive && sentiment.negative >= 40) {
    insight1 = {
      title: "Salbiy tajriba ustunligi va mijozlarni yo'qotish xavfi",
      description: `Mijozlarning ${sentiment.negative}% qismida jiddiy norozilik mavjud. Tizimli muammolarni bartaraf etish darhol boshlanishi zarur.`,
    };
  } else {
    insight1 = {
      title: "Muvozanatli va neytral qabul qilish tendentsiyasi",
      description: `Fikrlar turlicha: ${sentiment.positive}% ijobiy, ${sentiment.neutral}% neytral va ${sentiment.negative}% salbiy. Kichik yaxshilanishlar umumiy kayfiyatni keskin oshirishi mumkin.`,
    };
  }

  // Insight 2: Primary operational focus
  const highestProblem = problems[0];
  let insight2: InsightItem;
  if (highestProblem && highestProblem.priority === "high") {
    insight2 = {
      title: "Birlamchi kritik xavf: Tizimli to'siqlar",
      description: `${highestProblem.problem} biznesning eng nozik nuqtasi bo'lib turibdi. Uni hal qilish mijozlar oqimini saqlab qoladi.`,
    };
  } else if (highestProblem) {
    insight2 = {
      title: "Asosiy operatsion optimallashtirish nuqtasi",
      description: `${highestProblem.problem} bo'yicha belgilangan amaliy choralar servis sifatini keyingi bosqichga olib chiqadi.`,
    };
  } else {
    insight2 = {
      title: "Operatsion barqarorlik va servis intizomi",
      description: "Jarayonlar barqaror ishlamoqda, operatsion xatolar minimal darajada saqlanmoqda.",
    };
  }

  // Insight 3: Strategic growth & business action
  let insight3: InsightItem;
  if (sentiment.negative > 30) {
    insight3 = {
      title: "Mijozlar bilan aloqa zanjirini tezkor qayta tiklash",
      description: "Norozi mijozlar bilan proaktiv bog'lanish va kompensatsiya taklif qilish orqali salbiy sharhlar oqimini to'xtatish lozim.",
    };
  } else {
    insight3 = {
      title: "Bozorda yetakchilikni mustahkamlash va kengaytirish",
      description: `Tahlil qilingan ${totalWords} ta so'zdan iborat fikrlar mahsulotning bozor talabiga to'liq mosligini (PMF) tasdiqlaydi.`,
    };
  }

  return [insight1, insight2, insight3];
}

function generateSummary(sentiment: SentimentData, problems: ProblemSolutionItem[]): string {
  const dominantTone =
    sentiment.positive > sentiment.negative + 10
      ? "asosan ijobiy"
      : sentiment.negative > sentiment.positive + 10
      ? "tanqidiy va salbiy"
      : "aralash va neytral";

  const topIssue = problems.find((p) => p.priority === "high") || problems[0];
  const issueText = topIssue
    ? ` Asosiy e'tibor qaratilishi lozim bo'lgan soha: ${topIssue.problem.toLowerCase()}.`
    : "";

  return `Tahlil natijalariga ko'ra, mijozlarning umumiy munosabati ${dominantTone} kayfiyatda shakllangan (${sentiment.positive}% ijobiy, ${sentiment.negative}% salbiy).${issueText} Taqdim etilgan amaliy yechimlar konversiya va mijozlar sodiqligini oshirishga xizmat qiladi.`;
}

/**
 * Built-in Semantic Analysis Engine (100% offline, deterministic, fallback)
 */
export function analyzeFeedbackFallback(text: string): AnalysisResponse {
  const normalized = normalizeText(text);
  const words = normalized
    .replace(/[^\w\s\u0400-\u04FF]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const sentiment = calculateSentiment(normalized, words);
  const problems = detectProblems(normalized);
  const topInsights = generateTopInsights(sentiment, problems, words.length);
  const summary = generateSummary(sentiment, problems);

  return {
    summary,
    sentiment,
    topInsights,
    problems,
    meta: {
      totalWords: words.length,
      provider: "built-in-semantic-engine",
      processedAt: new Date().toISOString(),
    },
  };
}
