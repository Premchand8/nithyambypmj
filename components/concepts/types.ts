import type { PreviewPage, Product } from "@/lib/types";

export type ConceptProps = {
  page: PreviewPage;
  onNavigate: (page: PreviewPage) => void;
  onBack: (fallback?: PreviewPage) => void;
  activeProduct: Product;
  /** @deprecated Prefer onOpenProduct — kept for product selection without navigation */
  onSelectProduct: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
};
