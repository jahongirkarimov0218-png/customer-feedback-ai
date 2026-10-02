import { NextResponse } from "next/server";
import { analyzeFeedback } from "@/lib/analyzer";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Noto'g'ri so'rov formati (JSON kutilgan edi)" },
        { status: 400 }
      );
    }

    const feedback = body?.feedback;

    if (
      typeof feedback !== "string" ||
      feedback.trim().length < 10
    ) {
      return NextResponse.json(
        { error: "Fikr matni kamida 10 ta belgidan iborat bo'lishi kerak" },
        { status: 400 }
      );
    }

    const result = await analyzeFeedback(feedback.trim());

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Tahlil jarayonida kutilmagan xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
