export type DesignId = "A" | "B" | "C" | "D";

export type PreviewPage = "home" | "shop" | "product" | "about" | "contact";

export type Product = {
  id: string;
  sku: string;
  name: string;
  image: string;
  /** Sample price for preview only — not live catalogue pricing */
  samplePriceInr: number;
  blurb: string;
};

export type DesignMeta = {
  id: DesignId;
  label: string;
  subtitle: string;
};
