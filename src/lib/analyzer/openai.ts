import type { AnalysisResponse } from "@/types/analyzer";

const SYSTEM_PROMPT = `Siz mijozlar fikrini chuqur tahlil qiluvchi professional AI analitiksiz.
Berilgan mijoz fikrlari (feedback) asosida qat'iy quyidagi JSON formatida tahlil bering:
{
  "summary": "Umumiy tahlil xulosasi (1-2 gap)",
  "sentiment": {
    "positive": number,
    "neutral": number,
    "negative": number
  },
  "topInsights": [
    { "title": "Sarlavha 1", "description": "Tavsif 1" },
    { "title": "Sarlavha 2", "description": "Tavsif 2" },
    { "title": "Sarlavha 3", "description": "Tavsif 3" }
  ],
  "problems": [
    {
      "problem": "Aniqlangan tizimli muammo",
      "priority": "high" | "medium" | "low",
      "solution": "Amaliy va real yechim"
    }
  ]
}

Qoidalar:
1. "sentiment" foizlarining yig'indisi qat'iy 100 bo'lishi shart (positive + neutral + negative = 100).
2. "topInsights" ro'yxatida aniq 3 ta eng muhim strategik xulosa bo'lishi kerak.
3. "problems" har birida priority qat'iy "high", "medium" yoki "low" bo'lishi kerak.
4. Faqat berilgan matn asosida xulosa qiling, mavjud bo'lmagan faktlarni uydirmang.`;

export async function analyzeWithOpenAI(feedback: string): Promise<AnalysisResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const endpoint = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Mijoz fikrlari:\n${feedback}` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error [${response.status}]: ${errorText}`);
  }

  const data = await response.json();
  const textContent = data.choices?.[0]?.message?.content;
  if (!textContent) {
    throw new Error("OpenAI API returned empty response");
  }

  const parsed = JSON.parse(textContent);

  const pos = Math.round(parsed.sentiment?.positive ?? 33);
  const neg = Math.round(parsed.sentiment?.negative ?? 33);
  const neu = 100 - (pos + neg);

  const wordCount = feedback.trim().split(/\s+/).length;

  return {
    summary: parsed.summary || "Fikrlar tahlili muvaffaqiyatli yakunlandi.",
    sentiment: {
      positive: Math.max(0, pos),
      neutral: Math.max(0, neu),
      negative: Math.max(0, neg),
    },
    topInsights: Array.isArray(parsed.topInsights) ? parsed.topInsights.slice(0, 3) : [],
    problems: Array.isArray(parsed.problems) ? parsed.problems : [],
    meta: {
      totalWords: wordCount,
      provider: "openai",
      processedAt: new Date().toISOString(),
    },
  };
}
