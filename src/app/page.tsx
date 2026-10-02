import React from "react";
import { Sparkles, BarChart3, Lightbulb, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero Section */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-subtle">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Semantic AI Intelligence • Roma Rayt Pattern</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Mijoz fikrlarini AI orqali chuqur semantik tahlil qilish
        </h1>
        <p className="mt-2.5 max-w-3xl text-base text-slate-600">
          Mijozlar sharhlari va e&apos;tirozlarini bir zumda tahlil qiling: aniq sentiment taqsimoti,
          3 ta eng muhim strategik insight va amaliy yechimlar jadvali.
        </p>

        {/* Value Prop Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <BarChart3 className="h-4 w-4 text-emerald-600" />
            <span>Sentiment Tahlili</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <span>Top 3 Xulosalar</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span>Ustuvor Yechimlar Matritsasi</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-subtle">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span>Smart Fallback Engine</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Placeholder (Ready for Ticket 02 and Ticket 03) */}
      <section
        id="analyzer-workspace"
        className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 mb-3">
            <Sparkles className="h-6 w-6 text-slate-700" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tahlil maydoni tayyor
          </h2>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Dizayn tokenlari va tayanch freymvork to&apos;liq sozlandi. Keyingi bosqichda kiritish maydoni (Ticket 02) va tahlil natijalari (Ticket 03) ulanadi.
          </p>
        </div>
      </section>
    </div>
  );
}
