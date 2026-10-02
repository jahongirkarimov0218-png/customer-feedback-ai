import { NextResponse } from "next/server";
import { analyzeFeedback } from "@/lib/analyzer";
import {
  checkRateLimit,
  getClientIp,
  sanitizeFeedbackInput,
  MIN_FEEDBACK_LENGTH,
  MAX_FEEDBACK_LENGTH,
  RATE_LIMIT_MAX_REQUESTS,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. IP-based Rate Limiting (OWASP API4:2023 mitigation)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "So'rovlar soni me'yordan oshdi. Iltimos, biroz kutib qayta urinib ko'ring.",
          retryAfterSeconds: rateLimit.resetIn,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetIn),
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Request body format validation (JSON parsing security)
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Noto'g'ri so'rov formati (JSON kutilgan edi)" },
        { status: 400 }
      );
    }

    const rawFeedback = body?.feedback;

    // 3. Type check & Underflow validation
    if (
      typeof rawFeedback !== "string" ||
      rawFeedback.trim().length < MIN_FEEDBACK_LENGTH
    ) {
      return NextResponse.json(
        {
          error: `Fikr matni kamida ${MIN_FEEDBACK_LENGTH} ta belgidan iborat bo'lishi kerak`,
        },
        { status: 400 }
      );
    }

    // 4. Input Length Upper-bound Enforcement (DoS / Buffer Overflow / Memory Exhaustion prevention)
    if (rawFeedback.length > MAX_FEEDBACK_LENGTH) {
      return NextResponse.json(
        {
          error: `Fikr matni maksimal ${MAX_FEEDBACK_LENGTH} ta belgidan oshmasligi kerak (yuborildi: ${rawFeedback.length} ta belgi)`,
        },
        { status: 413 }
      );
    }

    // 5. Input Sanitization (Null bytes, control character neutralization)
    const sanitized = sanitizeFeedbackInput(rawFeedback.trim());

    if (sanitized.length < MIN_FEEDBACK_LENGTH) {
      return NextResponse.json(
        { error: "Kiritilgan matnda yetarli mazmunli belgilar mavjud emas" },
        { status: 400 }
      );
    }

    // 6. Execute Analyzer
    const result = await analyzeFeedback(sanitized);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch (error) {
    // 7. Secure logging without leaking sensitive internals
    console.error("Analysis API error occurred:", error instanceof Error ? error.message : "Internal error");
    return NextResponse.json(
      { error: "Tahlil jarayonida kutilmagan xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

