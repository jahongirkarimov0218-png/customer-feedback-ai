"use client";

import React from "react";
import {
  ShoppingBag,
  CloudCog,
  Smartphone,
  UtensilsCrossed,
  LucideIcon,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedbackPreset {
  id: "ecommerce" | "b2b-saas" | "fintech" | "service-restaurant" | string;
  title: string;
  badge: string;
  iconName: "ShoppingBag" | "CloudCog" | "Smartphone" | "UtensilsCrossed";
  icon: string;
  summary: string;
  fullText: string;
}

export const FEEDBACK_PRESETS: FeedbackPreset[] = [
  {
    id: "ecommerce",
    title: "E-Commerce & Retail",
    badge: "Internet-do'kon",
    iconName: "ShoppingBag",
    icon: "ShoppingBag",
    summary: "Yetkazib berish kechikishi, qadoqlash sifati va narxlar bo'yicha sharhlar",
    fullText:
      "Buyurtma bergan kiyimlarim o'z vaqtida yetib kelmadi, kuryer 3 kun kechikib yetkazib berdi. Qadoq yirtilgan, ichidagi quti ezilgan edi. Mahsulotning o'zi sifati yomon emas, lekin saytdagi fotosuratdagi rangdan ancha farq qiladi. Narxlar esa boshqa platformalarga qaraganda ancha qimmat. Qo'llab-quvvatlash xizmati operatori savollarimga juda qo'pol javob berdi va kompensatsiya berishdan bosh tortdi. Mahsulotni qaytarish jarayoni esa haddan tashqari murakkab.",
  },
  {
    id: "b2b-saas",
    title: "B2B SaaS Platform",
    badge: "Korporativ SaaS",
    iconName: "CloudCog",
    icon: "CloudCog",
    summary: "API tezlik limitlari, yangi jamoa onboardingi va kechikayotgan webhooklar",
    fullText:
      "Bizning jamoa tizimingizdan 6 oydan beri foydalanmoqda. Analitika dashboardi juda qulay, hisobotlarni PDF va Excel formatida yuklab olish oson. Biroq yangi jamoa a'zolarini onboarding qilish qiyin, hujjatlar eskirgan. Eng katta muammo — REST API tezlik limitlari (rate limiting) kutilmaganda 429 xatosini qaytaradi va webhooklar 15-20 daqiqagacha kechikmoqda. Bu bizning avtomatlashtirilgan CRM integratsiyamizni to'xtatib qo'ymoqda. Webhook loglari va qayta yuborish (retry) mexanizmi zarur.",
  },
  {
    id: "fintech",
    title: "Fintech & Mobile App",
    badge: "Bank & To'lov",
    iconName: "Smartphone",
    icon: "Smartphone",
    summary: "Ilova yangilanishidan keyingi krashtlar, FaceID va kechikkan bildirishnomalar",
    fullText:
      "Ilovaning 3.4.0 talqini yangilangandan so'ng juda ko'p nosozliklar paydo bo'ldi. Har safar pul o'tkazmasi qilmoqchi bo'lganimda ilova o'z-o'zidan yopilib qolmoqda (crash bo'lyapti). FaceID orqali biometrik kirish deyarli ishlamay qoldi, har safar 6 xonali parolni qo'lda kiritishga majburman. P2P o'tkazmalar bo'yicha push-bildirishnomalar umuman kelmayapti yoki bir necha soatdan keyin kelyapti. Xavfsizlik va barqarorlik muhim bo'lgan bunday moliyaviy ilovada bu kabi xatolar jiddiy xavotir uyg'otadi.",
  },
  {
    id: "service-restaurant",
    title: "Restoran & Servis",
    badge: "Xizmat ko'rsatish",
    iconName: "UtensilsCrossed",
    icon: "UtensilsCrossed",
    summary: "Navbat kutish, ofitsiantlar xushmuomalaligi va taomlar sifati",
    fullText:
      "O'tgan shanba kuni oilaviy tushlik uchun restoraningizga bordik. Bron qilingan stolimiz o'z vaqtida tayyor emas edi, 25 daqiqa zalda kutishimizga to'g'ri keldi. Ofitsiant buyurtmani 40 daqiqada olib keldi, taomlar sovuq edi va go'sht yetarlicha pishmagan edi. Biroq shirinliklar va kofe juda mazali bo'ldi, muhit va interyer ajoyib. Xodimlar mijozlarga nisbatan e'tiborliroq bo'lishi va oshxona tezligini oshirishi zarur.",
  },
];

const PRESET_ICONS: Record<string, LucideIcon> = {
  ShoppingBag,
  CloudCog,
  Smartphone,
  UtensilsCrossed,
};

export interface PresetsProps {
  onSelectPreset: (preset: FeedbackPreset) => void;
  activePresetId?: string;
  disabled?: boolean;
  className?: string;
}

export function Presets({
  onSelectPreset,
  activePresetId,
  disabled = false,
  className,
}: PresetsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Haqiqiy Mijoz Ma&apos;lumotlari Namunalari (Industry Scenarios)
        </label>
        <span className="text-[11px] text-slate-400 font-medium">1-klik bilan sinash</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEEDBACK_PRESETS.map((preset) => {
          const Icon = PRESET_ICONS[preset.iconName] || ShoppingBag;
          const isActive = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPreset(preset)}
              className={cn(
                "group relative flex flex-col items-start rounded-xl p-1 text-left transition-all duration-150 active-press",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-1",
                isActive
                  ? "bg-slate-950 ring-2 ring-slate-950/20"
                  : "bg-slate-200/60 hover:bg-slate-300/60 border border-slate-200/50",
                disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {/* Inner core */}
              <div
                className={cn(
                  "w-full h-full rounded-[calc(0.75rem-2px)] p-3 transition-colors flex flex-col justify-between",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-800 hover:bg-slate-50/90"
                )}
              >
                <div>
                  <div className="flex w-full items-center justify-between mb-2.5">
                    <div
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-white/10 text-emerald-400"
                          : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight",
                        isActive
                          ? "bg-white/15 text-slate-200"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {preset.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold leading-snug">
                    <span className={isActive ? "text-white" : "text-slate-950"}>
                      {preset.title}
                    </span>
                    {isActive && (
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 inline-block" />
                    )}
                  </div>

                  <p
                    className={cn(
                      "mt-1.5 line-clamp-2 text-[11px] leading-relaxed",
                      isActive ? "text-slate-300" : "text-slate-500"
                    )}
                  >
                    {preset.summary}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Presets;
