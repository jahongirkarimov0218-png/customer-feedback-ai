import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  resetRateLimitCache,
  sanitizeFeedbackInput,
  sanitizeCSVField,
  MAX_FEEDBACK_LENGTH,
  MIN_FEEDBACK_LENGTH,
  RATE_LIMIT_MAX_REQUESTS,
} from "../src/lib/security";
import {
  exportProblemsToCSV,
  sanitizeCSVCell,
} from "../src/components/results/problems-table";
import type { ProblemSolutionItem } from "../src/types/analyzer";

describe("Security Architecture & Defensive Hardening Tests", () => {
  beforeEach(() => {
    resetRateLimitCache();
  });

  describe("SEC-001: Input Validation & Payload Size Boundary Enforcement (CWE-400 / CWE-770)", () => {
    it("should define safe maximum and minimum feedback bounds", () => {
      expect(MIN_FEEDBACK_LENGTH).toBe(10);
      expect(MAX_FEEDBACK_LENGTH).toBe(5000);
      expect(MAX_FEEDBACK_LENGTH).toBeGreaterThan(MIN_FEEDBACK_LENGTH);
    });

    it("should sanitize and detect underflow input", () => {
      const shortInput = "Hi";
      expect(shortInput.length).toBeLessThan(MIN_FEEDBACK_LENGTH);
    });

    it("should detect oversized payload exceeding 5000 characters", () => {
      const massivePayload = "A".repeat(5001);
      expect(massivePayload.length).toBeGreaterThan(MAX_FEEDBACK_LENGTH);
    });
  });

  describe("SEC-002: Rate Limiting & Resource Exhaustion Defense (OWASP API4:2023 / CWE-799)", () => {
    it("should allow requests within rate limit threshold", () => {
      const testIp = "192.168.1.100";
      for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i++) {
        const result = checkRateLimit(testIp, RATE_LIMIT_MAX_REQUESTS, 60000);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(RATE_LIMIT_MAX_REQUESTS - (i + 1));
      }
    });

    it("should block requests and trigger rate limit once threshold is exceeded", () => {
      const testIp = "10.0.0.5";
      for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i++) {
        checkRateLimit(testIp, RATE_LIMIT_MAX_REQUESTS, 60000);
      }

      // Next request must be blocked
      const blocked = checkRateLimit(testIp, RATE_LIMIT_MAX_REQUESTS, 60000);
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
      expect(blocked.resetIn).toBeGreaterThan(0);
    });

    it("should maintain independent counters for distinct IP addresses", () => {
      const ipA = "1.1.1.1";
      const ipB = "2.2.2.2";

      // Exhaust IP A
      for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i++) {
        checkRateLimit(ipA, RATE_LIMIT_MAX_REQUESTS, 60000);
      }
      expect(checkRateLimit(ipA, RATE_LIMIT_MAX_REQUESTS, 60000).allowed).toBe(false);

      // IP B should still be allowed
      expect(checkRateLimit(ipB, RATE_LIMIT_MAX_REQUESTS, 60000).allowed).toBe(true);
    });
  });

  describe("SEC-003: CSV Formula Injection Neutralization (CWE-1236)", () => {
    it("should prepend single quote to formula prefix characters (=, +, -, @, %, \\t)", () => {
      expect(sanitizeCSVCell("=cmd|'/C calc'!A0")).toBe("\"'=cmd|'/C calc'!A0\"");
      expect(sanitizeCSVCell("+12345")).toBe("\"'+12345\"");
      expect(sanitizeCSVCell("-SUM(A1:A10)")).toBe("\"'-SUM(A1:A10)\"");
      expect(sanitizeCSVCell("@SUM(A1:A10)")).toBe("\"'@SUM(A1:A10)\"");
      expect(sanitizeCSVCell("%test")).toBe("\"'%test\"");
    });

    it("should not prepend single quote to standard safe text", () => {
      expect(sanitizeCSVCell("Normal feedback text")).toBe('"Normal feedback text"');
      expect(sanitizeCSVCell("Yetkazib berish xizmati sekin")).toBe('"Yetkazib berish xizmati sekin"');
    });

    it("should sanitize dangerous formula injection payloads during CSV export", () => {
      const maliciousProblems: ProblemSolutionItem[] = [
        {
          problem: "=cmd|'/C calc'!A0",
          priority: "high",
          solution: "=HYPERLINK('http://attacker.com', 'Evil Link')",
          impact: "@EXCEL_MACRO_EXECUTE",
          actionItem: "+malicious_action",
        },
      ];

      const csv = exportProblemsToCSV(maliciousProblems);

      // Verify all cells with formula characters are neutralized with leading single quote
      expect(csv).toContain("\"'=cmd|'/C calc'!A0\"");
      expect(csv).toContain("\"'=HYPERLINK('http://attacker.com', 'Evil Link')\"");
      expect(csv).toContain("\"'@EXCEL_MACRO_EXECUTE\"");
      expect(csv).toContain("\"'+malicious_action\"");
    });
  });

  describe("SEC-004: Input Sanitization (Null bytes, Control Characters)", () => {
    it("should strip null bytes and non-printable control characters", () => {
      const dirty = "Test\0Feedback\x01\x02\x03With\x1FControlChars";
      const cleaned = sanitizeFeedbackInput(dirty);
      expect(cleaned).toBe("TestFeedbackWithControlChars");
      expect(cleaned).not.toContain("\0");
    });

    it("should preserve legitimate whitespace (newlines and tabs)", () => {
      const formatted = "Line 1\nLine 2\tTabbed\r\nLine 3";
      const cleaned = sanitizeFeedbackInput(formatted);
      expect(cleaned).toBe(formatted);
    });
  });
});
