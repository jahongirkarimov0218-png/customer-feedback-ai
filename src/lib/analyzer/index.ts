import type { AnalysisResponse } from "@/types/analyzer";
import { analyzeFeedbackFallback } from "./fallback-engine";
import { analyzeWithGemini } from "./gemini";
import { analyzeWithOpenAI } from "./openai";

export { analyzeFeedbackFallback } from "./fallback-engine";
export { analyzeWithGemini } from "./gemini";
export { analyzeWithOpenAI } from "./openai";

/**
 * Unified feedback analyzer:
 * 1. Checks for Gemini API key -> attempts Gemini 1.5 Flash
 * 2. Checks for OpenAI API key -> attempts GPT-4o-mini
 * 3. Gracefully falls back to Built-in Semantic Engine on missing keys or network/quota errors
 */
export async function analyzeFeedback(feedback: string): Promise<AnalysisResponse> {
  // Try Gemini first
  try {
    const geminiResult = await analyzeWithGemini(feedback);
    if (geminiResult) {
      return geminiResult;
    }
  } catch (err) {
    console.warn("Gemini analyzer failed, attempting fallback:", err);
  }

  // Try OpenAI second
  try {
    const openAIResult = await analyzeWithOpenAI(feedback);
    if (openAIResult) {
      return openAIResult;
    }
  } catch (err) {
    console.warn("OpenAI analyzer failed, attempting fallback:", err);
  }

  // Built-in 100% offline fallback engine
  return analyzeFeedbackFallback(feedback);
}
