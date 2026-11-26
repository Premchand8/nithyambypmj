"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/lib/products";
import {
  clearSelectedDesign,
  readSelectedDesign,
  writeSelectedDesign,
} from "@/lib/selection";
import type { DesignId, PreviewPage, Product } from "@/lib/types";

type PreviewContextValue = {
  activeDesign: DesignId;
  setActiveDesign: (id: DesignId) => void;
  page: PreviewPage;
  setPage: (page: PreviewPage) => void;
  selected: DesignId | null;
  hydrated: boolean;
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
  confirmSelection: () => void;
  resetSelection: () => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [activeDesign, setActiveDesignState] = useState<DesignId>("A");
  const [page, setPage] = useState<PreviewPage>("home");
  const [selected, setSelected] = useState<DesignId | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);

  useEffect(() => {
    const stored = readSelectedDesign();
    setSelected(stored);
    if (stored) setActiveDesignState(stored);
    setHydrated(true);
  }, []);

  const setActiveDesign = useCallback((id: DesignId) => {
    setActiveDesignState(id);
    setPage("home");
  }, []);

  const confirmSelection = useCallback(() => {
    writeSelectedDesign(activeDesign);
    setSelected(activeDesign);
  }, [activeDesign]);

  const resetSelection = useCallback(() => {
    clearSelectedDesign();
    setSelected(null);
  }, []);

  const value = useMemo(
    () => ({
      activeDesign,
      setActiveDesign,
      page,
      setPage,
      selected,
      hydrated,
      activeProduct,
      setActiveProduct,
      confirmSelection,
      resetSelection,
    }),
    [
      activeDesign,
      setActiveDesign,
      page,
      selected,
      hydrated,
      activeProduct,
      confirmSelection,
      resetSelection,
    ],
  );

  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used within PreviewProvider");
  return ctx;
}
