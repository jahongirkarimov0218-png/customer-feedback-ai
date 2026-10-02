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
    title: "E-Commerce",
    badge: "E-Commerce",
    iconName: "ShoppingBag",
    icon: "ShoppingBag",
    summary: "Yetkazib berish kechikishi, qadoqlash sifati va narxlar bo'yicha sharhlar",
    fullText:
      "Buyurtma bergan kiyimlarim o'z vaqtida yetib kelmadi, kuryer 3 kun kechikib yetkazib berdi. Qadoq yirtilgan, ichidagi quti ezilgan edi. Mahsulotning o'zi sifati yomon emas, lekin saytdagi fotosuratdagi rangdan ancha farq qiladi. Narxlar esa boshqa platformalarga qaraganda ancha qimmat. Qo'llab-quvvatlash xizmati operatori savollarimga juda qo'pol javob berdi va kompensatsiya berishdan bosh tortdi. Mahsulotni qaytarish jarayoni esa haddan tashqari murakkab.",
  },
  {
    id: "b2b-saas",
    title: "B2B SaaS",
    badge: "B2B SaaS",
    iconName: "CloudCog",
    icon: "CloudCog",
    summary: "API tezlik limitlari, yangi jamoa onboardingi va kechikayotgan webhooklar",
    fullText:
      "Bizning jamoa tizimingizdan 6 oydan beri foydalanmoqda. Analitika dashboardi juda qulay, hisobotlarni PDF va Excel formatida yuklab olish oson. Biroq yangi jamoa a'zolarini onboarding qilish qiyin, hujjatlar eskirgan. Eng katta muammo — REST API tezlik limitlari (rate limiting) kutilmaganda 429 xatosini qaytaradi va webhooklar 15-20 daqiqagacha kechikmoqda. Bu bizning avtomatlashtirilgan CRM integratsiyamizni to'xtatib qo'ymoqda. Webhook loglari va qayta yuborish (retry) mexanizmi zarur.",
  },
  {
    id: "fintech",
    title: "Fintech",
    badge: "Fintech",
    iconName: "Smartphone",
    icon: "Smartphone",
    summary: "Ilova yangilanishidan keyingi krashtlar, FaceID va kechikkan bildirishnomalar",
    fullText:
      "Ilovaning 3.4.0 talqini yangilangandan so'ng juda ko'p nosozliklar paydo bo'ldi. Har safar pul o'tkazmasi qilmoqchi bo'lganimda ilova o'z-o'zidan yopilib qolmoqda (crash bo'lyapti). FaceID orqali biometrik kirish deyarli ishlamay qoldi, har safar 6 xonali parolni qo'lda kiritishga majburman. P2P o'tkazmalar bo'yicha push-bildirishnomalar umuman kelmayapti yoki bir necha soatdan keyin kelyapti. Xavfsizlik va barqarorlik muhim bo'lgan bunday moliyaviy ilovada bu kabi xatolar jiddiy xavotir uyg'otadi.",
  },
  {
    id: "service-restaurant",
    title: "Marketplace",
    badge: "Marketplace",
    iconName: "UtensilsCrossed",
    icon: "UtensilsCrossed",
    summary: "Xizmat ko'rsatish sifati, bron qilish va navbat kutish bo'yicha fikrlar",
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
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-medium text-slate-500 mr-1 select-none">
        Namunalar:
      </span>

      {FEEDBACK_PRESETS.map((preset) => {
        const Icon = PRESET_ICONS[preset.iconName] || ShoppingBag;
        const isActive = activePresetId === preset.id;

        return (
          <button
            key={preset.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectPreset(preset)}
            aria-pressed={isActive}
            aria-label={`Namuna: ${preset.title}`}
            title={preset.summary}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium select-none transition-all duration-150",
              "active:scale-[0.98] transition-transform duration-100 ease-out",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:ring-offset-1",
              isActive
                ? "border-slate-900 bg-slate-900 text-white shadow-2xs"
                : "border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 shadow-2xs",
              disabled && "cursor-not-allowed opacity-50 active:scale-100"
            )}
          >
            {isActive ? (
              <Check className="h-3 w-3 text-emerald-400 shrink-0" />
            ) : (
              <Icon className="h-3 w-3 text-slate-400 group-hover:text-slate-600 shrink-0" />
            )}
            <span>{preset.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Presets;
