"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import type { DesignId } from "@/lib/types";

const STORAGE_KEY = "nithyam-enquiry-dismissed";
const HOME_DELAY_MS = 5000;
const THANKS_VISIBLE_MS = 4200;

type Props = {
  /** Only schedule / show on the home page */
  active: boolean;
  design: DesignId;
};

type Tone = {
  panel: string;
  muted: string;
  input: string;
  primary: string;
  accent: string;
  check: string;
};

const tones: Record<DesignId, Tone> = {
  A: {
    panel: "border-[#B8883A]/35 bg-[#0F0F0F] text-[#F4F4F6]",
    muted: "text-white/55",
    input:
      "border-[#B8883A]/30 bg-[#0A0A0A] text-white placeholder:text-white/35 focus:border-[#E8C17A]",
    primary: "bg-[#B8883A] text-[#0A0A0A] hover:brightness-105",
    accent: "text-[#E8C17A]",
    check: "border-[#E8C17A]/50 text-[#E8C17A]",
  },
  B: {
    panel: "border-[#E8E4E2] bg-white text-[#161616]",
    muted: "text-[#6B6B73]",
    input:
      "border-[#E0DCD9] bg-[#FAF8F7] text-[#161616] placeholder:text-[#9A9AA3] focus:border-[#302850]",
    primary: "bg-[#302850] text-white hover:bg-[#241E3D]",
    accent: "text-[#302850]",
    check: "border-[#302850]/35 text-[#302850]",
  },
  C: {
    panel: "border-white/15 bg-[#151515] text-[#EDEDED]",
    muted: "text-white/55",
    input:
      "border-white/15 bg-[#111111] text-white placeholder:text-white/35 focus:border-white/40",
    primary: "bg-white text-black hover:bg-white/90",
    accent: "text-[#C4898E]",
    check: "border-[#C4898E]/50 text-[#C4898E]",
  },
  D: {
    panel: "border-[#E8C17A]/30 bg-[#15261B] text-[#F8F4EC]",
    muted: "text-[#D5D8C8]/80",
    input:
      "border-[#E8C17A]/25 bg-[#1B3022] text-[#F8F4EC] placeholder:text-[#D5D8C8]/45 focus:border-[#E8C17A]",
    primary: "bg-[#C9893A] text-[#1B3022] hover:brightness-105",
    accent: "text-[#E8C17A]",
    check: "border-[#E8C17A]/45 text-[#E8C17A]",
  },
};

function wasDismissed() {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Home-only enquiry prompt after 5 seconds.
 * Successful submit shows a thank-you confirmation, then closes.
 * Close / submit remembered in localStorage so reloads are not spammed.
 */
export function EnquiryPopup({ active, design }: Props) {
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const titleId = useId();
  const tone = tones[design];
  const thanksTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      setSent(false);
      if (thanksTimerRef.current) {
        window.clearTimeout(thanksTimerRef.current);
        thanksTimerRef.current = null;
      }
      return;
    }
    if (wasDismissed()) return;

    const timer = window.setTimeout(() => setVisible(true), HOME_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  function dismiss() {
    markDismissed();
    setVisible(false);
    setSent(false);
    if (thanksTimerRef.current) {
      window.clearTimeout(thanksTimerRef.current);
      thanksTimerRef.current = null;
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    markDismissed();
    if (thanksTimerRef.current) window.clearTimeout(thanksTimerRef.current);
    thanksTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      setSent(false);
      thanksTimerRef.current = null;
    }, THANKS_VISIBLE_MS);
  }

  if (!visible || !active) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Dismiss enquiry"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-sm border p-5 shadow-2xl sm:p-6 ${tone.panel}`}
      >
        {!sent ? (
          <button
            type="button"
            onClick={dismiss}
            className={`absolute right-3 top-3 rounded-sm p-1.5 opacity-70 transition hover:opacity-100 ${tone.muted}`}
            aria-label="Close enquiry form"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}

        {sent ? (
          <div className="flex flex-col items-center px-2 py-8 text-center">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border ${tone.check}`}
              aria-hidden
            >
              <Check className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p
              id={titleId}
              className={`mt-5 text-[11px] uppercase tracking-[0.2em] ${tone.accent}`}
            >
              Enquiry received
            </p>
            <h2 className="mt-2 text-xl leading-snug sm:text-2xl">
              Thank you for writing to us
            </h2>
            <p className={`mt-3 max-w-sm text-sm leading-relaxed ${tone.muted}`}>
              We have noted your details. Our team will get in touch with you
              shortly on your mobile or email.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className={`mt-6 text-[11px] uppercase tracking-[0.16em] underline underline-offset-4 ${tone.accent}`}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className={`text-[11px] uppercase tracking-[0.2em] ${tone.accent}`}>
              Soft enquiry
            </p>
            <h2
              id={titleId}
              className="mt-2 pr-8 text-xl leading-snug sm:text-2xl"
            >
              Looking for the right silver piece?
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>
              Leave your details and we shall call you back — no obligation.
            </p>

            <form className="mt-5 space-y-3" onSubmit={onSubmit}>
              <div>
                <label className="sr-only" htmlFor="enquiry-name">
                  Your name
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={`w-full rounded-sm border px-3 py-2.5 text-sm outline-none ${tone.input}`}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="enquiry-phone">
                  Mobile number
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Mobile number"
                  className={`w-full rounded-sm border px-3 py-2.5 text-sm outline-none ${tone.input}`}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="enquiry-email">
                  Email address
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  className={`w-full rounded-sm border px-3 py-2.5 text-sm outline-none ${tone.input}`}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="enquiry-message">
                  Your message
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="How may we help you?"
                  className={`min-h-[5.5rem] w-full resize-y rounded-sm border px-3 py-2.5 text-sm outline-none ${tone.input}`}
                />
              </div>
              <button
                type="submit"
                className={`w-full rounded-sm px-4 py-3 text-[11px] uppercase tracking-[0.18em] transition ${tone.primary}`}
              >
                Send enquiry
              </button>
              <p className={`text-center text-[10px] leading-relaxed ${tone.muted}`}>
                Preview only — details are not stored on a live server yet.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
