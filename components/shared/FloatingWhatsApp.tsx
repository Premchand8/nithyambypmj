"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import { whatsappEnquiryUrl } from "@/lib/products";

/** Prem’s WhatsApp PNG as-is — logo only, no extra chrome */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappEnquiryUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enquire on WhatsApp ${brand.placeholders.whatsappDisplay}`}
      className="fixed bottom-5 right-4 z-[55] block h-12 w-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <Image
        src="/brand/whatsapp-icon.png?v=as-is"
        alt=""
        width={512}
        height={512}
        className="h-full w-full object-contain"
        unoptimized
        priority
      />
    </a>
  );
}
