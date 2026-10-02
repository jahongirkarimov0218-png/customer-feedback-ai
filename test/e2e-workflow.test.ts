import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/analyze/route";
import { FEEDBACK_PRESETS } from "@/components/presets";
import { AnalysisResponse, PriorityLevel } from "@/types/analyzer";

describe("E2E Workflow: Feedback Analysis API & Business Logic", () => {
  it("should successfully process all 4 industry presets through /api/analyze and satisfy AnalysisResponse contract", async () => {
    for (const preset of FEEDBACK_PRESETS) {
      const request = new Request("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: preset.fullText }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);

      const data = (await response.json()) as AnalysisResponse;

      // 1. Summary validation
      expect(typeof data.summary).toBe("string");
      expect(data.summary.trim().length).toBeGreaterThan(15);

      // 2. Sentiment distribution validation: positive + neutral + negative === 100
      expect(data.sentiment).toBeDefined();
      expect(typeof data.sentiment.positive).toBe("number");
      expect(typeof data.sentiment.neutral).toBe("number");
      expect(typeof data.sentiment.negative).toBe("number");
      expect(data.sentiment.positive).toBeGreaterThanOrEqual(0);
      expect(data.sentiment.neutral).toBeGreaterThanOrEqual(0);
      expect(data.sentiment.negative).toBeGreaterThanOrEqual(0);

      const totalSentiment =
        data.sentiment.positive + data.sentiment.neutral + data.sentiment.negative;
      expect(totalSentiment).toBe(100);

      // 3. Top Insights validation: length >= 3
      expect(Array.isArray(data.topInsights)).toBe(true);
      expect(data.topInsights.length).toBeGreaterThanOrEqual(3);
      for (const insight of data.topInsights) {
        expect(typeof insight.title).toBe("string");
        expect(insight.title.trim().length).toBeGreaterThan(0);
        expect(typeof insight.description).toBe("string");
        expect(insight.description.trim().length).toBeGreaterThan(0);
      }

      // 4. Problems and Solutions validation: length >= 1
      expect(Array.isArray(data.problems)).toBe(true);
      expect(data.problems.length).toBeGreaterThanOrEqual(1);

      const validPriorities: PriorityLevel[] = ["high", "medium", "low"];
      for (const item of data.problems) {
        expect(typeof item.problem).toBe("string");
        expect(item.problem.trim().length).toBeGreaterThan(0);
        expect(validPriorities).toContain(item.priority);
        expect(typeof item.solution).toBe("string");
        expect(item.solution.trim().length).toBeGreaterThan(0);
      }

      // 5. Meta info validation
      expect(data.meta).toBeDefined();
      expect(data.meta?.provider).toBeDefined();
      expect(typeof data.meta?.totalWords).toBe("number");
      expect((data.meta?.totalWords || 0)).toBeGreaterThan(0);
    }
  });

  it("should process international English feedback and produce actionable insights", async () => {
    const englishFeedback =
      "The checkout process failed twice when using credit card payments. Customers were charged but received no order confirmation. Customer support took 24 hours to respond. Otherwise the product quality is satisfactory.";

    const request = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: englishFeedback }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = (await response.json()) as AnalysisResponse;

    expect(data.summary).toBeTruthy();
    expect(data.sentiment.positive + data.sentiment.neutral + data.sentiment.negative).toBe(100);
    expect(data.sentiment.negative).toBeGreaterThan(0);
    expect(data.topInsights.length).toBeGreaterThanOrEqual(3);
    expect(data.problems.length).toBeGreaterThanOrEqual(1);

    // Should detect payment issue with high priority
    const hasHighPriority = data.problems.some((p) => p.priority === "high");
    expect(hasHighPriority).toBe(true);
  });

  describe("API Validation & Error Handling", () => {
    it("should return 400 when feedback is shorter than 10 characters", async () => {
      const shortInputs = ["", "   ", "Qisqa", "123456789"];

      for (const text of shortInputs) {
        const req = new Request("http://localhost:3000/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback: text }),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.error).toBe("Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak");
      }
    });

    it("should return 400 when payload is invalid JSON or malformed", async () => {
      const req = new Request("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ malformed: json }",
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBe("Noto'g'ri so'rov formati (JSON kutilgan edi)");
    });

    it("should return 400 when feedback is not a string (number, object, null)", async () => {
      const invalidTypes = [1234567890, null, { text: "hello world sample text" }, true];

      for (const val of invalidTypes) {
        const req = new Request("http://localhost:3000/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback: val }),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.error).toBe("Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak");
      }
    });
  });

  describe("Data Exportability & Schema Integrity", () => {
    it("should verify that analysis results can be cleanly serialized to JSON and CSV formats", async () => {
      const feedback =
        "Xizmat juda tez va yaxshi. Ammo ba'zi mahsulotlarning narxi baland va chegirma kuponlari ishlamayapti.";

      const req = new Request("http://localhost:3000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      const res = await POST(req);
      const data = (await res.json()) as AnalysisResponse;

      // JSON serialization test
      const jsonString = JSON.stringify(data);
      expect(jsonString).toBeTruthy();
      const parsed = JSON.parse(jsonString);
      expect(parsed.summary).toBe(data.summary);

      // CSV compatibility test: problem, priority, solution should format without corruption
      const csvHeader = "Muammo,Ustuvorlik,Yechim\n";
      const csvRows = data.problems
        .map((p) => `"${p.problem.replace(/"/g, '""')}","${p.priority}","${p.solution.replace(/"/g, '""')}"`)
        .join("\n");
      const fullCsv = csvHeader + csvRows;

      expect(fullCsv).toContain("Muammo,Ustuvorlik,Yechim");
      expect(fullCsv.split("\n").length).toBeGreaterThanOrEqual(2);
    });
  });
});
