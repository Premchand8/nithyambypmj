"use client";

import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  children: ReactNode;
  /** CSS object-position, e.g. "center 35%" */
  position?: string;
  overlayClassName?: string;
  className?: string;
  priority?: boolean;
};

/** Fixed first-viewport hero — full bleed, min 100svh */
export function HeroBanner({
  src,
  alt,
  children,
  position = "center center",
  overlayClassName = "bg-gradient-to-b from-black/50 via-black/35 to-black/75",
  className = "",
  priority = true,
}: Props) {
  return (
    <section
      className={`relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
      <div className="relative z-10 flex min-h-[100svh] w-full flex-1 flex-col">
        {children}
      </div>
    </section>
  );
}
