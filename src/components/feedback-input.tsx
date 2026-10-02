"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  RotateCcw,
  Loader2,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Presets, FeedbackPreset, FEEDBACK_PRESETS } from "./presets";

export interface FeedbackInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onAnalyze?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  error?: string | null;
  className?: string;
  showPresets?: boolean;
  onSelectPreset?: (preset: FeedbackPreset) => void;
}

export interface FeedbackStats {
  words: number;
  chars: number;
  remaining: number;
  limitFormatted: string;
  formatted: string;
}

export function getFeedbackStats(text: string, maxLimit = 5000): FeedbackStats {
  const trimmed = (text || "").trim();
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const chars = (text || "").length;
  const remaining = Math.max(0, maxLimit - chars);
  const formattedChars = new Intl.NumberFormat("en-US").format(chars);
  const formattedWords = new Intl.NumberFormat("en-US").format(words);
  const formattedLimit = new Intl.NumberFormat("en-US").format(maxLimit);

  return {
    words,
    chars,
    remaining,
    limitFormatted: `${formattedChars} / ${formattedLimit}`,
    formatted: `${formattedWords} ta so'z · ${formattedChars} ta belgi`,
  };
}

export function FeedbackInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onAnalyze,
  isLoading = false,
  disabled = false,
  placeholder = "Mijozlar sharhlari, e'tirozlari yoki takliflarini shu yerga kiriting (kamida 10 ta belgi). Masalan: 'Buyurtma bergan kiyimlarim o'z vaqtida yetib kelmadi, kuryer 3 kun kechikib yetkazib berdi...'",
  minLength = 10,
  maxLength = 5000,
  error,
  className,
  showPresets = true,
  onSelectPreset,
}: FeedbackInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activePresetId, setActivePresetId] = useState<string | undefined>();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const stats = getFeedbackStats(currentValue, maxLength);
  const isOverLimit = currentValue.length > maxLength;
  const isValidLength = currentValue.trim().length >= minLength && !isOverLimit;
  const canSubmit = isValidLength && !isLoading && !disabled;

  // Sync active preset state if text changes away from preset
  useEffect(() => {
    if (activePresetId) {
      const selected = FEEDBACK_PRESETS.find((p) => p.id === activePresetId);
      if (!selected || currentValue !== selected.fullText) {
        setActivePresetId(undefined);
      }
    }
  }, [currentValue, activePresetId]);

  const handleManualTextChange = (text: string) => {
    if (!isControlled) {
      setInternalValue(text);
    }
    onChange?.(text);
  };

  const handleClear = () => {
    handleManualTextChange("");
    setActivePresetId(undefined);
    textareaRef.current?.focus();
  };

  const handlePresetSelect = (preset: FeedbackPreset) => {
    if (!isControlled) {
      setInternalValue(preset.fullText);
    }
    onChange?.(preset.fullText);
    setActivePresetId(preset.id);
    onSelectPreset?.(preset);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (canSubmit) {
        onAnalyze?.();
      }
    }
  };

  // Smooth auto-resize of textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(140, Math.min(textarea.scrollHeight, 380))}px`;
    }
  }, [currentValue]);

  return (
    <div className={cn("space-y-3.5", className)}>
      {/* 4 Industry Presets Bar */}
      {showPresets && (
        <Presets
          onSelectPreset={handlePresetSelect}
          activePresetId={activePresetId}
          disabled={isLoading || disabled}
        />
      )}

      {/* Main Linear/Raycast Style Intake Card */}
      <div
        className={cn(
          "rounded-xl border bg-white shadow-2xs transition-colors duration-150",
          "focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900",
          error
            ? "border-rose-300 ring-1 ring-rose-200 bg-rose-50/20"
            : "border-slate-200/90"
        )}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-2.5 sm:px-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            <span>Mijoz fikrlari va sharhlari matni</span>
          </div>

          <div className="flex items-center gap-2">
            {currentValue.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading || disabled}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors active:scale-[0.98] transition-transform duration-100 ease-out disabled:opacity-50 select-none"
                title="Matnni tozalash"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
        </div>

        {/* Textarea Area */}
        <div className="p-3.5 sm:p-4">
          <textarea
            ref={textareaRef}
            rows={5}
            value={currentValue}
            onChange={(e) => handleManualTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || disabled}
            placeholder={placeholder}
            aria-label="Mijoz sharhlari va fikrlari"
            className={cn(
              "w-full resize-y bg-transparent text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
              "min-h-[140px] max-h-[380px]"
            )}
          />
        </div>

        {/* Footer Bar: Tabular-nums Counter & Emil Kowalski CTA */}
        <div className="flex flex-col gap-2.5 border-t border-slate-100 bg-slate-50/60 px-3.5 py-2.5 sm:px-4 sm:py-3 sm:flex-row sm:items-center sm:justify-between rounded-b-xl">
          {/* Character & Word Statistics in tabular-nums */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span
              className={cn(
                "font-mono tabular-nums font-semibold",
                isOverLimit ? "text-rose-600" : "text-slate-700"
              )}
            >
              {stats.limitFormatted}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono tabular-nums text-[11px] text-slate-500">
              Qolgan:{" "}
              <span
                className={cn(
                  "font-medium",
                  stats.remaining < 100 && stats.remaining > 0
                    ? "text-amber-600"
                    : stats.remaining === 0
                    ? "text-rose-600"
                    : "text-slate-700"
                )}
              >
                {new Intl.NumberFormat("en-US").format(stats.remaining)}
              </span>
            </span>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="font-mono tabular-nums text-[11px] text-slate-500 hidden sm:inline">
              {stats.words} ta so&apos;z
            </span>

            {currentValue.length > 0 && !isValidLength && !isOverLimit && (
              <span className="inline-flex items-center gap-1 text-rose-600 font-sans font-medium text-[11px]">
                <AlertCircle className="h-3 w-3 shrink-0" />
                (Kamida {minLength} ta belgi kerak)
              </span>
            )}
            {isOverLimit && (
              <span className="inline-flex items-center gap-1 text-rose-600 font-sans font-medium text-[11px]">
                <AlertCircle className="h-3 w-3 shrink-0" />
                (Maksimal {new Intl.NumberFormat("en-US").format(maxLength)} ta belgi)
              </span>
            )}
          </div>

          {/* Action Area: Keyboard Hint & CTA Button */}
          <div className="flex items-center justify-end gap-3">
            <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono select-none">
              <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 shadow-2xs text-slate-600 font-sans text-[10px]">
                Ctrl
              </kbd>
              <span>+</span>
              <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 shadow-2xs text-slate-600 font-sans text-[10px]">
                Enter
              </kbd>
            </div>

            {/* Zero Layout Shift CTA Button with Emil Kowalski Physics */}
            <button
              type="button"
              onClick={onAnalyze}
              disabled={!canSubmit}
              className={cn(
                "inline-flex h-9 w-full sm:w-[160px] items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold tracking-tight text-white select-none transition-colors duration-150",
                "active:scale-[0.98] transition-transform duration-100 ease-out",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:ring-offset-1",
                canSubmit
                  ? "bg-slate-900 hover:bg-slate-800 shadow-xs cursor-pointer"
                  : "bg-slate-200 text-slate-400 hover:bg-slate-200 cursor-not-allowed active:scale-100 shadow-none"
              )}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-300" />
                  <span>Tahlil qilinmoqda...</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span>Tahlil qilish</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Validation Error Alert if Passed */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FeedbackInput;
