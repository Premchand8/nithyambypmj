import type { PreviewPage, Product } from "@/lib/types";

export type ConceptProps = {
  page: PreviewPage;
  onNavigate: (page: PreviewPage) => void;
  activeProduct: Product;
  onSelectProduct: (product: Product) => void;
};
