"use client";

import { MessageCircle } from "lucide-react";
import { brand } from "@/lib/brand";
import { whatsappEnquiryUrl } from "@/lib/products";

/** Persistent bottom-right WhatsApp enquire control (dummy number for preview) */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappEnquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enquire on WhatsApp ${brand.placeholders.whatsappDisplay}`}
      className="fixed bottom-5 right-5 z-[75] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-sm font-medium text-[#0A0A0A] shadow-lg shadow-black/25 transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:px-4"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
      <span className="hidden leading-tight sm:flex sm:flex-col">
        <span>WhatsApp</span>
        <span className="text-[11px] font-normal opacity-80">
          {brand.placeholders.whatsappDisplay}
        </span>
      </span>
    </a>
  );
}
