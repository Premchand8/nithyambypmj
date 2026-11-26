"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import { whatsappEnquiryUrl } from "@/lib/products";

/** Persistent bottom-right WhatsApp enquire control (Prem-supplied brand icon) */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappEnquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enquire on WhatsApp ${brand.placeholders.whatsappDisplay}`}
      className="fixed bottom-5 right-4 z-[55] inline-flex items-center gap-2 rounded-full bg-[#25D366] p-1 shadow-lg shadow-black/30 transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:gap-2.5 sm:p-1.5 sm:pr-4"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white sm:h-12 sm:w-12">
        <Image
          src="/brand/whatsapp-icon.png"
          alt=""
          width={107}
          height={112}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="hidden leading-tight text-white sm:flex sm:flex-col sm:pr-1">
        <span className="text-sm font-semibold tracking-wide">WhatsApp</span>
        <span className="text-[11px] font-normal text-white/90">
          {brand.placeholders.whatsappDisplay}
        </span>
      </span>
    </a>
  );
}
