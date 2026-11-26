import Image from "next/image";
import { SampleBadge } from "./SampleBadge";
import { formatSamplePrice } from "@/lib/products";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  onOpen?: (product: Product) => void;
  tone?: "light" | "dark" | "forest";
  layout?: "grid" | "editorial" | "minimal" | "compact";
};

export function ProductCard({
  product,
  onOpen,
  tone = "light",
  layout = "grid",
}: Props) {
  const text =
    tone === "dark"
      ? "text-white"
      : tone === "forest"
        ? "text-[#F4F4F6]"
        : "text-[#161616]";
  const muted = tone === "light" ? "text-[#6B6B73]" : "text-white/65";

  /** Shop grids — square image, readable meta; scrolls with the page */
  if (layout === "compact") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(product)}
        className={`group text-left ${text}`}
      >
        <div className="relative aspect-square overflow-hidden bg-black/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:opacity-90"
            sizes="(max-width:768px) 50vw, 33vw"
          />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="text-sm leading-snug tracking-wide">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm tabular-nums ${muted}`}>
              {formatSamplePrice(product.samplePriceInr)}
            </p>
            <SampleBadge />
          </div>
        </div>
      </button>
    );
  }

  if (layout === "editorial") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(product)}
        className={`group text-left ${text}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 border-t border-current/15 pt-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl leading-tight">
              {product.name}
            </p>
            <p className={`mt-1 text-xs tracking-[0.16em] uppercase ${muted}`}>
              {product.sku}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm">{formatSamplePrice(product.samplePriceInr)}</p>
            <SampleBadge className="mt-1" />
          </div>
        </div>
      </button>
    );
  }

  if (layout === "minimal") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(product)}
        className={`group text-left ${text}`}
      >
        <div className="relative aspect-square overflow-hidden bg-[#ECECEF]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:opacity-90"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-sm tracking-wide">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm ${muted}`}>
              {formatSamplePrice(product.samplePriceInr)}
            </p>
            <SampleBadge />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(product)}
      className={`group overflow-hidden text-left ${text}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 50vw, 25vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="font-[family-name:var(--font-display)] text-lg">
          {product.name}
        </p>
        <p className={`text-xs tracking-[0.14em] uppercase ${muted}`}>
          {product.sku}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <p className="text-sm">{formatSamplePrice(product.samplePriceInr)}</p>
          <SampleBadge />
        </div>
      </div>
    </button>
  );
}
