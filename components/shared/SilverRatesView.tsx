"use client";

import {
  formatDisplayDate,
  formatInr,
  getSampleSilverRates,
} from "@/lib/silverRates";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/Breadcrumbs";

type Tone = "dark" | "light" | "forest";

const styles: Record<
  Tone,
  {
    section: string;
    eyebrow: string;
    title: string;
    muted: string;
    accent: string;
    tile: string;
    hairline: string;
    headBg: string;
    crumb: "dark" | "light" | "forest" | "gold";
  }
> = {
  dark: {
    section: "text-[#F4F4F6]",
    eyebrow: "text-[#B8883A]",
    title: "text-white",
    muted: "text-white/55",
    accent: "text-[#E8C17A]",
    tile: "border-white/10 bg-white/[0.04]",
    hairline: "border-white/10",
    headBg: "bg-white/[0.04]",
    crumb: "gold",
  },
  light: {
    section: "text-[#161616]",
    eyebrow: "text-[#6B6B73]",
    title: "text-[#0A0A0A]",
    muted: "text-[#5F5F67]",
    accent: "text-[#302850]",
    tile: "border-[#E8E4E2] bg-[#F7F3EF]",
    hairline: "border-[#E6E1DC]",
    headBg: "bg-[#F4F0EC]",
    crumb: "light",
  },
  forest: {
    section: "text-[#F4F4F6]",
    eyebrow: "text-[#E8C17A]",
    title: "text-[#F4F4F6]",
    muted: "text-[#D5D8C8]/65",
    accent: "text-[#E8C17A]",
    tile: "border-[#E8C17A]/20 bg-[#15261B]/80",
    hairline: "border-[#E8C17A]/20",
    headBg: "bg-[#15261B]",
    crumb: "forest",
  },
};

type Props = {
  tone?: Tone;
  crumbs: BreadcrumbItem[];
  onBack: () => void;
};

/** Full silver rates page - today + last 10 days (Phase 1 sample) */
export function SilverRatesView({
  tone = "dark",
  crumbs,
  onBack,
}: Props) {
  const rates = getSampleSilverRates();
  const s = styles[tone];

  return (
    <section className={`px-4 pb-24 pt-6 sm:px-6 md:px-10 md:pb-28 md:pt-8 ${s.section}`}>
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={crumbs} tone={s.crumb} />

        <p className={`mt-3 text-[10px] uppercase tracking-[0.28em] ${s.eyebrow}`}>
          Live cue · Hyderabad
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1
            className={`font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl ${s.title}`}
          >
            Today’s silver rate
          </h1>
          <SampleBadge />
        </div>
        <p className={`mt-2 text-sm ${s.muted}`}>
          {formatDisplayDate(rates.today.date)} · {rates.purityLabel}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          <div className={`rounded-sm border px-4 py-5 sm:px-5 sm:py-6 ${s.tile}`}>
            <p className={`text-xs ${s.muted}`}>Per gram</p>
            <p
              className={`mt-2 text-2xl font-medium tabular-nums tracking-tight sm:text-3xl ${s.accent}`}
            >
              {formatInr(rates.today.perGramInr, 1)}
            </p>
            <p className={`mt-1 text-xs ${s.muted}`}>₹ / gram</p>
          </div>
          <div className={`rounded-sm border px-4 py-5 sm:px-5 sm:py-6 ${s.tile}`}>
            <p className={`text-xs ${s.muted}`}>Per kilogram</p>
            <p className="mt-2 text-2xl font-medium tabular-nums tracking-tight sm:text-3xl">
              {formatInr(rates.today.perKgInr)}
            </p>
            <p className={`mt-1 text-xs ${s.muted}`}>₹ / kg</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className={`text-base font-medium tracking-tight sm:text-lg ${s.title}`}>
            Last 10 days
          </h2>
          <p className={`mt-1 text-xs ${s.muted}`}>
            Hyderabad · same purity · newest first
          </p>

          <div className={`mt-4 overflow-hidden rounded-sm border ${s.hairline}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[18rem] border-collapse text-sm">
                <caption className="sr-only">
                  Silver rates for the last 10 days in Hyderabad
                </caption>
                <thead>
                  <tr className={s.headBg}>
                    <th
                      scope="col"
                      className={`px-3 py-3 text-left text-xs font-medium sm:px-4 ${s.muted}`}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3 text-right text-xs font-medium sm:px-4 ${s.muted}`}
                    >
                      ₹ / gram
                    </th>
                    <th
                      scope="col"
                      className={`px-3 py-3 text-right text-xs font-medium sm:px-4 ${s.muted}`}
                    >
                      ₹ / kg
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rates.history.map((row) => (
                    <tr key={row.date} className={`border-t ${s.hairline}`}>
                      <td className="px-3 py-3 whitespace-nowrap sm:px-4">
                        {formatDisplayDate(row.date)}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums sm:px-4">
                        {formatInr(row.perGramInr, 1)}
                      </td>
                      <td
                        className={`px-3 py-3 text-right tabular-nums sm:px-4 ${s.muted}`}
                      >
                        {formatInr(row.perKgInr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className={`mt-6 text-xs leading-relaxed ${s.muted}`}>
          {rates.disclaimer}
        </p>

        <button
          type="button"
          onClick={onBack}
          className={`mt-8 border px-4 py-2.5 text-xs uppercase tracking-[0.16em] transition ${s.hairline} ${s.muted} hover:opacity-100`}
        >
          Back
        </button>
      </div>
    </section>
  );
}
