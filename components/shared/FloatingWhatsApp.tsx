"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import { whatsappEnquiryUrl } from "@/lib/products";

/** Persistent bottom-right WhatsApp control — logo only (Prem) */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappEnquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enquire on WhatsApp ${brand.placeholders.whatsappDisplay}`}
      className="fixed bottom-5 right-4 z-[55] inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg shadow-black/30 transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <Image
        src="/brand/whatsapp-icon.png"
        alt=""
          width={512}
          height={512}
        className="h-full w-full object-cover"
        priority
      />
    </a>
  );
}
