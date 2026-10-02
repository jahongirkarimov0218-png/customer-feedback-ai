"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  RotateCcw,
  Loader2,
  CornerDownLeft,
  FileText,
  AlertCircle,
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
  error?: string | null;
  className?: string;
  showPresets?: boolean;
  onSelectPreset?: (preset: FeedbackPreset) => void;
}

export interface FeedbackStats {
  words: number;
  chars: number;
  formatted: string;
}

export function getFeedbackStats(text: string): FeedbackStats {
  const trimmed = (text || "").trim();
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const chars = (text || "").length;
  const formattedChars = new Intl.NumberFormat("en-US").format(chars);
  const formattedWords = new Intl.NumberFormat("en-US").format(words);

  return {
    words,
    chars,
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
  placeholder = "Mijozlar sharhlari, e'tirozlari yoki takliflarini shu yerga kiriting (kamida 10 ta belgi). Masalan: 'Buyurtma bergan kiyimlarim o'z vaqtida kelmadi, kuryer 3 kun kechikdi...'",
  minLength = 10,
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

  const stats = getFeedbackStats(currentValue);
  const isValidLength = currentValue.trim().length >= minLength;
  const canSubmit = isValidLength && !isLoading && !disabled;

  const handleTextChange = (text: string) => {
    if (!isControlled) {
      setInternalValue(text);
    }
    onChange?.(text);
    setActivePresetId(undefined);
  };

  const handleClear = () => {
    handleTextChange("");
    setActivePresetId(undefined);
    textareaRef.current?.focus();
  };

  const handlePresetSelect = (preset: FeedbackPreset) => {
    handleTextChange(preset.fullText);
    setActivePresetId(preset.id);
    onSelectPreset?.(preset);
    // Focus and scroll
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

  // Auto-resize textarea height smoothly
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(160, Math.min(textarea.scrollHeight, 400))}px`;
    }
  }, [currentValue]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Presets Bar */}
      {showPresets && (
        <Presets
          onSelectPreset={handlePresetSelect}
          activePresetId={activePresetId}
          disabled={isLoading || disabled}
        />
      )}

      {/* Main Input Card */}
      <div
        className={cn(
          "relative rounded-xl border bg-white shadow-card transition-all duration-150",
          "focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-800/10",
          error ? "border-rose-300 ring-1 ring-rose-200" : "border-slate-200/90"
        )}
      >
        {/* Header bar of textarea */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            <span>Mijoz fikrlari matni</span>
          </div>

          <div className="flex items-center gap-2">
            {currentValue.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading || disabled}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors disabled:opacity-50"
                title="Matnni tozalash"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
        </div>

        {/* Textarea Area */}
        <div className="p-3 sm:p-4">
          <textarea
            ref={textareaRef}
            rows={6}
            value={currentValue}
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || disabled}
            placeholder={placeholder}
            className={cn(
              "w-full resize-y bg-transparent text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
              "min-h-[140px]"
            )}
          />
        </div>

        {/* Footer Bar: Counters & CTA Button */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between rounded-b-xl">
          {/* Word and Character Count */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono text-slate-600">{stats.formatted}</span>
            {currentValue.length > 0 && !isValidLength && (
              <span className="inline-flex items-center gap-1 text-rose-500 font-medium">
                <AlertCircle className="h-3 w-3" />
                (Kamida {minLength} ta belgi kerak)
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5">
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono shadow-subtle">
                Ctrl
              </kbd>
              <span>+</span>
              <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono shadow-subtle">
                Enter
              </kbd>
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={!canSubmit}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-150",
                "shadow-subtle focus:outline-none focus:ring-2 focus:ring-slate-900/20 active:scale-[0.99]",
                canSubmit
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-300" />
                  <span>Tahlil qilinmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Tahlil qilish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Inline Input Error if passed */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FeedbackInput;
