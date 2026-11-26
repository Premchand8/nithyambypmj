"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildPreviewSearch,
  isPreviewHistoryState,
  readPreviewFromLocation,
  type PreviewHistoryState,
} from "@/lib/navigation";
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
  goBack: (fallback?: PreviewPage) => void;
  selected: DesignId | null;
  hydrated: boolean;
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
  openProduct: (product: Product) => void;
  confirmSelection: () => void;
  resetSelection: () => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

function scrollPreviewTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [activeDesign, setActiveDesignState] = useState<DesignId>("A");
  const [page, setPageState] = useState<PreviewPage>("home");
  const [selected, setSelected] = useState<DesignId | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeProduct, setActiveProductState] = useState<Product>(products[0]);

  const designRef = useRef(activeDesign);
  const pageRef = useRef(page);
  const productRef = useRef(activeProduct);
  const idxRef = useRef(0);
  const applyingPopRef = useRef(false);

  designRef.current = activeDesign;
  pageRef.current = page;
  productRef.current = activeProduct;

  const writeHistory = useCallback(
    (
      nextPage: PreviewPage,
      nextDesign: DesignId,
      nextProduct: Product,
      mode: "push" | "replace",
    ) => {
      if (typeof window === "undefined") return;
      const idx =
        mode === "push" ? idxRef.current + 1 : Math.max(0, idxRef.current);
      idxRef.current = idx;
      const state: PreviewHistoryState = {
        nithyam: true,
        page: nextPage,
        productId: nextProduct.id,
        design: nextDesign,
        idx,
      };
      const url = `${window.location.pathname}${buildPreviewSearch(
        nextPage,
        nextDesign,
        nextProduct,
      )}`;
      if (mode === "push") window.history.pushState(state, "", url);
      else window.history.replaceState(state, "", url);
    },
    [],
  );

  const applyLocation = useCallback(
    (next: {
      page: PreviewPage;
      design?: DesignId;
      product?: Product | null;
    }) => {
      if (next.design) setActiveDesignState(next.design);
      if (next.product) setActiveProductState(next.product);
      setPageState(next.page);
      scrollPreviewTop();
    },
    [],
  );

  useEffect(() => {
    const stored = readSelectedDesign();
    setSelected(stored);

    const fromUrl = readPreviewFromLocation(products);
    const design = fromUrl.design ?? stored ?? "A";
    const product = fromUrl.product ?? products[0];
    const nextPage =
      fromUrl.page === "product" && !fromUrl.product ? "shop" : fromUrl.page;

    setActiveDesignState(design);
    setActiveProductState(product);
    setPageState(nextPage);
    idxRef.current = 0;
    writeHistory(nextPage, design, product, "replace");
    setHydrated(true);

    const onPopState = (event: PopStateEvent) => {
      applyingPopRef.current = true;
      const state = event.state;
      if (isPreviewHistoryState(state)) {
        idxRef.current = state.idx;
        const product =
          products.find((p) => p.id === state.productId) ?? products[0];
        applyLocation({
          page: state.page,
          design: state.design,
          product,
        });
      } else {
        const fallback = readPreviewFromLocation(products);
        idxRef.current = 0;
        applyLocation({
          page: fallback.page,
          design: fallback.design ?? designRef.current,
          product: fallback.product ?? productRef.current,
        });
      }
      queueMicrotask(() => {
        applyingPopRef.current = false;
      });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [applyLocation, writeHistory]);

  const setPage = useCallback(
    (nextPage: PreviewPage) => {
      if (applyingPopRef.current) {
        setPageState(nextPage);
        return;
      }
      if (
        nextPage === pageRef.current &&
        // Allow re-navigation to product for a different sku via openProduct
        nextPage !== "product"
      ) {
        return;
      }
      setPageState(nextPage);
      writeHistory(
        nextPage,
        designRef.current,
        productRef.current,
        "push",
      );
      scrollPreviewTop();
    },
    [writeHistory],
  );

  const setActiveProduct = useCallback((product: Product) => {
    setActiveProductState(product);
    productRef.current = product;
  }, []);

  const openProduct = useCallback(
    (product: Product) => {
      setActiveProductState(product);
      productRef.current = product;
      setPageState("product");
      writeHistory("product", designRef.current, product, "push");
      scrollPreviewTop();
    },
    [writeHistory],
  );

  const goBack = useCallback(
    (fallback: PreviewPage = "shop") => {
      if (typeof window === "undefined") return;
      if (idxRef.current > 0) {
        window.history.back();
        return;
      }
      setPageState(fallback);
      writeHistory(fallback, designRef.current, productRef.current, "replace");
      scrollPreviewTop();
    },
    [writeHistory],
  );

  const setActiveDesign = useCallback(
    (id: DesignId) => {
      setActiveDesignState(id);
      setPageState("home");
      // Switching concept resets the trail so Back does not jump across designs oddly
      idxRef.current = 0;
      writeHistory("home", id, productRef.current, "replace");
      scrollPreviewTop();
    },
    [writeHistory],
  );

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
      goBack,
      selected,
      hydrated,
      activeProduct,
      setActiveProduct,
      openProduct,
      confirmSelection,
      resetSelection,
    }),
    [
      activeDesign,
      setActiveDesign,
      page,
      setPage,
      goBack,
      selected,
      hydrated,
      activeProduct,
      setActiveProduct,
      openProduct,
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
