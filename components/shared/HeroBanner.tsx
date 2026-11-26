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

/**
 * First viewport hero — 100dvh/svh tall, but does not lock page scroll.
 * Header overlays (absolute); content below this section scrolls normally.
 */
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
      className={`relative isolate flex h-[100svh] min-h-[100svh] w-full flex-col overflow-hidden supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:min-h-[100dvh] ${className}`}
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
      <div className="relative z-10 flex h-full w-full flex-1 flex-col">
        {children}
      </div>
    </section>
  );
}
