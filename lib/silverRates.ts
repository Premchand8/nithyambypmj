/**
 * Indicative Hyderabad silver rates for Phase 1 preview.
 * Not live market data - labelled as sample in the UI.
 */

export type SilverDayRate = {
  /** ISO date YYYY-MM-DD */
  date: string;
  /** ₹ per gram, 999 fine (indicative Hyderabad retail cue) */
  perGramInr: number;
  /** ₹ per kg (derived) */
  perKgInr: number;
};

const STORAGE_SEED = "nithyam-silver-sample-v1";

/** Slight day-to-day movement around a Hyderabad-oriented mid band (~₹100-108/g). */
function buildSampleSeries(anchor: Date): SilverDayRate[] {
  const base = 104.5;
  const wobble = [0.4, -0.6, 0.2, 1.1, -0.3, 0.8, -0.9, 0.5, -0.2, 0.7, 0];
  const days: SilverDayRate[] = [];

  for (let i = 10; i >= 0; i -= 1) {
    const d = new Date(anchor);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const perGram = Math.round((base + wobble[10 - i]) * 10) / 10;
    days.push({
      date: d.toISOString().slice(0, 10),
      perGramInr: perGram,
      perKgInr: Math.round(perGram * 1000),
    });
  }
  return days;
}

export function getSampleSilverRates(now = new Date()): {
  city: string;
  purityLabel: string;
  unitLabel: string;
  disclaimer: string;
  today: SilverDayRate;
  history: SilverDayRate[];
} {
  // Stable within the calendar day so the table doesn’t reshuffle on every open
  const anchor = new Date(now);
  anchor.setHours(12, 0, 0, 0);
  void STORAGE_SEED;

  const series = buildSampleSeries(anchor);
  const today = series[series.length - 1];
  const history = series.slice(0, -1).reverse(); // newest first, last 10 days

  return {
    city: "Hyderabad",
    purityLabel: "999 fine silver",
    unitLabel: "₹ per gram",
    disclaimer:
      "Rates shown are indicative only. Please confirm today’s rate with the store before you buy.",
    today,
    history,
  };
}

export function formatInr(amount: number, fractionDigits = 0) {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

/** e.g. 26 Nov 2026 - easy for Indian shoppers to scan */
export function formatDisplayDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  const day = d.getDate();
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}
