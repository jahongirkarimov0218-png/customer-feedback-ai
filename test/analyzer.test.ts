import { describe, it, expect } from "vitest";
import { analyzeFeedbackFallback } from "@/lib/analyzer/fallback-engine";
import { analyzeFeedback } from "@/lib/analyzer";

describe("Fallback Semantic Engine", () => {
  it("should analyze feedback text and return structured AnalysisResponse with sentiment summing to 100%", () => {
    const feedback = "Ilova juda ajoyib va tez ishlaydi, ammo yetkazib berish xizmati 2 kunga kechikdi va kuryer qo'pol muomala qildi.";
    const result = analyzeFeedbackFallback(feedback);

    expect(result).toBeDefined();
    expect(result.summary).toBeTruthy();
    expect(typeof result.summary).toBe("string");

    // Sentiment check
    expect(result.sentiment).toBeDefined();
    expect(result.sentiment.positive + result.sentiment.neutral + result.sentiment.negative).toBe(100);
    expect(result.sentiment.positive).toBeGreaterThanOrEqual(0);
    expect(result.sentiment.negative).toBeGreaterThanOrEqual(0);
    expect(result.sentiment.neutral).toBeGreaterThanOrEqual(0);

    // Top insights check
    expect(result.topInsights).toBeInstanceOf(Array);
    expect(result.topInsights).toHaveLength(3);
    for (const insight of result.topInsights) {
      expect(insight.title).toBeTruthy();
      expect(insight.description).toBeTruthy();
    }

    // Problems check
    expect(result.problems).toBeInstanceOf(Array);
    expect(result.problems.length).toBeGreaterThanOrEqual(1);
    for (const problem of result.problems) {
      expect(problem.problem).toBeTruthy();
      expect(["high", "medium", "low"]).toContain(problem.priority);
      expect(problem.solution).toBeTruthy();
    }

    // Meta check
    expect(result.meta?.provider).toBe("built-in-semantic-engine");
    expect(result.meta?.totalWords).toBeGreaterThan(0);
  });

  it("should seamlessly resolve analyzeFeedback with fallback when no external AI keys are set", async () => {
    const feedback = "Dastur narxi biroz qimmat lekin funksiyalari juda yaxshi va sifatli yaratilgan.";
    const result = await analyzeFeedback(feedback);

    expect(result).toBeDefined();
    expect(result.summary).toBeTruthy();
    expect(result.sentiment.positive + result.sentiment.neutral + result.sentiment.negative).toBe(100);
    expect(result.topInsights).toHaveLength(3);
    expect(result.problems.length).toBeGreaterThanOrEqual(1);
    expect(result.meta?.provider).toBeDefined();
  });
});

describe("POST /api/analyze Route Handler", () => {
  it("should return 400 when feedback is missing or shorter than 10 characters", async () => {
    const { POST } = await import("@/app/api/analyze/route");

    const reqEmpty = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: "" }),
    });
    const resEmpty = await POST(reqEmpty);
    expect(resEmpty.status).toBe(400);
    const dataEmpty = await resEmpty.json();
    expect(dataEmpty.error).toBe("Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak");

    const reqShort = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: "juda soz" }), // 8 chars
    });
    const resShort = await POST(reqShort);
    expect(resShort.status).toBe(400);
    const dataShort = await resShort.json();
    expect(dataShort.error).toBe("Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak");
  });

  it("should return 200 with structured AnalysisResponse for valid feedback", async () => {
    const { POST } = await import("@/app/api/analyze/route");

    const validFeedback = "Xarid jarayoni juda yoqdi, ammo yetkazib berish xizmati 2 kunga kechikdi.";
    const req = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: validFeedback }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.summary).toBeTruthy();
    expect(data.sentiment).toBeDefined();
    expect(data.sentiment.positive + data.sentiment.neutral + data.sentiment.negative).toBe(100);
    expect(data.topInsights).toHaveLength(3);
    expect(data.problems.length).toBeGreaterThanOrEqual(1);
    expect(data.meta?.provider).toBeDefined();
  });

  it("should return 400 when request body is invalid JSON", async () => {
    const { POST } = await import("@/app/api/analyze/route");

    const reqInvalid = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "invalid-json-string{",
    });

    const res = await POST(reqInvalid);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Noto'g'ri so'rov formati (JSON kutilgan edi)");
  });
});

describe("Systematic Problem Detection & Prioritization", () => {
  it("should detect billing and delivery issues and prioritize billing as high priority", () => {
    const feedback = "To'lov kartamdan yechildi ammo buyurtma tasdiqlanmadi. Shuningdek kuryer va yetkazib berish juda kechikdi.";
    const result = analyzeFeedbackFallback(feedback);

    expect(result.problems.length).toBeGreaterThanOrEqual(2);
    const billingProblem = result.problems.find((p) => p.priority === "high");
    expect(billingProblem).toBeDefined();
    expect(billingProblem?.solution).toBeTruthy();
  });

  it("should analyze English and Russian feedback accurately", () => {
    const englishFeedback = "The application crashes constantly and has payment refund issues, but customer service was fast.";
    const enResult = analyzeFeedbackFallback(englishFeedback);
    expect(enResult.problems.length).toBeGreaterThanOrEqual(1);
    expect(enResult.sentiment.negative).toBeGreaterThan(0);
    expect(enResult.topInsights).toHaveLength(3);

    const russianFeedback = "Отличный сервис, все очень быстро и качественно доставлено, спасибо большое!";
    const ruResult = analyzeFeedbackFallback(russianFeedback);
    expect(ruResult.sentiment.positive).toBeGreaterThan(50);
    expect(ruResult.topInsights).toHaveLength(3);
  });
});



