import { describe, it, expect } from "vitest";
import { FEEDBACK_PRESETS, Presets } from "@/components/presets";

describe("Ticket 03: Presets & Samples", () => {
  it("should have at least 4 realistic industry presets with valid structure", () => {
    expect(FEEDBACK_PRESETS).toBeDefined();
    expect(Array.isArray(FEEDBACK_PRESETS)).toBe(true);
    expect(FEEDBACK_PRESETS.length).toBeGreaterThanOrEqual(4);

    const requiredIds = ["ecommerce", "b2b-saas", "fintech", "service-restaurant"];
    const actualIds = FEEDBACK_PRESETS.map((p) => p.id);
    requiredIds.forEach((id) => {
      expect(actualIds).toContain(id);
    });

    FEEDBACK_PRESETS.forEach((preset) => {
      expect(preset.id).toBeTruthy();
      expect(preset.title).toBeTruthy();
      expect(preset.badge).toBeTruthy();
      expect(preset.summary).toBeTruthy();
      expect(preset.fullText).toBeTruthy();
      // Har bir namuna mazmunli bo'lishi kerak (kamida 100 ta belgi)
      expect(preset.fullText.length).toBeGreaterThanOrEqual(100);
      expect(preset.icon).toBeDefined();
    });
  });

  it("should export Presets component as a valid React component", () => {
    expect(typeof Presets).toBe("function");
  });
});

describe("Ticket 03: Feedback Input & Stats", () => {
  it("should compute accurate word and character counts", async () => {
    const { getFeedbackStats } = await import("@/components/feedback-input");
    expect(typeof getFeedbackStats).toBe("function");

    const emptyStats = getFeedbackStats("");
    expect(emptyStats.words).toBe(0);
    expect(emptyStats.chars).toBe(0);
    expect(emptyStats.formatted).toContain("0 ta so'z");
    expect(emptyStats.formatted).toContain("0 ta belgi");

    const sampleText = "Mijoz xizmatidan juda mamnun bo'ldik, rahmat!";
    const stats = getFeedbackStats(sampleText);
    expect(stats.words).toBe(6);
    expect(stats.chars).toBe(sampleText.length);
    expect(stats.formatted).toContain("6 ta so'z");

    // Multiple spaces and newlines
    const complexSpacing = "  Birinchi   ikkinchi \n uchinchi\t to'rtinchi  ";
    const complexStats = getFeedbackStats(complexSpacing);
    expect(complexStats.words).toBe(4);
    expect(complexStats.chars).toBe(complexSpacing.length);
  });

  it("should export FeedbackInput component as a valid React component", async () => {
    const React = await import("react");
    const { FeedbackInput } = await import("@/components/feedback-input");
    expect(typeof FeedbackInput).toBe("function");

    const element = React.createElement(FeedbackInput, {
      value: "Test matn",
      onChange: () => {},
      onAnalyze: () => {},
    });
    expect(element).toBeDefined();
    expect(element.type).toBe(FeedbackInput);
  });
});

describe("Ticket 03: Skeleton Loader & Shimmer States", () => {
  it("should export SkeletonLoader and granular section skeletons", async () => {
    const React = await import("react");
    const {
      SkeletonLoader,
      SummarySkeleton,
      SentimentSkeleton,
      InsightsSkeleton,
      ProblemsSkeleton,
    } = await import("@/components/skeleton-loader");

    expect(typeof SkeletonLoader).toBe("function");
    expect(typeof SummarySkeleton).toBe("function");
    expect(typeof SentimentSkeleton).toBe("function");
    expect(typeof InsightsSkeleton).toBe("function");
    expect(typeof ProblemsSkeleton).toBe("function");

    const loaderElem = React.createElement(SkeletonLoader);
    expect(loaderElem).toBeDefined();
    expect(loaderElem.type).toBe(SkeletonLoader);
  });
});

describe("Ticket 03: Error Alert Component", () => {
  it("should export ErrorAlert component and instantiate with different types", async () => {
    const React = await import("react");
    const { ErrorAlert } = await import("@/components/error-alert");
    expect(typeof ErrorAlert).toBe("function");

    const types = ["validation", "network", "server", "rate-limit", "generic"] as const;
    types.forEach((type) => {
      const alertElem = React.createElement(ErrorAlert, {
        message: `Xatolik: ${type}`,
        type,
        onRetry: () => {},
      });
      expect(alertElem).toBeDefined();
      expect(alertElem.props.type).toBe(type);
      expect(alertElem.props.message).toBe(`Xatolik: ${type}`);
    });
  });
});



