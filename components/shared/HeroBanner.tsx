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
 * Exact first viewport — 100dvh/svh, no header height subtracted.
 * Site header must be position:absolute overlaying this section.
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
      className={`relative isolate flex h-svh max-h-svh min-h-svh w-full flex-col overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh supports-[height:100dvh]:min-h-dvh ${className}`}
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
