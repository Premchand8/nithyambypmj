import { Search, ShoppingBag } from "lucide-react";

/** Visual-only bag & search — no cart/search backend in Phase 1 */
export function BagSearchIcons({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const colour = tone === "dark" ? "text-white" : "text-current";
  return (
    <div className={`flex items-center gap-3 ${colour} ${className}`}>
      <button
        type="button"
        aria-label="Search (visual preview)"
        className="rounded-sm p-1.5 opacity-80 transition hover:opacity-100"
      >
        <Search className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Bag (visual preview)"
        className="relative rounded-sm p-1.5 opacity-80 transition hover:opacity-100"
      >
        <ShoppingBag className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#302850] px-0.5 text-[9px] text-white">
          0
        </span>
      </button>
    </div>
  );
}
