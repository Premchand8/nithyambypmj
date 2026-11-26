export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-current/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] opacity-70 ${className}`}
    >
      Sample
    </span>
  );
}
