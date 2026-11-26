import type { DesignId, PreviewPage, Product } from "@/lib/types";

export type PreviewHistoryState = {
  nithyam: true;
  page: PreviewPage;
  productId: string;
  design: DesignId;
  /** Depth in our in-app history stack (0 = root) */
  idx: number;
};

const PAGES: PreviewPage[] = ["home", "shop", "product", "about", "contact"];
const DESIGNS: DesignId[] = ["A", "B", "C", "D"];

export function isPreviewPage(value: string | null): value is PreviewPage {
  return !!value && (PAGES as string[]).includes(value);
}

export function isDesignId(value: string | null): value is DesignId {
  return !!value && (DESIGNS as string[]).includes(value);
}

export function isPreviewHistoryState(
  value: unknown,
): value is PreviewHistoryState {
  if (!value || typeof value !== "object") return false;
  const s = value as PreviewHistoryState;
  return (
    s.nithyam === true &&
    isPreviewPage(s.page) &&
    typeof s.productId === "string" &&
    isDesignId(s.design) &&
    typeof s.idx === "number"
  );
}

export function buildPreviewSearch(
  page: PreviewPage,
  design: DesignId,
  product: Product,
): string {
  const params = new URLSearchParams();
  params.set("d", design);
  if (page !== "home") params.set("page", page);
  if (page === "product") params.set("sku", product.sku);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function readPreviewFromLocation(products: Product[]): {
  page: PreviewPage;
  design: DesignId | null;
  product: Product | null;
} {
  if (typeof window === "undefined") {
    return { page: "home", design: null, product: null };
  }
  const params = new URLSearchParams(window.location.search);
  const designParam = params.get("d");
  const design: DesignId | null = isDesignId(designParam) ? designParam : null;
  const pageParam = params.get("page");
  const page: PreviewPage = isPreviewPage(pageParam) ? pageParam : "home";
  const sku = params.get("sku");
  const product =
    page === "product" && sku
      ? products.find((p) => p.sku === sku) ?? products[0]
      : null;
  return { page, design, product };
}
